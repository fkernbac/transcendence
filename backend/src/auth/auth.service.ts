import {
  ForbiddenException,
  GatewayTimeoutException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from './interfaces/user.interface';
import { Users } from '@prisma/client';
import { type } from 'os';
import { Request, Response } from 'express';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  activeUser: number[] = [];

  async signup(user: User) {
    try {
      // Validate password
      this.validatePassword(user.password);
      // Validate username
      this.validateUsername(user.username);
      //generate the pw hash
      const hash = await argon.hash(user.password);
      //create new user in the database
      const newUser = await this.prismaService.createUserBySignUp(
        user.username,
        hash,
      );
      if (newUser == null)
        throw new GatewayTimeoutException('Database unreachable');
      //create sessiontoken
      const bToken = await this.signToken(newUser.id, newUser.username);
      //push userid to the activeuser list
      if (!this.activeUser.includes(newUser.id))
        this.activeUser.push(newUser.id);
      console.error('AUTH.SERVICE: SIGNUP, Registered: ', newUser.username);
      return {
        access_token: bToken,
        userId: newUser.id,
        userName: newUser.username,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
    }
  }

  async checkUserInDB(user: User): Promise<Users> {
    const newUser = await this.prismaService.getUserByName(user.username);
    return newUser;
  }

  async signin(user: User) {
    //find the user by username in database
    const newUser = await this.checkUserInDB(user);
    //if user does not exist throw exception
    if (!newUser) {
      throw new ForbiddenException('User not found');
    }
    //compare password
    const pwMatches = await argon.verify(newUser.hash, user.password);
    //if password is wrong throw exception
    if (!pwMatches) {
      throw new ForbiddenException('Credentials incorrect');
    }
    //create sessiontoken
    const bToken = await this.signToken(newUser.id, newUser.username);
    console.error('AUTH.SERVICE: SIGNIN, Logged in ', newUser.username);
    //push userid to the activeuser list
    if (!this.activeUser.includes(newUser.id)) this.activeUser.push(newUser.id);
    return {
      access_token: bToken,
      userId: newUser.id,
      userName: newUser.username,
    };
  }

  async signToken(userId: number, username: string): Promise<string> {
    const payload = { sub: userId, username };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: this.config.get('JWT_EXPIRE'),
      secret: secret,
    });

    return token;
  }

  async validateToken(
    token: string,
  ): Promise<{ valid: boolean; renewedToken?: string }> {
    const secret = this.config.get('JWT_SECRET');

    try {
      const decodedToken: any = await this.jwt.verifyAsync(token, {
        secret: secret,
      });

      // Check if the token is expired
      if (decodedToken.exp <= Math.floor(Date.now() / 1000)) {
        // Token is expired
        // Remove the user ID from the activeUser array
        const userId = decodedToken.sub;
        const index = this.activeUser.indexOf(userId);
        if (index !== -1) {
          this.activeUser.splice(index, 1);
        }
        return { valid: false };
      }
      // Token is valid and not expired
      // Renew the token and return it
      const renewedToken = await this.signToken(
        decodedToken.sub,
        decodedToken.username,
      );
      return { valid: true, renewedToken };
    } catch (error) {
      // Handle token verification errors
      // console.error('Error validating token:', error);
      console.error('validateToken: JWT invalid or expired.');
      return { valid: false };
    }
  }

  private validatePassword(password: string): void {
    if (password.length < 8) {
      throw new ForbiddenException(
        'Password must be at least 8 characters long',
      );
    }
    // Define a whitelist of allowed characters (ASCII and common symbols)
    const allowedCharsRegex = /^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]+$/;
    if (!allowedCharsRegex.test(password)) {
      throw new ForbiddenException('Password contains forbidden characters');
    }
  }

  private validateUsername(username: string): void {
    if (username.length < 4) {
      throw new ForbiddenException(
        'Username must be at least 4 characters long',
      );
    }
    // Define a whitelist of allowed characters (ASCII and common symbols)
    const allowedCharsRegex = /^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]+$/;

    if (!allowedCharsRegex.test(username)) {
      throw new ForbiddenException('Username contains forbidden characters');
    }
  }

  async handleCallback(request: Request) {
    const authorizationCode = request.query.code as string;
    const clientId = `${process.env.FORTYTWO_APP_ID}`;
    const clientSecret = `${process.env.FORTYTWO_APP_SECRET}`;
    const redirectUri = `https://${process.env.BACKEND_IP}:3000/auth/42/callback`;
    const tokenEndpoint = `${process.env.TOKEN_ENDPOINT}`;
    try {
      const tokenResponse = await fetch(tokenEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: clientId,
          client_secret: clientSecret,
          code: authorizationCode,
          redirect_uri: redirectUri,
        }),
      });
      let accessToken: string;
      if (tokenResponse.ok) {
        const tokenData = await tokenResponse.json();
        accessToken = tokenData.access_token;
      } else {
        console.error(
          'AUTH.SERVICE: HANDLECALLBACK, Problems with the tokenresponse',
        );
      }
      const apiResponse = await fetch('https://api.intra.42.fr/v2/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (apiResponse.ok) {
        const responseData = await apiResponse.json();
        const user: User = {
          username: responseData.login,
          password: process.env.BACKEND_API_PW,
          id: 0,
        };
        const newUser = await this.checkUserInDB(user);
        let response: {
          access_token: string;
          userId: number;
          userName: string;
        };
        if (!newUser) {
          response = await this.signup(user);
        } else {
          const bToken = await this.signToken(newUser.id, newUser.username);
          response = {
            access_token: bToken,
            userId: newUser.id,
            userName: newUser.username,
          };
        }
        return response;
      } else {
        console.error(
          'AUTH.SERVICE: HANDLECALLBACK, API Request failed',
          apiResponse.statusText,
        );
        return null;
      }
    } catch (error) {
      // Handle fetch errors
      console.error(`AUTH.SERVICE: HANDLECALLBACK, exception caught: ${error}`);
    }
  }
}

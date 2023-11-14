// game.service.ts
import { clearInterval } from 'timers';
import { sharedEventEmitter } from './game.events';
import { GameState } from './GameState';
import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/user/dto';
import { Socket } from 'socket.io';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class GameService {
  // user array
  // should probably be saved elsewhere, idk
  users: Map<string, UserDto> = new Map(); // socket.id -> user
  queue: UserDto[] = [];
  games: Map<number, GameState> = new Map(); // gamestate.Game.id -> gamestate
  prisma: PrismaClient;

  /* A new user is added to the game queue */
  addToQueue(socket: Socket) {
    // find the matching user
    const user = this.users.get(socket.id);

	//user.id = 1 //
    // check if user already is in queue
    // REPLACE socket id with working user id
    if (!user || this.queue.find(queuedUser => queuedUser.socket.id === user.socket.id)) return;
	// check if user already is in an active game
	if (user.inGame) {
		console.log("Client is already playing");
		return;
	}

    console.log(`Client ${socket.id} entered game queue`);
    this.queue.push(user);
    // check if a game is ready to be started
    this.checkQueue();
  }

  /* Remove a user from the game queue */
  removeFromQueue(socket: Socket) {
    // Find the user in the queue based on socket.id
    const userToRemove = this.queue.find(queuedUser => queuedUser.socket.id === socket.id);

    if (userToRemove) {
      // Remove the user from the queue
      const index = this.queue.indexOf(userToRemove);
      if (index !== -1) {
        this.queue.splice(index, 1);
        console.log(`Client: ${socket.id} removed from game queue`);
      }
    }
  }

  checkQueue() {
	  if (this.queue.length >= 2){
		console.log(this.queue.length);
		this.startGame();
	} 
  }

async startGame() {
    const game = new GameState();
	game.user1 = this.queue.pop();
	game.user2 = this.queue.pop();
	console.log("user1: ", game.user1.id, "user2: ", game.user2.id);
	await game.initializeGame(game.user1.id, game.user2.id);

	if (!game.GameData) {
		console.log('Game: Failed to create new Game!', this.queue.length);
		return;
	}

    const updateRate = 1000 / 60;


    game.user1.inGame = true;
    game.user2.inGame = true;

    this.games.set(game.GameData.id, game);
    sharedEventEmitter.emit('prepareGame', game);

    console.log('Game: Starting multiplayer game', game.GameData.id);
    game.intervalId = setInterval(() => {
      this.animateBall(game);
    }, updateRate);

    sharedEventEmitter.emit('startGame', game);
  }

stopGame(GameId: number) {
    // search the right game
    const game = this.games.get(GameId);
    if (!game) {
      console.error("Game: Couldn't stop. Game not found.");
      return;
    }
	
    console.log('Stopping game', GameId);
    clearInterval(game.intervalId);
    game.intervalId = null;

    if (game.user1) game.user1.inGame = false;
    if (game.user2) game.user2.inGame = false;

    // save persistent game stuff to database here if you like
    this.games.delete(game.GameData.id);
  }

  paddleUp(GameId: number, playerNumber: number) {
    const game = this.games.get(GameId);
    if (game && game.isRunning()) {
      game.movePaddleUp(playerNumber);
    }
    return game;
  }

  paddleDown(GameId: number, playerNumber: number) {
    const game = this.games.get(GameId);
    if (game && game.isRunning()) {
      game.movePaddleDown(playerNumber);
    }
    return game;
  }

  animateBall(game: GameState) {
    //right wins?
    game.leftBreakthrough();
    // left wins?
    game.rightBreakthrough();
    // playfield collisions?
    game.collisionField();
    // paddle collisions?
    game.collisionLeft();
    game.collisionRight();
    // Update the ball's position
    game.playerVictory();
    game.ballX += game.ballSpeedX;
    game.ballY += game.ballSpeedY;
    sharedEventEmitter.emit('ballPositionUpdate', game);
  }

}


# Project Overview

This 42 project involves creating a website for a Pong contest, focusing on real-time multiplayer online games. The project consists of a mandatory part and a range of flexible modules.

#### Technology:
Frontend: Vue.js/Typescript  
Backend: NestJS/Typescript

#### Mandatory Requirements:
* Single-page application compatible with the latest stable version of Google Chrome.
* Players can play a game of pong on the same keyboard.
* Players can join a tournament.
* The game and website may never crash. There should be no unhandled errors and no warnings.
* The game must capture the essence of the original Pong.

#### Security Concerns:
* Passwords must be hashed in the database.
* Protection against SQL injections/XSS is mandatory.
* HTTPS connection is required for all aspects.
* Validation for forms and user input is essential, either on the base page or server side.

#### Our chosen modules:
* Database (PostgreSQL)
* Standard user management: authentication, user profile page, user match history, friends management
* Authentication via 42 OAuth
* Remote players
* User and game stats dashboard
* Compatibility with 2 or more browsers
* Support for 3 or more languages
* Server-Side pong and game API

## Running the website
1. Clone the repo. Docker needs to be running.
2. Modify the values of the example .env file if needed.
3. Run `make` or `docker-compose up --build`. The project might take ~10 minutes to build.
4. Call `https://localhost:3000/` or use the IP that was automatically updated your .env file.
5. Accept the self-signed certificate.
6. You will be directed to our frontend at port 8080 and can use the website.

> [!NOTE]
> 42 OAuth will not work outside the school clusters. To test this functionality the user has to register their own API service within 42 intra.

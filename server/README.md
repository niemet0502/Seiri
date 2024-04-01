# Server
This is the server used by the app it exposes a REST API.  

## Technical Stack

Regarding the stack, you'll find:

- [NestJS](https://nestjs.com/):  A progressive Node.js framework for building efficient, reliable and scalable server-side applications.
- [TypeORM](https://typeorm.io/): as ORM. 
- [MySQL](https://www.mysql.com/): for the database. 
- [Jest](https://jestjs.io/): for unit tests.
- [Docker](https://www.docker.com/): for our containerization platform. 

## Technical Structure
1. `src/`: 99% of the source code lives here & this is also where you'll spend most of your time. 
    - `main.ts`: This file serves as the entry point of your NestJS application. It initializes the Nest application, bootstraps the AppModule, and starts the server. 
    - `note`/: folder encapsulates the functionality related to managing notes, including service logic, controller endpoints, and corresponding unit tests. 
    - `project/`: folder encapsulates the functionality related to managing projects, including service logic, controller endpoints, and corresponding unit tests.
    - `task/`: folder encapsulates the functionality related to managing tasks, including service logic, controller endpoints, and corresponding unit tests.
    - `user/`: folder encapsulates the functionality related to managing users, including service logic, controller endpoints, and corresponding unit tests. 
    - `mails/`: folder that contains the mail service and templates. 
    - `db/`: folder that contains the database connection.
2. `Dockerfile`: it’s a text document that contains all the commands a user could call to assemble an image. 
3. `package.json`: file is a metadata file used in Node.js projects to manage project dependencies, scripts, and other configuration settings. 

## Installation 
```
npm install
```

## Test
```
# unit tests 
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```
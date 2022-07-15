# Task Manager API v1.0.0

The idea of making this backend was learning TypeScript and JsonWebToken Authorization with admin/user roles.

<br>

## Tech Stack

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)

<br>

## Additional Main Packages

bcrypt
https://www.npmjs.com/package/bcrypt

express-async-errors
https://www.npmjs.com/package/express-async-errors

uuid
https://www.npmjs.com/package/uuid

mysql2
https://www.npmjs.com/package/mysql2

<br>

## Features

- register/login/logout user
- passwords are hashed using bcrypt
- JWT Authentication
- admin/user roles
- users can create/update/delete/get own tasks
- admin additionaly can update/delete/get tasks of all users

<br>

## Project Structure
    .
    ├───config
    ├───controllers
    ├───db
    │   └───records
    ├───dist
    │   ├───config
    │   ├───controllers
    │   ├───db
    │   │   └───records
    │   ├───middlewares
    │   ├───routes
    │   ├───types
    │   │   ├───authRequest
    │   │   ├───task
    │   │   └───user
    │   └───utils
    ├───middlewares
    ├───routes
    ├───types
    │   ├───authRequest
    │   ├───task
    │   └───user
    └───utils

<br>

## Install Packages

    npm install

<br>

## Configure Project

`/config/config.ts` file:

- change `/config/config.example.ts` file to `/config/config.ts` and provide your  `ACCESS_TOKEN`

`/db/db.ts` file:
- database config file

<br>

## Running app

Development mode:

    npm start

Development watching mode:

    npm run start-dev

Build app:

    npm run build

<br>

## API Requests

<br>

### Signup:

`GET localhost:3001/api/user/signup`

![img](/res/Code_JOMkF6LOV2.png)

### Login:

`GET localhost:3001/api/user/login`

![img](/res/Code_237ltlICVi.png)

### Logout:

`GET localhost:3001/api/user/logout`

![img](/res/Code_5tcXzZeryf.png)

### Create new task:

`POST localhost:3001/api/task`

![img](/res/Code_gKmkmnkWJ0.png)

### Update task:

`PATH localhost:3001/api/task/:id`

![img](/res/Code_HW02i1DpRI.png)

### Delete task:

`DELETE localhost:3001/api/task/:id`

![img](/res/Code_gL0jOD5OeP.png)

### Get all tasks:

`GET localhost:3001/api/task/`

![img](/res/Code_8L1r46JWPD.png)

### Get single task:

`GET localhost:3001/api/task/:id`

![img](/res/Code_mFrX9O6mRm.png)
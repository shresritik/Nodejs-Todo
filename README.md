## A basic CRUD TODO app API with Node.js and Express

### Clone the repo

```bash
git clone https://github.com/shresritik/Nodejs-Todo/tree/assignment-4
```

### Setup .env file

Create .env file with the help of .env.example

## Instructions for setup

## Method 1

### Install Dependencies

```bash
npm install
```

### Run the server

```bash
npm start
```

## Method 2: Using Docker for Linux

Run script.sh

```bash
chmod +x script.sh
```

```bash
./script.sh
```

## Method 3:Using Docker for Linux / Windows / Mac

Get the latest hash

```bash
git rev-parse --short HEAD
```

Use that hash in docker pull

```bash
docker pull shresritik/todo:<latest_hash>
```

### Run the server

```bash
docker run -p <PORT>:<PORT> --env-file=<path_to_env> shresritik/todo:<latest_hash>
```

### Routes

| Endpoint      | HTTP Method | Description                     | body                                              | Authorization     |
| ------------- | ----------- | ------------------------------- | ------------------------------------------------- | ----------------- |
| /projects     | POST        | Create a todo                   | name:string<br>status:ongoing,incomplete,complete | User              |
| /projects     | GET         | Get all todos                   |                                                   | Super Admin, User |
| /projects/:id | GET         | Get a todo                      |                                                   | Super Admin, User |
| /projects/:id | PUT         | Update a todo                   | name:string<br>status:ongoing,incomplete,complete | User              |
| /projects/:id | DELETE      | Delete a todo                   |                                                   | User              |
| /users        | POST        | Create a user                   | name:string<br>email:string<br>password:string    | Super Admin       |
| /users/:id    | PUT         | Update a user                   | name:string<br>email:string<br>password:string    | Super Admin       |
| /users/:id    | DELETE      | Delete a user                   |                                                   | Super Admin       |
| /users        | GET         | Get all users                   |                                                   | Super Admin       |
| /users/:id    | GET         | Get a user                      |                                                   | Super Admin       |
| /users?q=     | GET         | Get a user by name              | q=string                                          | Super Admin       |
| /auth/login   | POST        | login a user                    | email:string<br>password:string                   |
| /auth/refresh | POST        | Create refresh and access token |                                                   |                   |

_Note: For Authentication provide Bearer `token` in headers_

### Steps

1. Get Super admin access token from /auth/login
2. Perform CRUD operations on users with that access token in /users
3. Get user access token from /auth/login using the created user credentials
4. Perform CRUD operation on Todo with that access token in /projects

_Note: The email for super admin is shyam@dsa.com and the password needs to hashed and placed in .env_
_User can only perform CRUD on its todo and super admin can only perform CRUD on the users_

### Tests Scripts

1. Unit Test

```bash
npm test
```

2. Integration Test

```bash
npm run test:integration
```

_Note: All the env variables need to be declared, refer to .env.example._
_The server should be started to run the integration test._

## Database Migrations in Postgres

### Migrations

1. Make migrations

```bash
npm run migrate:make
```

2. Migrate

```bash
npm run migrate
```

### Seeding

1. Make seed

```bash
npm run seed:make
```

2. Run Seed

```bash
npm run seed:run
```

### Rollback Migrations

```bash
npm run rollback
```

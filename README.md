## A basic CRUD TODO app API with Node.js and Express

### Clone the repo

```bash
git clone https://github.com/shresritik/Nodejs-Todo/tree/assignment-2
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

```bash
docker pull shresritik/todo:2.321f08a
```

### Run the server

```bash
docker run -p <PORT>:<PORT> --env-file=<path_to_env> shresritik/todo:2.321f08a
```

### Routes

| Endpoint      | HTTP Method | Description                     | body                                              | Authentication     |
| ------------- | ----------- | ------------------------------- | ------------------------------------------------- | ------------------ |
| /projects     | POST        | Create a todo                   | name:string<br>status:ongoing,incomplete,complete |
| /projects     | GET         | Get all todos                   |
| /projects/:id | GET         | Get a todo                      |                                                   |
| /projects/:id | PUT         | Update a todo                   | name:string<br>status:ongoing,incomplete,complete |
| /projects/:id | DELETE      | Delete a todo                   |                                                   |
| /users        | POST        | Create a user                   | name:string<br>email:string<br>password:string    |
| /users        | GET         | Get all users                   |                                                   | :heavy_check_mark: |
| /users?q=     | GET         | Get a user by name              | q=string                                          | :heavy_check_mark: |
| /auth/login   | POST        | login a user                    | email:string<br>password:string                   |
| /auth/refresh | POST        | Create refresh and access token |                                                   | :heavy_check_mark: |

_Note: For Authentication provide Bearer `token` in headers_

## A basic CRUD TODO app API with Node.js and Express

### Install Dependencies

```bash
npm install
```

### Setup .env file

Create .env file with the help of .env.example to configure the port

### Run the server

```bash
npm start
```

## OR

### Docker setup

```bash
docker pull shresritik/todo:v1.1.3
```

### Setup .env file

Create .env file with the help of .env.example to configure the port

### Run the server

```bash
docker run -p <PORT>:<PORT> --env-file=<path_to_env> shresritik/todo:v1.1.3
```

### Routes

| Endpoint      | HTTP Method | Description   |
| ------------- | ----------- | ------------- |
| /projects     | POST        | Create a todo |
| /projects     | GET         | Get all todos |
| /projects/:id | GET         | Get a todo    |
| /projects/:id | PUT         | Update a todo |
| /projects/:id | DELETE      | Delete a todo |

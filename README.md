# Task Distribution API
This repository is a basic example of a task distribution REST API.

## Dependencies 
  * Node.js v10.15.1 (LTS) or greater
  * Docker v19.03.1 or greater
  
  https://nodejs.org/en/
  
  https://www.docker.com/products/docker-desktop

## Installation

Clone the repository
```
git clone https://github.com/landonmichael/task-distribution/
cd task-distribution
```

## Running with Docker

Docker is not required to run the project, but is supported.
To build/run the Docker image/container and install all dependencies, run the following command in a terminal from the root of the project run:
```
docker-compose up
```

## Running with npm

Install the project dependencies by running the following command:
```
npm install
```

To seed the (Sqlite) database with test data, run the following commands:
```
./node_modules/.bin/sequelize db:migrate
./node_modules/.bin/sequelize db:seed:all
```

To run the application, simply run:
```
npm start
```

Using either method, the Node.js application will run on port 3000 by default.

## API Documentation

The API is documented using Swagger UI. It can be accessed while running the application at the following path:

http://localhost:3000/api-docs

## Tests

Tests can be initiated by running the following command:
```
npm test
```

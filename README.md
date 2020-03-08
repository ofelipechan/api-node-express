# API Node.js Express

Author: [Felipe S. Chan](https://github.com/ofelipechan)

## Requirements

* [Nodejs](https://nodejs.org/) - Javascript
* [Mongodb](https://www.mongodb.com/) - Data Base

### Install dependencies

```bash
$ npm install
```

### Run API dev environment 
WARNING: Check database credentials.

```bash
$ npm start
```

You can also start with [Docker Compose](https://docs.docker.com/compose/install/)

```bash
$ docker-compose up
```

### Run API on local environment
WARNING: Must have local mongodb database installed. Check [Mongodb](https://www.mongodb.com/) 

```bash
$ npm run local
```

API will be listening at 

```bash
$ http://localhost:3000
```

### Lint

```bash
$ npm run lint
```

### Test

Unit Test

```bash
$ npm run test
```

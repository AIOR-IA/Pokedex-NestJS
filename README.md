<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Run in development

1. Clone repository
2. Run
```
npm install
```
3. You need nest-cli
```
npm i -g @nestjs/cli
```

4. run DataBase
```
docker-compose up -d
```
5. rebuild the DB with SEED
```
 GET - http://localhost:3000/api/v2/seed
```

## Stack
* MongoDB
* Nest
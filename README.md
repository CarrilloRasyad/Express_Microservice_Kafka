## RUN SERVER
- npm start
- npm run dev (run local)
- Server running on port 9002 (you can change the configuration in server.ts)

## INSTALL CORS FOR ROUTE
- npm install cors @types/cors --save-dev

## TESTING WITH JEST
- npm test

## INSTALL EXPRESS NODEMON AND TYPESCRIPT
- npm install express nodemon typescript ts-node @types/express @types/node --save-dev
- npm install -g typescript (akan menginstall typescript secara global)

## RUNNING TYPESCRIPT (CREATE FILE TSCONFIG.JSON)
- npx tsc --init or npx create-jest

## TESTING HTTP REQUEST
- make file request.http for testing REST-API
- REST-API (Get, Post, Patch/Put, Delete)

## INSTALL DRIZZLE PACKAGE (USE NPM)
- npm i drizzle-orm pg dotenv
- npm i -D drizzle-kit tsx @types/pg

## INSTALL KAFKAJS
- npm install kafkajs

## MIGRATION WITH DRIZZLE ORM
- drizzle-kit migrate
- drizzle-kit generate
- drizzle-kit push
- drizzle-kit pull
(note: you can setup this migration in scripts of package.json file)

## SET UP THE MIGRATION IN SCRIPTS OF PACKAGE.JSON FILE
- "db:generate": "drizzle-kit generate",
- "db:push": "drizzle-kit push",
- "db:migrate": "tsx ./migration.ts",
- "db:studio": "drizzle-kit studio --port 6000"

## FLOW PENGERJAAN PROJECT

![flows projects](https://github.com/user-attachments/assets/fcd14865-afaf-4d4c-9915-4db50ce352b1)

## USE CASE CATALOG SERVICE AND ORDER SERVICE

![use case catalog dan order](https://github.com/user-attachments/assets/19a0ed21-960e-4f08-a053-d8ebc8ddc463)

## SIMPLE FLOW CART 

![foto simple flow cart](https://github.com/user-attachments/assets/c0563c54-366e-4ba6-84e1-97ae26eebc3b)



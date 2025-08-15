import express from 'express';
import orderRouter from './api/order.routes';

const app = express();

app.use(express.json())

app.use("/", orderRouter);


export default app;
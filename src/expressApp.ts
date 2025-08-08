import express from 'express';
import catalogRouter from './api/catalog.routes'

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json())

app.use("/", catalogRouter);

app.listen(PORT, () => {
    console.log("App Listen to Port: ", PORT);
})

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json())

app.use("/", (req: Request, res: Response, _: NextFunction) => {
    return res.status(200).json({message: "I am healthy!"});
});


export default app;
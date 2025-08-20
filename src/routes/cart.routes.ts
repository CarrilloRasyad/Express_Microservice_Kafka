import express, { NextFunction, Request, Response } from 'express';

const router = express.Router();

router.post("/cart", async(req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({

    });
});


export default router
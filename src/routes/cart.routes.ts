import express, { NextFunction, Request, Response } from 'express';

const router = express.Router();

router.post(
    "/cart", 
    async(req: Request, res: Response, next: NextFunction) => {
     return res.status(201).json({message: "create cart"});
    }
);

router.get(
    "/cart",
    async(req: Request, res: Response, next: NextFunction) => {
        return res.status(200).json({message: "get data cart"});
    }
);

router.patch(
    "/cart/:id",
    async(req: Request, res: Response, next: NextFunction) => {
        return res.status(200).json({message: "update cart"})
    }
);

router.delete(
    "/cart/:id",
    async(req: Request, res: Response, next: NextFunction) => {
        return res.status(200).json({message: "delete cart"})
    }
);


export default router
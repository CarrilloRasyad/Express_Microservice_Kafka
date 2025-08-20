import express, { NextFunction, Request, Response } from 'express';
import * as service from '../service/cart.service';

const router = express.Router();

router.post(
    "/cart", 
    async(req: Request, res: Response, next: NextFunction) => {
        const response = await service.CreateCart(req.body);
        return res.status(201).json(response);
    }
);

router.get(
    "/cart",
    async(req: Request, res: Response, next: NextFunction) => {
        const response = await service.GetCart(req.body);
        return res.status(200).json(response);
    }
);

router.patch(
    "/cart/:id",
    async(req: Request, res: Response, next: NextFunction) => {
        const response = await service.EditCart(req.body);
        return res.status(200).json(response);
    }
);

router.delete(
    "/cart/:id",
    async(req: Request, res: Response, next: NextFunction) => {
        const response = await service.DeleteCart(req.body);
        return res.status(200).json(response);
    }
);


export default router
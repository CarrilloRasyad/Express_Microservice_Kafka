import express, { NextFunction, Request, Response } from 'express';
import * as service from '../service/cart.service';
import * as repository from '../repository/cart.repository';
import { ValidateRequest } from '../utils/validator';
import { CartRequestInput, CartRequestSchema } from '../dto/cartRequest.do';

const router = express.Router();
const repo = repository.CartRepository;

router.post(
    "/cart", 
    async(req: Request, res: Response, next: NextFunction) => {
        try {

            const error = ValidateRequest<CartRequestInput>(
                req.body,
                CartRequestSchema
            );

            if(error) {
                return res.status(404).json({error});
            }

            const response = await service.CreateCart(req.body as CartRequestInput, repo);
            return res.status(201).json(response); 
        } catch (error) {
            return res.status(404).json({ error});
        }
    }
);

router.get(
    "/cart",
    async(req: Request, res: Response, next: NextFunction) => {
        const response = await service.GetCart(req.body, repo);
        return res.status(200).json(response);
    }
);

router.patch(
    "/cart/:id",
    async(req: Request, res: Response, next: NextFunction) => {
        const response = await service.EditCart(req.body, repo);
        return res.status(200).json(response);
    }
);

router.delete(
    "/cart/:id",
    async(req: Request, res: Response, next: NextFunction) => {
        const response = await service.DeleteCart(req.body, repo);
        return res.status(200).json(response);
    }
);


export default router
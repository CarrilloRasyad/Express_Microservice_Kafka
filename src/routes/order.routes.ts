import express, { NextFunction, Request, Response } from 'express';
import { MessageBroker } from '../utils';
import { OrderEvent, OrderStatus } from '../types';
import { RequestAuthorizer } from './middleware';
// import * as service from "../service/order.service";
import { OrderRepository } from '../repository/order.repository';
import { CartRepository } from '../repository/cart.repository';

const router = express.Router();
const repo = OrderRepository;
const cartRepo = CartRepository;

// router.post(
//     "/order",
//     RequestAuthorizer,
//     async(req: Request, res: Response, next: NextFunction) => {
//         const user = req.user;
//         if(!user) {
//             next(new Error("user not found"));
//             return;
//         }
//         const response = await service.CreateOrder(user.id, repo, cartRepo)
//     }
// )

router.post(
    "/order",
    RequestAuthorizer, 
    async(req: Request, res: Response, next: NextFunction) => {
        await MessageBroker.publish({
            topic: "OrderEvents",
            headers: {token: req.headers.authorization},
            event: OrderEvent.CREATE_ORDER,
            message: {
                orderId: 1,
                items: [
                {
                    productId: 1,
                    quantity: 1,
                },
                {
                    productId: 2,
                    quantity: 2,
                },
                ],
            },
        });
        return res.status(200).json({message: "create order"});
    }
);

router.get(
    "/order",
    async(req: Request, res: Response, next: NextFunction) => {
        return res.status(200).json({message: "get data order"});
    }
);

router.get(
    "/order/:id",
    async(req: Request, res: Response, next: NextFunction) => {
        return res.status(200).json({message: "get data order"});
    }
);

// router.patch(
//     "/order/:id",
//     async(req: Request, res: Response, next: NextFunction) => {
//         const orderId = parseInt(req.params.id);
//         const status = req.body.status as OrderStatus;
//         const response = await service.UpdateOrder(orderId, status, repo);
//         return res.status(200).json(response);
//     }
// )

router.delete(
    "/order/:id",
    async(req: Request, res: Response, next: NextFunction) => {
        return res.status(200).json({message: "delete order"})
    }
);


export default router
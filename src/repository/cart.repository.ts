import { DB } from "../db/db.connection";
import { carts } from "../db/schema";
import { CartRepositoryType } from "../types/repository.type";
// import { drizzle } from 'drizzle-orm/node-postgres';

// Connect database with drizzle

const createCart = async (input: any): Promise<{}> => {
    const result = await DB.insert(carts).values({
        customerId: 123
    }).returning({ cartId: carts.id});

    // console.log(result);
    return Promise.resolve({ 
        message: "fake response create from cart repo",
        input
    });
};

const findCart = async (input: any): Promise<{}> => {
    return Promise.resolve({
        message: "fake response get cart from repo",
        input
    });
};

const updateCart = async (input: any): Promise<{}> => {
    return Promise.resolve({
        message: "fake response update cart from repo",
        input
    });
};

const deleteCart = async (input:any): Promise<{}> => {
    return Promise.resolve({
        message: "fake response delete cart from repo",
        input
    });
};

export const CartRepository: CartRepositoryType = {
    create: createCart,
    find: findCart,
    update: updateCart,
    delete: deleteCart
};
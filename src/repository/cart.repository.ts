import { eq } from "drizzle-orm";
import { DB } from "../db/db.connection";
import { CartLineItem, carts } from "../db/schema";
import { CartWithLineItems } from "../dto/cartRequest.do";
// import { drizzle } from 'drizzle-orm/node-postgres';

// cart repo type
export type CartRepositoryType = {
    createCart: (customerId: number, lineItem: CartLineItem) => Promise<number>;
    findCart: (id: number) => Promise<CartWithLineItems>;
    updateCart: (id: number, qty: number) => Promise<CartLineItem>;
    deleteCart: (id: number) => Promise<Boolean>;
    clearCartData: (id: number) => Promise<Boolean>;
    findCartByProductId: (
        customerId: number,
        productId: number
    ) => Promise<CartLineItem>;
};

// Connect database with drizzle

const createCart = async (input: any): Promise<{}> => {
    const result = await DB.insert(carts).values({
        customerId: 123
    }).returning({ cartId: carts.id});

    console.log(result);

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

const clearCartData = async(id: number): Promise<boolean> => {
    await DB.delete(carts).where(eq(carts.id, id)).returning();
    return true;
}

export const CartRepository: CartRepositoryType = {
    create: createCart,
    find: findCart,
    update: updateCart,
    delete: deleteCart
};
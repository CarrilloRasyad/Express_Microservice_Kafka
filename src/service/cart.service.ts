import { CartRequestInput } from "../dto/cartRequest.do";
// import { CartRepositoryType } from "../types/repository.type";
import { CartRepositoryType } from "../repository/cart.repository";
import { logger, NotFoundError } from "../utils";
import { GetProductDetails } from "../utils/broker";

export const CreateCart = async (input: CartRequestInput, repo: CartRepositoryType) => {
    const product = await GetProductDetails(input.productId);
    logger.info(product);
    if(product.stock < input.qty) {
        throw new NotFoundError("product is out of stock");
    }
    // const data = await repo.create(input);
    return product;
};

export const GetCart = async (input: any, repo: CartRepositoryType) => {
    const data = await repo.findCart(input);
    return data;
};

export const EditCart = async (input: any, repo: CartRepositoryType) => {
    const data = await repo.updateCart(input.id, input.qty);
    return data;
};

export const DeleteCart = async (input: any, repo: CartRepositoryType) => {
    const data = await repo.deleteCart(input.id);
    return data;
};
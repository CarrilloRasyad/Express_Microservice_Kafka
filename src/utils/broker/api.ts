import axios from 'axios';
import { APIError, AuthorizeError, NotFoundError } from '../error';
import { logger } from '../logger';
import { Product } from '../../dto/product.dto';

const CATALOG_BASE_URL = process.env.CATALOG_BASE_URL || "http://localhost:9001";

const AUTH_SERVICE_BASE_URL = process.env.AUTH_SERVICE_BASE_URL || "http://localhost:9002";

export const GetProductDetails = async(productId: number) => {

    try {
        const response = await axios.get(`${CATALOG_BASE_URL}/products/${productId}`);
        const product = response.data;
        return product;
    } catch (error) {
        logger.error(error);
        throw new NotFoundError("product not found");
    }
};

export const GetStockDetails = async(ids: number[]) => {
    try {
        const response = await axios.get(`${CATALOG_BASE_URL}/products/stock`, {
            params: {
                ids,
            },
        });
        return response.data as Product[];
    } catch (error) {
        logger.error(error);
        throw new NotFoundError("error on getting stock details");     
    }
}

export const ValidateUser = async(token: string) => {
    try {
        console.log("Validate User called", token);
        const response = await axios.get(`${AUTH_SERVICE_BASE_URL}/auth/validate`, {
            headers: {
                Authorization: token,
            },
        });
        console.log("response", response);
    } catch (error) {
        logger.error(error);
        throw new AuthorizeError("user not authorized")
    }
}
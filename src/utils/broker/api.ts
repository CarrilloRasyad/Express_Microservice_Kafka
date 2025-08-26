import axios from 'axios';

const CATALOG_BASE_URL = process.env.CATALOG_BASE_URL || "http://localhost:9001";

export const GetProductDetails = async(productId: number) => {


    return {
        stock: 10,
        price: 100
    };
};
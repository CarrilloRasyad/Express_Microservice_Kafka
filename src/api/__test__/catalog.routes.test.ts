import request from 'supertest';
import express from 'express';
import { faker } from '@faker-js/faker';
import catalogRoutes from '../catalog.routes';

const app = express();
app.use(express.json());
app.use(catalogRoutes);

const mockRequest = () => {
    return {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        stock: faker.number.int({min: 10, max: 1000}),
        price: +faker.commerce.price()
    };
};

describe("Catalog Routes", () => {
    describe("POST /products", () => {
        test("create product successfully", async() => {
            const reqBody = mockRequest()
            const response = await request(app)
             .post("/products")
             .send(reqBody)
             .set("Accept", "application/json");
            console.log("Test response", response)
            expect(response.status).toBe(201);
        })
    }) 
})
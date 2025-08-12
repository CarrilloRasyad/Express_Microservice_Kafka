import request from 'supertest';
import express from 'express';
import { faker } from '@faker-js/faker';
import catalogRoutes, {catalogService} from '../catalog.routes';
import { ProductFactory } from '../../utils/fixtures';

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
            const product = ProductFactory.build()
            jest
             .spyOn(catalogService, "createProduct")
             .mockImplementationOnce(() => Promise.resolve(product));

            const response = await request(app)
             .post("/products")
             .send(reqBody)
             .set("Accept", "application/json");
            expect(response.status).toBe(201);
            expect(response.body).toEqual(product);
        });
        // BAD REQUEST HTTP REQUEST 400
        test("response with validation error 400", async() => {
            const reqBody = mockRequest()
            const response = await request(app)
             .post("/products")
             .send({...reqBody, name: ""})
             .set("Accept", "application/json");
            expect(response.status).toBe(400);
            expect(response.body).toEqual("name must be field can't empty");
        });
    });
});
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
            const reqBody = mockRequest();
            const response = await request(app)
             .post("/products")
             .send({...reqBody, name: ""})
             .set("Accept", "application/json");
            // console.log(response);
            // isi dari method toBe harus sama dengan isi expect yang di ambil dari response status
            expect(response.status).toBe(400);
            // isi dari method toEqual harus sama dengan isi expect yang di ambil dari response body
            expect(response.body).toEqual("name should not be empty");
        });

        test("response with an internal server error 500", async() => {
            const reqBody = mockRequest();
            jest
             .spyOn(catalogService, "createProduct")
             .mockImplementationOnce(() => Promise.reject(new Error("error occurred on create product")));
            const response = await request(app)
             .post("/products")
             .send(reqBody)
             .set("Accept", "application/json");

            expect(response.status).toBe(500);
            expect(response.body).toEqual("error occurred on create product");
            
        })
    });
});
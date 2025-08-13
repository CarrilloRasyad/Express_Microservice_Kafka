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
    describe("PATCH /products/:id", () => {
        test("update product successfully", async() => {
            const product = ProductFactory.build()
            const reqBody = {
                name: product.name,
                price: product.price,
                stock: product.stock
            };
            jest
             .spyOn(catalogService, "updateProduct")
             .mockImplementationOnce(() => Promise.resolve(product));

            const response = await request(app)
             .patch(`/products/${product.id}`)
             .send(reqBody)
             .set("Accept", "application/json");
            expect(response.status).toBe(200);
            expect(response.body).toEqual(product);
        });
       
        test("response with validation error 400", async() => {
            const product = ProductFactory.build();
            const reqBody = {
                name: product.name,
                price: product.price,
                stock: "handphone",
            };
            const response = await request(app)
             .patch(`/products/${product.id}`)
             .send({...reqBody})
             .set("Accept", "application/json");
            // console.log(response);
            expect(response.status).toBe(400);
            expect(response.body).toEqual("stock must be a number conforming to the specified constraints");
        });

        test("response with an internal server error 500", async() => {
            const product = ProductFactory.build();
            const reqBody = mockRequest();
            jest
             .spyOn(catalogService, "updateProduct")
             .mockImplementationOnce(() => Promise.reject(new Error("unable to update product")));
            const response = await request(app)
             .patch(`/products/${product.id}`)
             .send(reqBody)
             .set("Accept", "application/json");

            expect(response.status).toBe(500);
            expect(response.body).toEqual("unable to update product");
            
        });
    });

    describe("GET /products?limit=0&offset=0", () => {
        test("response to get all products", async() => {
            const randomLimit = faker.number.int({min: 10, max: 1000});
            const product = ProductFactory.buildList(randomLimit);
            jest
             .spyOn(catalogService, "getProducts")
             .mockImplementationOnce(() => Promise.resolve(product));
            const response = await request(app)
             .get(`/products?limit=${randomLimit}&offset=0`)
             .set("Accept", "application/json");
            expect(response.status).toBe(200);
            expect(response.body).toEqual(product);
        });
    });

    describe("GET /products/:id", () => {
        test("response get product with id", async() => {
            const product = ProductFactory.build();
            jest
             .spyOn(catalogService, "getProduct")
             .mockImplementationOnce(() => Promise.resolve(product));

            const response  = await request(app) 
             .get(`/products/${product.id}`)
             .set("Accept", "application/json");
            expect(response.status).toBe(200);
            expect(response.body).toEqual(product);
        });
    });

    describe("DELETE /products/:id", () => {
        test("response delete product by id", async() => {
            const product = ProductFactory.build();
            jest
             .spyOn(catalogService, "deleteProduct")
             .mockImplementationOnce(() => Promise.resolve({id: product.id}))
            const response = await request(app)
             .delete(`/products/${product.id}`)
             .set("Accept", "application/json");
            expect(response.status).toBe(200);
            expect(response.body).toEqual({id: product.id});
        });
    });
});
import { ICatalogRepository } from "../../interface/catalogRepository.interface";
import { Product } from "../../models/product.model";
import { MockCatalogRepository } from "../../repository/mockCatalog.repository";
import { CatalogService } from "../catalog.service";
import { faker } from '@faker-js/faker';
import { Factory } from "rosie";

const productFactory = new Factory<Product>()
    .attr("id", faker.number.int({min: 1, max: 1000}))
    .attr("name", faker.commerce.productName())
    .attr("description", faker.commerce.productDescription())
    .attr("stock", faker.number.int({min: 10, max: 100}))
    .attr("price", +faker.commerce.price())

const mockProduct = (rest: any) => {
    return {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        stock: faker.number.int({min: 10, max: 100}),
        ...rest,
    };
};

describe("catalogService", () => {

    let repository: ICatalogRepository;

    beforeEach(() => {
        repository = new MockCatalogRepository();
    });

    afterEach(() => {
        repository = {} as MockCatalogRepository;
    });

    describe("createProduct", () => {
        // TESTING create product
        test("should create product", async () => {
            const service = new CatalogService(repository);
            const reqBody = mockProduct({
                price: +faker.commerce.price(),
            });
            const result = await service.createProduct(reqBody);
            expect(result).toMatchObject({
                id: expect.any(Number),
                name: expect.any(String),
                description: expect.any(String),
                price: expect.any(Number),
                stock: expect.any(Number),
            });
        });
        // TESTING error unable to create product
        test("should throw error with unable to create product", async() => {
            const service = new CatalogService(repository);
            const reqBody = mockProduct({
                price: +faker.commerce.price()
            });
            jest
            .spyOn(repository, 'create')
            .mockImplementationOnce(() => Promise.resolve({} as Product));

            await expect(service.createProduct(reqBody)).rejects.toThrow("unable to create product");
        });
        // TESTING
        test("should throw error with product already exists ", async() => {
            const service = new CatalogService(repository);
            const reqBody = mockProduct({
                price: +faker.commerce.price()
            });
            jest
            .spyOn(repository, 'create')
            .mockImplementationOnce(() => Promise.reject(new Error("product already exists")));

            await expect(service.createProduct(reqBody)).rejects.toThrow("product already exists");
        });
    });

    describe("updateProduct", () => {
        test("should update product", async() => {
            const service = new CatalogService(repository);
            const reqBody = mockProduct({
                price: +faker.commerce.price(),
                id: faker.number.int({min: 10, max: 1000}),
            });
            const result = await service.updateProduct(reqBody);
            expect(result).toMatchObject(reqBody);
        });

        test("should throw error with product does not exists", async() => {
            const service = new CatalogService(repository);
            jest
            .spyOn(repository, 'update')
            .mockImplementationOnce(() => Promise.reject(new Error("product does not exists")));

            await expect(service.updateProduct({})).rejects.toThrow("product does not exists");
        });
    });

    describe("getProducts", () => {
        test("should get products by offset and limit", async() => {
            const service = new CatalogService(repository);
            const randomLimit = faker.number.int({min: 10, max: 50})
            const result = await service.getProducts(randomLimit, 0);

            expect(result.length).toEqual(randomLimit);
            expect(result).toMatchObject([
                {

                }
            ])

        });

    });
});
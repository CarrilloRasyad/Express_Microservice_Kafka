import { ICatalogRepository } from "../../interface/catalogRepository.interface";
import { CatalogRepository } from "../../repository/catalog.repository";
import { MockCatalogRepository } from "../../repository/mockCatalog.repository";
import { CatalogService } from "../catalog.service";


describe("catalogService", () => {

    let repository: ICatalogRepository

    beforeEach(() => {
        repository = new MockCatalogRepository()
    });

    afterEach(() => {
        repository = {} as MockCatalogRepository;
    });

    describe("createProduct", () => {
        test("should create product", async() => {
            const service = new CatalogService(repository);
            const reqBody = {
                name: "Iphone",
                description: "Ini handhphone terbaru",
                stock: 100,
                price: 1200,
            };
            const result = await service.createProduct({reqBody});
            expect(result).toMatchObject({
                id: expect.any(Number),
                name: expect.any(String),
                description: expect.any(String),
                price: expect.any(Number),
                stock: expect.any(Number),
            })
        })

        test("should throw error with product already exists", () => {

        })
    });
});
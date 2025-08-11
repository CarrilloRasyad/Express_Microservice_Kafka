import { ICatalogRepository } from "../interface/catalogRepository.interface";

export class CatalogService {

    private _repository: ICatalogRepository;

    constructor(repository: ICatalogRepository) {
        this._repository = repository;
    }

    async createProduct(input: any) {
        const data = await this._repository.create(input);
        if(!data.id) {
            throw new Error("unable to create product");
        }
        return data;
    }

    async updateProduct(input: any) {
        const data = await this._repository.update(input);
        // emit event to update record in Elastic Search
        return data;
    }

    async getProducts(limit: number, offset: number) {
        const products = await this._repository.find(limit, offset);
        return products;
    }
    getProduct(id: number) {}

    deleteProduct(id: number) {}
}
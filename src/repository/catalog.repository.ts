import { PrismaClient } from "../generated/prisma";
import { ICatalogRepository } from "../interface/catalogRepository.interface";
import { Product } from "../models/product.model";
import { ProductFactory } from "../utils/fixtures";

export class CatalogRepository implements ICatalogRepository {

    _prisma: PrismaClient;

    constructor() {
        this._prisma = new PrismaClient();
    }

    async findStock(ids: number): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }
    async create(data: Product): Promise<Product> {
        return this._prisma.product.create({
            data,
        });
    }
    async update(data: Product): Promise<Product> {
        return this._prisma.product.update({
            where: {id: data.id},
            data: data,
        });
    }
    async delete(id: any): Promise<{}> {
        return this._prisma.product.delete({
            where: {id},
        });
    }
    async find(limit: number, offset: number): Promise<Product[]> {
        return this._prisma.product.findMany({
            take: limit,
            skip: offset,
        });
    }
    async findOne(id: number): Promise<Product> {
        const product = await this._prisma.product.findFirst({
            where: {id},
        });

        if(product) {
            return Promise.resolve(product);
        }

        throw new Error("product not found");
    }
    
}
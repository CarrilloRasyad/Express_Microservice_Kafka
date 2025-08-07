export interface ICatalogRepository {
    create(data: any): Promise<{}>;
    update(data: any): Promise<{}>;
    delete(id: any): Promise<void>;
    find(): Promise<[]>;
    findOne(id: number): Promise<{}>;
}
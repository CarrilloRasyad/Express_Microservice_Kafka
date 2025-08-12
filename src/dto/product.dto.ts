import { IsNotEmpty, IsString } from "class-validator";

export class CreateProductRequest {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    description: string;

    price: number;
    stock: number;
}
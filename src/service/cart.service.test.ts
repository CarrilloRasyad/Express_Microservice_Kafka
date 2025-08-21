import { CartRepositoryType } from "../types/repository.type";
import * as Repository from "../repository/cart.repository";

import { CreateCart, DeleteCart, EditCart, GetCart } from "../service/cart.service";
import { title } from "process";


describe("cartService ", () => {

    let repo: CartRepositoryType;

    beforeEach(() => {
        repo = Repository.CartRepository;
    });

    afterEach(() => {
        repo = {} as CartRepositoryType;
    });

     it("return correct data while creating cart", async () => {
        const mockCart = {
            title: "Smart Phone",
            amount: 1200
        }

        const res = await CreateCart(mockCart, repo);

        expect(res).toEqual({
            message: "fake response from cart repo",
            input: mockCart
        });

     });

     it("return ok get data cart", async () => {

        const mockCart = {
            title: "smart phone",
            amount: 1200
        };

        jest
         .spyOn(Repository.CartRepository, "create")
         .mockImplementationOnce(() => 
            Promise.resolve({
                message: "fake response create from cart repo",
                input: mockCart
            })
         );

        const res = await GetCart(mockCart, repo);

        expect(res).toEqual({
            message: "fake response get cart from repo",
            input: mockCart
        });
     });

     it("return ok update data cart", async () => {
        const mockCart = {
            title: "iphone",
            amount: 2000
        };

        const res = await EditCart(mockCart, repo);
        expect(res).toEqual({
            message: "fake response update cart from repo",
            input: mockCart
        });
     });

     it("return ok delete data cart", async () => {
        const mockCart = {
            item: "iphone",
            amount: 2000
        };

        const res = await DeleteCart(mockCart, repo);
        expect(res).toEqual({
            message: "fake response delete cart from repo",
            input: mockCart
        });
     });
});
import { CartRepositoryType } from "../types/repository.type";
import * as Repository from "../repository/cart.repository";

import { CreateCart, GetCart } from "../service/cart.service";


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

        const res = await GetCart(mockCart, repo);

        expect(res).toEqual({
            message: "fake response get cart from repo",
            input: mockCart
        });
     });
});
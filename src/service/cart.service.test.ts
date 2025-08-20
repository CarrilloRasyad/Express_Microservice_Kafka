import { CartRepositoryType } from "../types/repository.type";
import * as Repository from "../repository/cart.repository";

import { CreateCart } from "../service/cart.service";


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

     })
});
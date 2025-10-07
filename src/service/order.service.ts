import { CartRepositoryType } from "../repository/cart.repository";
import { OrderLineItemType, OrderWithLineItems } from "../dto/orderRequest.dto";
import { OrderRepositoryType } from "../repository/order.repository";
import { MessageType, OrderStatus } from "../types";
import { MessageBrokerType } from "../utils";

export const CreateOrder = async(userId: number, repo: OrderRepositoryType, cartRepo: CartRepositoryType) => {
    const cart = await cartRepo.findCart(userId);
    if(!cart) {
        throw new Error("Cart not found");
    }
    let cartTotal = 0;
    let orderLineItems: OrderLineItemType[] = [];

    cart.lineItems.forEach((item) => {
        cartTotal += item.qty * Number(item.price);
        orderLineItems.push({
            productId: item.productId,
            itemName: item.itemName,
            qty: item.qty,
            price: item.price
        } as OrderLineItemType);
    });
    
    const orderNumber = Math.floor(Math.random() * 1000000);

    const orderInput: OrderWithLineItems = {
        orderNumber: orderNumber,
        tnxId: null,
        status: OrderStatus.PENDING,
        customerId: userId,
        amount: cartTotal.toString(),
        orderItems: orderLineItems,
    };

    const order = await repo.createOrder(orderInput);
    await cartRepo.clearCartData(userId);
    console.log("Order created", order);

    return {message: "Order created successfully", orderNumber: orderNumber};
};


export const UpdateOrder = async(orderId: number, status: OrderStatus, repo: OrderRepositoryType) => {
    await repo.updateOrder(orderId, status);
    if(status === OrderStatus.CANCELED) {
        // await repo.publishOrderEvent
    }
    return {message: "Order updated successfully"};
};

export const GetOrder = async(orderId: number, repo: OrderRepositoryType) => {
    const order = repo.findOrder(orderId);
    if(!order) {
        throw new Error("order not found");
    }
    return order;
};

export const GetOrders = async(userId: number, repo: OrderRepositoryType) => {
    const orders = await repo.findOrderByCustomerId(userId);
    if(!Array.isArray(orders)) {
        throw new Error("Orders not found");
    }
    return orders;
};

export const DeleteOrder = async(orderId: number, repo:OrderRepositoryType) => {
    await repo.deleteOrder(orderId);
    return true;
};

export const HandleSubscription = async(message: MessageType) => {
    console.log("Message received by order kafka consumer", message);
};
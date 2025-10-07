import { Consumer, Producer } from "kafkajs";
import { MessageBroker } from "../utils"
import { HandleSubscription } from "./order.service";
import { OrderEvent } from "../types";

export const InitializeBroker = async() => {
    const producer = await MessageBroker.connectProducer<Producer>();
    producer.on("producer.connect", async() => {
        console.log("Producer connected successfully");
    });

    const consumer = await MessageBroker.connectConsumer<Consumer>();
    consumer.on("consumer.connect", async() => {
        console.log("Consumer connected successfully");
    });

    await MessageBroker.subscribe(HandleSubscription, "OrderEvents");

};

export const SendCreateOrderMessage = async(data: any) => {
    await MessageBroker.publish({
        event: OrderEvent.CREATE_ORDER,
        topic: "CatalogEvents",
        headers: {},
        message: data,
    });
};

export const SendOrderCanceledMessage = async(data: any) => {
    await MessageBroker.publish({
        event: OrderEvent.CANCEL_ORDER,
        topic: "CatalogEvents",
        headers: {},
        message: data,
    });
};
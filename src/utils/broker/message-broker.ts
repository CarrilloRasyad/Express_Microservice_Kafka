import { TOPIC_TYPE } from "../../types";
import { MessageBrokerType, MessageHandler, PublishType } from "./broker.type";

export const MessageBroker: MessageBrokerType = {
    connectProducer: function <T>(): Promise<T> {
        throw new Error("Function not implemented.");
    },
    disconnectProducer: function (): Promise<void> {
        throw new Error("Function not implemented.");
    },
    publish: function (data: PublishType): Promise<boolean> {
        throw new Error("Function not implemented.");
    },
    connectConsumer: function <T>(): Promise<T> {
        throw new Error("Function not implemented.");
    },
    disconnectConsumer: function (): Promise<void> {
        throw new Error("Function not implemented.");
    },
    subscribe: function (messageHandler: MessageHandler, topic: TOPIC_TYPE): Promise<void> {
        throw new Error("Function not implemented.");
    }
}
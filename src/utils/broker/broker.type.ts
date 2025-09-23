export type MessageBrokerType = {
    // Producer
    connectProducer: <T>() => Promise<T>;
    disconnectProducer: () => Promise<void>;
    publish: (data: unknown) => Promise<boolean>;

    // Consumer
    connectConsumer: <T> () => Promise<T>;
    disconnectConsumer: () => Promise<void>;
    subscribe: (messageHandler: Function, topic: string) => Promise<void>;
}
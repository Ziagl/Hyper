namespace hyperEngine {
    export interface IMessageHandler {
        onMessage(message: Message): void;
    }
}

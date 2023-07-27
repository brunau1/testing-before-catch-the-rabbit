export interface RabbitConsumer {
  consume(): Promise<void>;
}

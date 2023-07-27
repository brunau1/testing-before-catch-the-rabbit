export interface RabbitProducer {
  publish(payload: unknown): Promise<void>;
}

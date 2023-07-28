import {Channel, Message, MessageProperties} from 'amqplib';

import {RabbitConsumer} from '../interfaces/rabbit-consumer';
import {IConsumerConfiguration} from '../interfaces/consumer-configuration';

export abstract class StandardConsumer implements RabbitConsumer {
  protected abstract processMessage(
    payload: unknown,
    messageProperties: MessageProperties
  ): Promise<void>;

  public async consume(): Promise<void> {
    console.info(`Consuming messages`);

    const {queueName, prefetchCount, durable, consumerParameters} =
      this.configuration;

    await this.channel.prefetch(prefetchCount);

    await this.channel.assertQueue(queueName, {durable});

    await this.channel.consume(
      queueName,
      this.handleMessage.bind(this),
      {...consumerParameters, noAck: false} // ensure that the consumer will not be acked automatically
    );
  }

  protected parseMessageContent(message: Message): unknown {
    return JSON.parse(message.content.toString());
  }

  protected async handleMessage(message: Message | null): Promise<void> {
    if (message) {
      console.info(`Message received`);

      const {requeueOnFailure} = this.configuration;

      try {
        const parsedMessage = this.parseMessageContent(message);

        await this.processMessage(parsedMessage, message.properties);
      } catch (error) {
        console.error(error);

        if (requeueOnFailure) {
          this.channel.nack(message, false, true);
        }
      } finally {
        this.channel.ack(message);
      }
    }
  }

  constructor(
    private readonly configuration: IConsumerConfiguration,
    private readonly channel: Channel
  ) {}
}

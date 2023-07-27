import {Channel} from 'amqplib';

import {RabbitProducer} from '../interfaces/rabbit-producer';
import {IProducerConfiguration} from '../interfaces/producer-configuration';

export abstract class StandardProducer implements RabbitProducer {
  public async publish(payload: unknown): Promise<void> {
    const {queueName, durable, producerParameters} = this.configuration;

    await this.channel.assertQueue(queueName, {durable});

    const encodedMessage = this.encodeMessageContent(payload);

    this.channel.sendToQueue(queueName, encodedMessage, producerParameters);
  }

  protected encodeMessageContent(message: unknown): Buffer {
    return Buffer.from(JSON.stringify(message));
  }

  constructor(
    private readonly configuration: IProducerConfiguration,
    private readonly channel: Channel
  ) {}
}

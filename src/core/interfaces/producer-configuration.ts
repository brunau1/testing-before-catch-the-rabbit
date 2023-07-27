import {Options} from 'amqplib';

export interface IProducerConfiguration {
  queueName: string;
  durable?: boolean;
  producerParameters?: Options.Publish;
}

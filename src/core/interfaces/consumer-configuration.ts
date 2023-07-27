import {Options} from 'amqplib';

export interface IConsumerConfiguration {
  queueName: string;
  durable: boolean;
  prefetchCount: number;
  requeueOnFailure: boolean;
  consumerParameters?: Options.Consume;
}

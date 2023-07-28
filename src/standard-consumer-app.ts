import {TransactionConsumerService} from './application';
import {
  ConnectionConfiguration,
  IConsumerConfiguration,
  RabbitConnection,
} from './core';

export class StandardConsumerApp {
  constructor() {
    console.log('ProducerApp');
  }

  static async start() {
    console.log('starting producer app');

    const consumerConfiguration: IConsumerConfiguration = {
      queueName: 'transaction-queue',
      durable: true,
      prefetchCount: 1,
      requeueOnFailure: false,
      consumerParameters: {},
    };

    const connConfig = ConnectionConfiguration.create();

    const connection = RabbitConnection.create(connConfig);

    const channel = await connection.createChannel();

    const consumer = TransactionConsumerService.create(
      consumerConfiguration,
      channel
    );

    await consumer.consume();
  }
}

StandardConsumerApp.start();

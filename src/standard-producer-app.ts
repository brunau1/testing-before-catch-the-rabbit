import {TransactionDto, TransactionProducerService} from './application';
import * as uuid from 'uuid';
import {
  ConnectionConfiguration,
  IProducerConfiguration,
  RabbitConnection,
} from './core';

export class StandardProducerApp {
  constructor() {
    console.log('ProducerApp');
  }

  static async start() {
    console.log('starting producer app');

    const producerConfiguration: IProducerConfiguration = {
      queueName: 'transaction-queue',
      durable: true,
      producerParameters: {},
    };

    const connConfig = ConnectionConfiguration.create();

    const connection = RabbitConnection.create(connConfig);

    const channel = await connection.createChannel();

    const producer = TransactionProducerService.create(
      producerConfiguration,
      channel
    );

    setInterval(async () => {
      const transaction: TransactionDto = {
        id: uuid.v4(),
        amount: Math.random() * 100,
        currency: 'BRL',
        date: new Date().toISOString(),
        receiver: Math.random().toString(36).substring(7),
        sender: Math.random().toString(36).substring(7),
        status: 'PENDING',
      };

      await producer.publish(transaction);
    }, 1000);
  }
}

StandardProducerApp.start();

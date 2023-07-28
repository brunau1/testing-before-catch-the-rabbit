import {Channel, MessageProperties} from 'amqplib';
import {StandardConsumer} from '../../core/abstract-entities/standard-consumer';
import {IConsumerConfiguration} from '../../core/interfaces/consumer-configuration';
import {TransactionDto} from '../dtos/transaction-dto';

export class TransactionConsumerService extends StandardConsumer {
  constructor(configuration: IConsumerConfiguration, channel: Channel) {
    super(configuration, channel);
  }

  protected async processMessage(
    payload: TransactionDto,
    messageProperties: MessageProperties
  ): Promise<void> {
    const transaction = payload;
    console.log(
      `Correlation ID: ${
        messageProperties.correlationId
      } | Received transaction: ${JSON.stringify(transaction)}`
    );
  }

  static create(
    configuration: IConsumerConfiguration,
    channel: Channel
  ): TransactionConsumerService {
    return new TransactionConsumerService(configuration, channel);
  }
}

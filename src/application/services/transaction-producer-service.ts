import {Channel} from 'amqplib';
import {StandardProducer} from '../../core/abstract-entities/standard-producer';
import {IProducerConfiguration} from '../../core/interfaces/producer-configuration';
import {TransactionDto} from '../dtos/transaction-dto';

export class TransactionProducerService extends StandardProducer {
  constructor(configuration: IProducerConfiguration, channel: Channel) {
    super(configuration, channel);
  }
  
  async publish(payload: TransactionDto): Promise<void> {
    console.log(`Publishing transaction: ${JSON.stringify(payload)}`);

    await super.publish(payload);
  }

  static create(
    configuration: IProducerConfiguration,
    channel: Channel
  ): TransactionProducerService {
    return new TransactionProducerService(configuration, channel);
  }
}

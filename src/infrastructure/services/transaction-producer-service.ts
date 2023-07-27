import {StandardProducer} from '../../core/abstract-entities/standard-producer';
import {TransactionDto} from '../dtos/transaction-dto';

export class TransactionProducerService extends StandardProducer {
  constructor(configuration, channel) {
    super(configuration, channel);
  }
  async publish(payload: TransactionDto): Promise<void> {
    console.log(`Publishing transaction: ${JSON.stringify(payload)}`);

    await super.publish(payload);
  }
}

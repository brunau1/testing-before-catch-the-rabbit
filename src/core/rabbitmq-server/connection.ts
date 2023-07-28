import {Channel, connect, Connection} from 'amqplib';
import {IConnectionConfiguration} from '../interfaces/connection-configuration';

export class RabbitConnection {
  private async connect(): Promise<Connection> {
    const connection = await connect(this.configuration);

    connection.on('error', error => {
      console.error(`Connection error: ${error.message}`);
    });

    connection.on('close', () => {
      console.warn(`Connection closed`);
    });

    return connection;
  }

  async createChannel(): Promise<Channel> {
    console.info(`Creating channel`);

    const connection = await this.connect();

    let channel = await connection.createChannel();

    channel.on('error', error =>
      console.error(`Channel error: ${error.message}`)
    );

    channel.on('close', async event => {
      console.warn(`Event emitted: ${event}`);
      console.warn(`Channel closed`);

      connection.removeAllListeners();
      connection.close();

      channel = await this.createChannel();
    });

    return channel;
  }

  constructor(private readonly configuration: IConnectionConfiguration) {}

  static create(configuration: IConnectionConfiguration): RabbitConnection {
    return new RabbitConnection(configuration);
  }
}

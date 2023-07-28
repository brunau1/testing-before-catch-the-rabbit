import {IConnectionConfiguration} from '../interfaces/connection-configuration';

export class ConnectionConfiguration implements IConnectionConfiguration {
  frameMax: number = 0;
  heartbeat: number = 0;
  hostname: string = 'localhost';
  locale: string = 'en_US';
  protocol: string = 'amqp';
  username: string = 'username';
  password: string = 'password';
  port: number = 5672;
  vhost: string = '/';

  static create(): IConnectionConfiguration {
    return new ConnectionConfiguration();
  }
}

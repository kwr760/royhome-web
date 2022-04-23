import * as Stomp from '@stomp/stompjs';
import { env } from '../../../config/env';

export const connectStomp = (destination: string, callback: (msg: { body: string }) => void): Stomp.Client => {
  const client = new Stomp.Client({
    brokerURL: env.websocketUrl,
    reconnectDelay: 3000,
    // debug: (msg) => {
    //   console.log(msg);
    // },
  });
  client.onConnect = () => {
    client.subscribe(destination, callback);
  };
  client.activate();

  return client;
};

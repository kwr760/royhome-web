import * as Stomp from '@stomp/stompjs';
import { getWssUrl } from '../functions/get-wss-url';

export const connectStomp = (destination: string, callback: (msg: { body: string }) => void): Stomp.Client => {
  const client = new Stomp.Client({
    brokerURL: getWssUrl('tictactoe'),
    reconnectDelay: 3000,
  });
  client.onConnect = () => {
    client.subscribe(destination, callback);
  };
  client.activate();

  return client;
};

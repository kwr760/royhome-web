import { useEffect, useState } from 'react';
import { initWebSocket, remote } from '../context/context.actions';
import { useTicTacToe } from '../context/context.provider';

export const useWebsocket = () => {
  const { state, dispatch } = useTicTacToe();
  const [initiated, setInitiated] = useState(false);
  const { client, sessionId  } = state;

  useEffect(() => {
    const callback = (msg: { body: string; }) => {
      dispatch(remote({
        message: msg.body,
      }));
    };

    if (!initiated) {
      const destination = `/session/${sessionId}`;
      dispatch(initWebSocket({
        client,
        destination,
        callback,
      }));
      setInitiated(true);
    }
  }, [client, dispatch, initiated, sessionId]);
};

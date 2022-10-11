import { useEffect, useState } from 'react';
import { initWebSocket } from '../context/context.actions';
import { useTicTacToe } from '../context/context.provider';
import { websocketCallback } from '../functions/websocket-callback';

export const useWebsocket = (): void => {
  const { state, dispatch } = useTicTacToe();
  const [initiated, setInitiated] = useState(false);
  const { client, sessionId  } = state;

  useEffect(() => {
    if (!initiated) {
      const destination = `/session/${sessionId}`;
      dispatch(initWebSocket({
        client,
        destination,
        callback: websocketCallback(dispatch),
      }));
      setInitiated(true);
    }
  }, [client, dispatch, initiated, sessionId]);
};

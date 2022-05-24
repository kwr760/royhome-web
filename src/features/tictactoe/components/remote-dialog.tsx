import React, { FunctionComponent, memo, useEffect, useState } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
} from '@mui/material';
import { withStyles } from '@mui/styles';
import type { WithStyles } from '@mui/styles';
import { initWebSocket, remote } from '../context/context.actions';
import { useTicTacToe } from '../context/context.provider';
import { styles } from '../styles/remote-dialog.styles';

interface Props {
  openDialog: boolean,
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}
type RemoteDialogProps = Props & WithStyles<typeof styles>;
const RemoteDialogComponent: FunctionComponent<RemoteDialogProps> = (
  { openDialog, setOpenDialog },
) => {
  const { state, dispatch } = useTicTacToe();
  const { client, sessionId, message } = state;
  const [msg, setMsg] = useState('initial message');
  const [initiated, setInitiated] = useState(false);
  useEffect(() => {
    if (message) {
      setMsg(message);
    }
  }, [message]);
  useEffect(() => {
    if (!initiated) {
      const destination = `/game/${sessionId}`;
      const callback = (msg: { body: string; }) => {
        dispatch(remote({
          message: msg.body,
        }));
      };
      dispatch(initWebSocket({
        client,
        destination,
        callback,
      }));
      setInitiated(true);
    }
  }, [client, dispatch, sessionId, initiated, setInitiated]);
  const onClose = () => {
    setOpenDialog(false);
  };
  const onMessage = () => {
    if (client) {
      client.publish({
        destination: '/connect',
        body: sessionId,
      });
    }
  };

  return (
    <Dialog open={openDialog} onClose={onClose} >
      <DialogTitle>Remote - Web Socket - Testing</DialogTitle>
      <DialogContent>
        Message from the web socket
        <br />
        {msg}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onMessage}>Message</Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(withStyles(styles)(RemoteDialogComponent));

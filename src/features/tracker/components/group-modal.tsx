import React, { FocusEvent, FunctionComponent, useState, memo, ChangeEvent } from 'react';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
} from '@mui/material';
import { type WithStyles, withStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { noId } from '../../../contracts/constants/auth0.constants';
import { getUser } from '../../../store/session/session.selector';
import { ActionEnum } from '../contracts/tracker.enum';
import { Group } from '../contracts/tracker.model';
import { addGroupApi } from '../store/add-group.action';
import { deleteGroupApi } from '../store/delete-group.action';
import { modifyGroupApi } from '../store/modify-group.action';
import { getGroupById } from '../store/tracker.selector';
import { styles } from '../styles/group-modal.styles';

interface Props {
  open: boolean;
  groupId?: string;
  onClose: () => void;
}
type GroupModalProps = Props & WithStyles<typeof styles>;
const GroupModalComponent: FunctionComponent<GroupModalProps> = (
  { open, groupId = noId,  onClose, classes },
) => {
  const dispatch = useDispatch();
  const group = useSelector(getGroupById(groupId));
  const [name, setName] = useState(group?.name);
  const [actionType, setActionType] = useState(groupId === noId ? ActionEnum.Add : ActionEnum.Modify);
  const { userId } = useSelector(getUser);

  const handleCancel = () => {
    onClose();
  };
  const handleCommit = async () => {
    const newGroup = {
      userId,
      activities: [],
      ...(group || {}),
      name,
    } as Group;

    switch (actionType) {
      case ActionEnum.Add: {
        await addGroupApi(dispatch, newGroup);
        break;
      }
      case ActionEnum.Modify: {
        await modifyGroupApi(dispatch, newGroup);
        break;
      }
      case ActionEnum.Delete: {
        await deleteGroupApi(dispatch, groupId);
        break;
      }
    }
    setName('');
    onClose();
  };
  const changeDeleteCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    setActionType(event.target.checked ? ActionEnum.Delete : ActionEnum.Modify);
  };
  const getCommitLabel = () => {
    switch (actionType) {
      case ActionEnum.Add:
        return 'Add';
      case ActionEnum.Modify:
        return 'Modify';
      case ActionEnum.Delete:
        return 'Delete';
    }
  };

  return (<Dialog open={open} className={classes.dialog} >
    <DialogTitle className={classes.title}>
      Group
    </DialogTitle>
    <DialogContent className={classes.content} >
      { actionType != ActionEnum.Add &&
        <FormControlLabel className={classes.checkbox} control={
          <Checkbox className={classes.checkbox} onChange={changeDeleteCheckbox}/>
        } label="Delete" />
      }
      <TextField
        id="group-name"
        label="Name"
        variant="filled"
        className={classes.input}
        defaultValue={name}
        onBlur={(event: FocusEvent<HTMLInputElement>) => setName(event.target.value)}
      />
    </DialogContent>
    <DialogActions className={classes.actions}>
      <Button className={classes.button} onClick={handleCancel}> Close </Button>
      <Button className={classes.button} onClick={handleCommit}>{ getCommitLabel() }</Button>
    </DialogActions>
  </Dialog>);
};

export default memo(withStyles(styles)(GroupModalComponent));

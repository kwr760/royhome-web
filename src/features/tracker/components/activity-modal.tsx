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
import { ActionEnum } from '../contracts/tracker.enum';
import { addActivityApi } from '../store/add-activity.action';
import { deleteActivityApi } from '../store/delete-activity.action';
import { modifyActivityApi } from '../store/modify-activity.action';
import { getActivityById, getGroupById } from '../store/tracker.selector';
import { styles } from '../styles/group-modal.styles';
import type { Activity } from '../contracts/tracker.model';

interface Props {
  open: boolean;
  groupId: string;
  activityId?: string;
  onClose: () => void;
}
type ActivityModalProps = Props & WithStyles<typeof styles>;
const ActivityModalComponent: FunctionComponent<ActivityModalProps> = (
  { open, groupId , activityId = noId, onClose, classes },
) => {
  const dispatch = useDispatch();
  const group = useSelector(getGroupById(groupId));
  const activity = useSelector(getActivityById(groupId, activityId));
  const [platform, setPlatform] = useState(activity?.platform);
  const [name, setName] = useState(activity?.activity);
  const [progress, setProgress] = useState(activity?.progress);
  const [actionType, setActionType] = useState(activityId === noId ? ActionEnum.Add : ActionEnum.Modify);

  const handleCancel = () => {
    onClose();
  };
  const handleCommit = async () => {
    const newActivity = {
      ...activity,
      group: {
        groupId,
      },
      platform,
      activity: name,
      progress,
    } as Activity;

    switch (actionType) {
      case ActionEnum.Add: {
        await addActivityApi(dispatch, newActivity);
        break;
      }
      case ActionEnum.Modify: {
        await modifyActivityApi(dispatch, newActivity);
        break;
      }
      case ActionEnum.Delete: {
        await deleteActivityApi(dispatch, newActivity);
        break;
      }
    }
    setPlatform('');
    setName('');
    setProgress('');
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
      Activity for {group?.name} Group
    </DialogTitle>
    <DialogContent className={classes.content} >
      { actionType != ActionEnum.Add &&
        <FormControlLabel className={classes.checkbox} control={
          <Checkbox className={classes.checkbox} onChange={changeDeleteCheckbox}/>} label="Delete" />
      }
      <TextField
        id="activity-platform"
        label="Platform"
        variant="filled"
        className={classes.input}
        defaultValue={platform}
        onBlur={(event: FocusEvent<HTMLInputElement>) => setPlatform(event.target.value)}
      />
      <TextField
        id="activity-activity"
        label="Activity"
        variant="filled"
        className={classes.input}
        defaultValue={name}
        onBlur={(event: FocusEvent<HTMLInputElement>) => setName(event.target.value)}
      />
      <TextField
        id="activity-progress"
        label="Progress"
        variant="filled"
        className={classes.input}
        defaultValue={progress}
        onBlur={(event: FocusEvent<HTMLInputElement>) => setProgress(event.target.value)}
      />
    </DialogContent>
    <DialogActions className={classes.actions}>
      <Button className={classes.button} onClick={handleCancel}> Close </Button>
      <Button className={classes.button} onClick={handleCommit}> { getCommitLabel() } </Button>
    </DialogActions>
  </Dialog>);
};

export default memo(withStyles(styles)(ActivityModalComponent));

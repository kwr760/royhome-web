import React, { FunctionComponent, memo, useState } from 'react';
import { ListItem, ListItemText, ListItemButton } from '@mui/material';
import { withStyles, type WithStyles } from '@mui/styles';
import { FiEdit } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { getActivityById } from '../store/tracker.selector';
import { styles } from '../styles/activity.styles';
import ActivityModal from './activity-modal';

interface Props {
  groupId: string,
  activityId: string,
}
type ActivityProps = Props & WithStyles<typeof styles>;
const Activity: FunctionComponent<ActivityProps> = ({groupId, activityId, classes}) => {
  const [showActivityDialog, setShowActivityDialog] = useState(false);
  const activity = useSelector(getActivityById(groupId, activityId));

  return (
    <>
      <ListItem className={`${classes.row} ${classes.noMarginVertical}`}>
        <ListItemText id={`platform-${activityId}`} className={`${classes.platform} ${classes.noMarginVertical}`} >
          { activity?.platform }</ListItemText>
        <ListItemText id={`activity-${activityId}`} className={`${classes.activity} ${classes.noMarginVertical}`} >
          { activity?.activity }</ListItemText>
        <ListItemText id={`progress-${activityId}`} className={`${classes.progress} ${classes.noMarginVertical}`} >
          { activity?.progress }</ListItemText>
        <ListItemButton
          id={`edit-${activityId}`}
          className={`${classes.edit} ${classes.noMarginVertical}`}
          onClick={() => setShowActivityDialog(true)}
        > Edit <FiEdit className={classes.editIcon}/> </ListItemButton>
      </ListItem>
      <ActivityModal
        open={showActivityDialog}
        groupId={groupId}
        activityId={activityId}
        onClose={() => setShowActivityDialog(false)} />
    </>
  );
};

export default memo(withStyles(styles)(Activity));

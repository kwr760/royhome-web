import React, { FunctionComponent, memo, useState } from 'react';
import { List, ListItem, ListItemButton, Collapse } from '@mui/material';
import { withStyles, type WithStyles } from '@mui/styles';
import { styles } from '../styles/group.styles';
import type { Activity as ActivityType } from '../contracts/tracker.model';
import Activity from './activity';
import { FiEdit, FiPlus } from 'react-icons/fi';
import GroupModal from './group-modal';
import ActivityModal from './activity-modal';

interface Props {
  groupId: string;
  name: string,
  activities: Array<ActivityType>;
}
type GroupProps = Props & WithStyles<typeof styles>;
const Group: FunctionComponent<GroupProps> = ({activities, groupId, name, classes}) => {
  const [openGroup, setOpenGroup] = useState(true);
  const [showGroupDialog, setShowGroupDialog] = useState(false);
  const [showActivityDialog, setShowActivityDialog] = useState(false);

  return (
    <>
      <List id={groupId}>
        <ListItem className={classes.groupHeader}>
          <ListItemButton onClick={() => setShowGroupDialog(true)} className={classes.first}>
            {name} <FiEdit className={classes.icon}/>
          </ListItemButton>
          <ListItemButton onClick={() => setOpenGroup(!openGroup)} id={`edit-${groupId}`}></ListItemButton>
          <ListItemButton onClick={() => setShowActivityDialog(true)} className={classes.last} group-id={groupId}>
            Add Activity <FiPlus className={classes.icon} />
          </ListItemButton>
        </ListItem>
        <Collapse in={openGroup} timeout="auto" unmountOnExit>
          <List className={classes.list}>
            {
              activities?.map(( { activityId }) => {
                return <Activity key={activityId} activityId={activityId} groupId={groupId}/>;
              })
            }
          </List>
        </Collapse>
      </List>
      <GroupModal open={showGroupDialog} groupId={groupId} onClose={() => setShowGroupDialog(false)} />
      <ActivityModal open={showActivityDialog} groupId={groupId} onClose={() => setShowActivityDialog(false)} />
    </>
  );
};

export default memo(withStyles(styles)(Group));

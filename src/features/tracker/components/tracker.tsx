import React, { FunctionComponent, memo, useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Container, List, ListItemButton, ListItemText } from '@mui/material';
import { withStyles, type WithStyles } from '@mui/styles';
import { getUser } from '../../../store/session/session.selector';
import { fetchTracker } from '../store/fetch-tracker.action';
import { getGroups } from '../store/tracker.selector';
import { styles } from '../styles/tracker.styles';
import { type Group as GroupType } from '../contracts/tracker.model';
import GroupModal from './group-modal';
import Group from './group';

type TrackerProps = WithStyles<typeof styles>;
const TrackerContainer: FunctionComponent<TrackerProps> = ({classes}) => {
  const dispatch = useDispatch();
  const { userId } = useSelector(getUser);
  const groups: Array<GroupType> = useSelector(getGroups);
  const [showGroupDialog, setShowGroupDialog] = useState(false);

  useEffect(() => {
    const loadTrackerGroups = async () => {
      if (userId) {
        await fetchTracker(dispatch, userId);
      }
    };
    loadTrackerGroups();
  }, [dispatch, userId]);

  return (
    <Container className={classes.container}>
      <List>
        <ListItemButton onClick={() => setShowGroupDialog(true)}>
          <ListItemText primary="Watch List Tracker" />
          Add Group <FiPlus className={classes.icon} />
        </ListItemButton>
        <Container className={classes.container}>
          {
            groups?.map((group: GroupType) => {
              return <Group
                key={group.groupId}
                groupId={group.groupId}
                name={group.name}
                activities={group.activities}
              />;
            })
          }
        </Container>
      </List>
      <GroupModal open={showGroupDialog} onClose={() => setShowGroupDialog(false)} />
    </Container>
  );
};

export default memo(withStyles(styles)(TrackerContainer));

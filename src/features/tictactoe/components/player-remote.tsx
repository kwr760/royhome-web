import { FormControlLabel, Switch, Typography } from '@mui/material';
import type { WithStyles } from '@mui/styles';
import { withStyles } from '@mui/styles';
import React, { FunctionComponent, memo } from 'react';
import { FiGlobe } from 'react-icons/fi';
import { styles } from '../styles/player-remote.styles';

type PlayerControlProps = WithStyles<typeof styles>;
const PlayerRemote: FunctionComponent<PlayerControlProps> = (
  { classes },
) => {
  return (
    <FormControlLabel
      sx={{ lineHeight: '32px' }}
      control={<Switch className={classes.remote} />}
      label={<Typography sx={{ lineHeight: '1' }}>
        <FiGlobe size="1.5em" className={classes.icon} />
      </Typography>}
    />
  );
};

export default memo(withStyles(styles)(PlayerRemote));

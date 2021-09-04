import React, { FunctionComponent } from 'react';
import { Box, Typography, Button, Link, Drawer } from '@material-ui/core';
import { ACKNOWLEDGED_COOKIE_USE_COOKIE, getCookie, setCookie } from '../../../util/cookies';

import { useStyles } from './index.styles';

const CookieBanner: FunctionComponent = () => {
  const classes = useStyles();
  const acknowledged = getCookie(ACKNOWLEDGED_COOKIE_USE_COOKIE);
  const [opened, setOpened] = React.useState(!acknowledged);

  const closeDrawer = () => {
    setOpened(false);
    setCookie(ACKNOWLEDGED_COOKIE_USE_COOKIE, 'true');
  };

  return (
    <Drawer anchor='bottom' open={opened}>
      <Box className={classes.banner}>
        <Typography
          className={classes.typography}
          align="center"
        >
          I use cookies on my website by continuing you agree to my use of cookies.
          For more details read the <Link href='/privacy' className={classes.link}>
          Privacy Policy</Link>.
        </Typography>
        <Button
          variant="contained"
          onClick={closeDrawer}
        >
          Proceed
        </Button>
      </Box>
    </Drawer>
  );
};

export default CookieBanner;

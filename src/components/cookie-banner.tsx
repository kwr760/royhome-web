import React, { FunctionComponent, memo } from 'react';
import { Box, Typography, Button, Link, Drawer } from '@mui/material';
import { withStyles } from '@mui/styles';
import type { WithStyles } from '@mui/styles';
import { ACKNOWLEDGED_COOKIE_USE_COOKIE, getCookie, setCookie } from '../util/cookies';
import { styles } from './styles/cookie-banner.styles';

type CookieBannerProps = WithStyles<typeof styles>;
const CookieBannerComponent: FunctionComponent<CookieBannerProps> = ({classes}) => {
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
          className={classes.button}
        >
          Proceed
        </Button>
      </Box>
    </Drawer>
  );
};

export default memo(withStyles(styles)(CookieBannerComponent));

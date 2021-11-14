import React, { FunctionComponent, memo } from 'react';
import { Container, Link, Popover, Box, Typography } from '@mui/material';
import { withStyles } from '@mui/styles';
import type { WithStyles } from '@mui/styles';
import { VscGithub } from 'react-icons/vsc';
import { styles } from './styles/footer.styles';

type FooterProps = WithStyles<typeof styles>;
const FooterComponent: FunctionComponent<FooterProps> = ({classes}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const handleOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'github-repo' : undefined;

  return (
    <Container className={classes.container}>
      <footer className={classes.banner}>
        <Box className={classes.box}>
          <Typography
            aria-owns={id}
            aria-haspopup="true"
            onMouseEnter={handleOpen}
            onClick={handleOpen}
            align="center"
            aria-label="github"
          >
            <VscGithub className={`${classes.icon} fa-2x`} />
            <span className="sr-only">Link to GitHub</span>
          </Typography>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'center', horizontal: 'center' }}
            className={classes.popover}
            disableRestoreFocus
          >
            <Container
              className={ classes.popoverContainer }
              onMouseLeave={handleClose}
            >
              <Typography className={classes.typography}>github:</Typography>
              <Link
                href="https://github.com/kwr760/royhome-web"
                target="_target"
                onClick={handleClose}
                className={classes.link}
                aria-label="github-ui"
              >
                <Typography className={classes.typography}>UI</Typography>
                <span className="sr-only">Link to UI GitHub</span>
              </Link>
              <Typography className={classes.typography}>/</Typography>
              <Link
                href="https://github.com/kwr760/royhome-api"
                target="_target"
                onClick={handleClose}
                className={classes.link}
                aria-label="github-api"
              >
                <Typography className={classes.typography}>API</Typography>
                <span className="sr-only">Link to API GitHub</span>
              </Link>
            </Container>
          </Popover>
        </Box>
      </footer>
    </Container>
  );
};

export default memo(withStyles(styles)(FooterComponent));

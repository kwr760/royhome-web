import React, { FunctionComponent } from 'react';
import { Container, Link } from '@material-ui/core';

import { VscGithub } from 'react-icons/vsc';
import { useStyles } from './index.styles';

const BottomBar: FunctionComponent = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <footer className={classes.banner}>
        <Link
          href="https://github.com/kwr760/royhome-web"
          target="_target"
        >
          <VscGithub className={`${classes.icon} fa-2x`} />
          <span className="sr-only">Link to GitHub</span>
        </Link>
      </footer>
    </Container>
  );
};

export default BottomBar;

import { Container } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import ReactMarkdown from 'react-markdown';

import projectMarkdown from '../../../PROJECT.md';

const About: FunctionComponent = () => (
  <Container>
    <ReactMarkdown
      source={projectMarkdown}
    />
  </Container>
);

export default About;

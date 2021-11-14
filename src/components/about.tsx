import React, { FunctionComponent } from 'react';
import { Container } from '@mui/material';
import ReactMarkdown from 'react-markdown';

import projectMarkdown from '../../PROJECT.md';

const About: FunctionComponent = () => (
  <Container>
    <ReactMarkdown>
      {projectMarkdown}
    </ReactMarkdown>
  </Container>
);

export default About;

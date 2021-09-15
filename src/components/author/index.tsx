import { Container } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import ReactMarkdown from 'react-markdown';

import authorMarkdown from '../../../AUTHOR.md';

const Author: FunctionComponent = () => (
  <Container>
    <ReactMarkdown
      source={authorMarkdown}
    />
  </Container>
);

export default Author;

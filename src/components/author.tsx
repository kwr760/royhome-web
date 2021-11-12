import React, { FunctionComponent } from 'react';
import { Container } from '@mui/material';
import ReactMarkdown from 'react-markdown';

import authorMarkdown from '../../AUTHOR.md';

const Author: FunctionComponent = () => (
  <Container>
    <ReactMarkdown>
      {authorMarkdown}
    </ReactMarkdown>
  </Container>
);

export default Author;

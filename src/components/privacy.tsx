import React, { FunctionComponent } from 'react';
import { Container } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import privacyMarkdown from '../../PRIVACY.md';

const Privacy: FunctionComponent = () => (
  <Container>
    <ReactMarkdown>
      {privacyMarkdown}
    </ReactMarkdown>
  </Container>
);

export default Privacy;

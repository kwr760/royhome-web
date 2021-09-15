import { Container } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import ReactMarkdown from 'react-markdown';

import privacyMarkdown from '../../../PRIVACY.md';

const Privacy: FunctionComponent = () => (
  <Container>
    <ReactMarkdown
      source={privacyMarkdown}
    />
  </Container>
);

export default Privacy;

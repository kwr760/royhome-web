import React, { FunctionComponent, memo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import { Container } from '@mui/material';
import { withStyles } from '@mui/styles';
import type { WithStyles } from '@mui/styles';

import { styles } from '../styles/resume-page.styles';
import ResumeComponent from './resume';
import { fetchResume } from '../store/resume.slice';
import { getResume } from '../store/resume.selector';
import { isLoading } from '../../../store/session/session.selector';
import { Resume } from '../contracts/resume.models';

type ResumeProps = WithStyles<typeof styles>;
const ResumePage: FunctionComponent<ResumeProps> = ({ classes }) => {
  const resume: Resume = useSelector(getResume);
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);
  const isResumeEmpty = isEmpty(resume);

  useEffect(() => {
    const callResumeApi = async () => {
      if (isResumeEmpty) {
        await fetchResume(dispatch, 'kroy760@gmail.com');
      }
    };
    callResumeApi();
  }, [isResumeEmpty, dispatch]);

  return (
    loading ? null : <Container className={classes.container}>
      <ResumeComponent resume={resume} />
    </Container>
  );
};

export default memo(withStyles(styles)(ResumePage));

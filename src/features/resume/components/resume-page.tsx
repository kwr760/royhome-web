import React, { FunctionComponent, memo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import { Container } from '@mui/material';
import { withStyles } from '@mui/styles';
import type { WithStyles } from '@mui/styles';

import { styles } from '../styles/resume-page.styles';
import { useAuth } from '../../../util/auth0/auth0-context';
import Resume from './resume';
import { fetchResume } from '../store/resume.slice';
import { getResume } from '../store/resume.selector';
import { isLoading } from '../../../store/session/session.selector';
import { ResumeType } from '../contracts/resume.models';

type ResumeProps = WithStyles<typeof styles>;
const ResumeComponent: FunctionComponent<ResumeProps> = ({ classes }) => {
  const { getToken } = useAuth();
  const resume: ResumeType = useSelector(getResume);
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);
  const isResumeEmpty = isEmpty(resume);

  useEffect(() => {
    const callResumeApi = async () => {
      if (isResumeEmpty) {
        dispatch(fetchResume('kroy760@gmail.com'));
      }
    };
    callResumeApi();
  }, [isResumeEmpty, dispatch, getToken]);

  return (
    loading ? null : <Container className={classes.container}>
      <Resume resume={resume} />
    </Container>
  );
};

export default memo(withStyles(styles)(ResumeComponent));

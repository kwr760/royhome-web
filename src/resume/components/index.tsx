import { Container } from '@material-ui/core';
import { isEmpty } from 'lodash';
import React, { FunctionComponent, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ResumeType } from '../../types/object/resume';

import { useAuth0 } from '../../util/auth0/auth0-context';
import { useStyles } from './index.styles';
import Resume from './resume';
import { fetchResume } from '../store/resume.slice';
import { getResume } from '../store/resume.selector';
import { isLoading } from '../../store/session/session.selector';

const ResumePage: FunctionComponent = () => {
  const { getToken } = useAuth0();
  const resume: ResumeType = useSelector(getResume);
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);
  const isResumeEmpty = isEmpty(resume);
  const classes = useStyles();

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

export default ResumePage;

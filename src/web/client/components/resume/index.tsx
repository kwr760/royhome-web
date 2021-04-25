import { isEmpty } from 'lodash';
import React, { FunctionComponent, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ResumeType } from '../../../../types/resume.types';

import { useAuth0 } from '../../../util/auth0/auth0-context';
import Resume from './resume';
import { fetchResume } from '../../store/resume/resume.slice';
import { getResume } from '../../store/resume/resume.selector';
import { isLoading } from '../../store/session/session.selector';

const ResumePage: FunctionComponent = () => {
  const { getToken } = useAuth0();
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
    loading ? null : <Resume resume={resume} />
  );
};

export default ResumePage;

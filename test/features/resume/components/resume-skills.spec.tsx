import React from 'react';
import { ThemeProvider } from '@mui/styles';
import { render } from '@testing-library/react';

import ResumeSkills from '../../../../src/features/resume/components/resume-skills';
import { SkillGroup } from '../../../../src/features/resume/contracts/resume.models';
import { themeLight } from '../../../../src/theme-light';

describe('features/resume/components/resume-skills', () => {
  it('should render', () => {
    // Arrange
    const skills = [{
      name: 'Skill #1',
      skills: [{
        name: 'item: a1',
      }, {
        name: 'item: a2',
      }],
    }, {
      name: 'Skill #2',
      skills: [{
        name: 'item: b1',
      }, {
        name: 'item: b2',
      }],
    }];

    // Act
    const { getByText } = render(
      <ThemeProvider theme={themeLight}>
        <ResumeSkills skillGroups={skills} />
      </ThemeProvider>,
    );

    // Assert
    getByText('Skills');
    getByText('Skill #1');
    getByText('Skill #2');
    getByText('item: a1, item: a2');
    getByText('item: b1, item: b2');
  });
  it('should render without props', () => {
    // Arrange
    const skills: SkillGroup[] = [];

    // Act
    const { getByText } = render(
      <ThemeProvider theme={themeLight}>
        <ResumeSkills skillGroups={skills}/>
      </ThemeProvider>,
    );

    // Assert
    getByText('Skills');
  });
});

import React from 'react';
import { render } from '@testing-library/react';
import { SkillGroupType } from '../../type/object/resume';

import ResumeSkills from './index';

describe('feature/resume/componentskills', () => {
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
      <ResumeSkills skillGroups={skills} />,
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
    const skills: SkillGroupType[] = [];

    // Act
    const { getByText } = render(
      <ResumeSkills skillGroups={skills}/>,
    );

    // Assert
    getByText('Skills');
  });
});

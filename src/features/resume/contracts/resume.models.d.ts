interface SkillType {
  name: string;
}

interface SkillGroupType {
  name: string;
  skills: SkillType[];
}

interface ExperienceItemType {
  id: string;
  name: string;
}

interface ExperienceType {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: ExperienceItemType[];
  bullets: ExperienceItemType[];
  tech: SkillGroupType;
}

interface EducationType {
  degree: string;
  school: string;
  graduation: string;
}

interface ProjectType {
  name: string;
  url: string;
  description: string;
  startDate: string;
  endDate: string;
}

interface ResumeType {
  name: string;
  address: string;
  email: string;
  phone: string;
  displayPhone: boolean;
  summary: string;
  skillGroups: SkillGroupType[];
  experience: ExperienceType[];
  education: EducationType[];
  project: ProjectType[];
}

export { SkillGroupType, ExperienceType, EducationType, ProjectType, ResumeType };

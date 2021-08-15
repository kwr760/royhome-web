export interface SkillType {
  name: string;
}

export interface SkillGroupType {
  name: string;
  skills: SkillType[];
}

export interface ExperienceItemType {
  id: string;
  name: string;
}

export interface ExperienceType {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: ExperienceItemType[];
  bullets: ExperienceItemType[];
  tech: SkillGroupType;
}

export interface EducationType {
  degree: string;
  school: string;
  graduation: string;
}

export interface ProjectType {
  name: string;
  url: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface ResumeType {
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

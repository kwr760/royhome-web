type Skill = {
  name: string;
}
type SkillGroup = {
  name: string;
  skills: Skill[];
}
type ExperienceItem = {
  id: string;
  name: string;
}
type Experience = {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: ExperienceItem[];
  bullets: ExperienceItem[];
  tech: SkillGroup;
}
type Education = {
  degree: string;
  school: string;
  graduation: string;
}
type Project = {
  name: string;
  url: string;
  description: string;
  startDate: string;
  endDate: string;
}
type Resume = {
  name: string;
  address: string;
  email: string;
  phone: string;
  displayPhone: boolean;
  summary: string;
  skillGroups: SkillGroup[];
  experience: Experience[];
  education: Education[];
  project: Project[];
}

export type { SkillGroup, Experience, Education, Project, Resume };

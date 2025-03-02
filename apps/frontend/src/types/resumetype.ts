export type SectionsResumeType =
  | ExperienceSection
  | EducationSection
  | SkillsSection
  | ProjectsSection;

interface BaseSection {
  id: string;
  type: 'EXPERIENCE' | 'EDUCATION' | 'SKILLS' | 'PROJECTS';
  createdAt: string;
  updatedAt: string;
}

export interface ExperienceSection extends BaseSection {
  type: 'EXPERIENCE';
  content: {
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
  };
}

export interface EducationSection extends BaseSection {
  type: 'EDUCATION';
  content: {
    university: string;
    major: string;
    startYear: string;
    endYear?: string;
  };
}

export interface SkillsSection extends BaseSection {
  type: 'SKILLS';
  content: string[];
}

export interface ProjectsSection extends BaseSection {
  type: 'PROJECTS';
  content: {
    title: string;
    year: string;
    link?: string;
  }[];
}

export interface ResumeType {
  id: string;
  title: string;
  userEmail: string;
  summary?: string;
  status: string;
  templateId: string;
  createdAt: string;
  updatedAt: string;
  sections: SectionsResumeType[];
}

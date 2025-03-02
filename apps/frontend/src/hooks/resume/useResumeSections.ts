import {
  EducationSection,
  ExperienceSection,
  ProjectsSection,
  ResumeType,
  SectionsResumeType,
  SkillsSection,
} from '@/types/resumetype';
import { useMemo } from 'react';

const isExperienceSection = (
  section: SectionsResumeType
): section is ExperienceSection => {
  return section.type === 'EXPERIENCE';
};

const isEducationSection = (
  section: SectionsResumeType
): section is EducationSection => {
  return section.type === 'EDUCATION';
};

const isSkillsSection = (
  section: SectionsResumeType
): section is SkillsSection => {
  return section.type === 'SKILLS';
};

const isProjectsSection = (
  section: SectionsResumeType
): section is ProjectsSection => {
  return section.type === 'PROJECTS';
};

export const useResumeSections = (resume?: ResumeType) => {
  const sections = useMemo(() => {
    if (!resume)
      return { experience: [], education: [], skills: [], projects: [] };

    return {
      experience: resume.sections.filter(isExperienceSection),
      education: resume.sections.filter(isEducationSection),
      skills: resume.sections.find(isSkillsSection)?.content || [],
      projects: resume.sections.find(isProjectsSection)?.content || [],
    };
  }, [resume]);

  return sections;
};

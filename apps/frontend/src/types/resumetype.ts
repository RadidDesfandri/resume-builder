export interface SectionsResumeType {
  id: string;
  type: 'EXPERIENCE' | 'EDUCATION' | 'SKILLS' | 'PROJECTS';
  content: string;
  createdAt: string;
  updatedAt: string;
}

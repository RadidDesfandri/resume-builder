'use client';

import { useGetResumeById } from '@/hooks/resume/useGetResumeById';
import { useResumeSections } from '@/hooks/resume/useResumeSections';

const GetByid = () => {
  const id = '060d673f-ee2f-4d27-94fc-6799eb834c8e';

  const { data: resume } = useGetResumeById(id);
  const { education, experience, projects, skills } = useResumeSections(
    resume?.response
  );
  return (
    <div>
      <h2>{resume?.response.title}</h2>
      <p>{resume?.response.summary}</p>

      <h3>Experience</h3>
      {experience.map((exp) => (
        <div key={exp.id}>
          <p>
            {exp.content.company} - {exp.content.company}
          </p>
        </div>
      ))}

      <h3>Education</h3>
      {education.map((edu) => (
        <div key={edu.id}>
          <p>
            {edu.content.university} ({edu.content.startYear} -{' '}
            {edu.content.endYear})
          </p>
        </div>
      ))}

      <h3>Skills</h3>
      <ul>
        {skills.map((skill: string) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>

      <h3>Projects</h3>
      {projects.map((project) => (
        <div key={project.title}>
          <p>
            {project.title} ({project.year})
          </p>
          <a href={project.link} target="_blank" rel="noopener noreferrer">
            View Project
          </a>
        </div>
      ))}
    </div>
  );
};

export default GetByid;

'use client';

import React, { useState } from 'react';

// interface Section {
//   type: string;
//   content: string;
// }

const ResumeForm: React.FC = () => {
//   const [sections, setSections] = useState<Section[]>([]);

  const [experience, setExperience] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
  });

  const [education, setEducation] = useState({
    university: '',
    degree: '',
    startYear: '',
    endYear: '',
  });

  const [projects, setProjects] = useState<
    { title: string; year: string; link: string }[]
  >([]);

  const handleAddProject = () => {
    setProjects([...projects, { title: '', year: '', link: '' }]);
  };

  const handleProjectChange = (index: number, field: string, value: string) => {
    const newProjects = [...projects];
    newProjects[index][field as keyof (typeof newProjects)[number]] = value;
    setProjects(newProjects);
  };

  const handleSubmit = async () => {
    const payload = {
      resumeId: Date.now().toString(),
      title: 'My Resume',
      summary: 'A brief summary about myself.',
      sections: [
        { type: 'EXPERIENCE', content: JSON.stringify(experience) },
        { type: 'EDUCATION', content: JSON.stringify(education) },
        { type: 'SKILLS', content: '' },
        { type: 'PROJECTS', content: JSON.stringify(projects) },
      ],
    };

    console.log('Payload:', payload);
    // Kirim ke backend (contoh menggunakan fetch)
    // await fetch('/api/resume', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(payload),
    // });
  };

  return (
    <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Resume Form</h2>
      <div className="mb-4">
        <h3 className="font-semibold">Experience</h3>
        <input
          type="text"
          placeholder="Company"
          value={experience.company}
          onChange={(e) =>
            setExperience({ ...experience, company: e.target.value })
          }
          className="mb-2 w-full rounded border p-2"
        />
        <input
          type="text"
          placeholder="Position"
          value={experience.position}
          onChange={(e) =>
            setExperience({ ...experience, position: e.target.value })
          }
          className="mb-2 w-full rounded border p-2"
        />
        <input
          type="date"
          value={experience.startDate}
          onChange={(e) =>
            setExperience({ ...experience, startDate: e.target.value })
          }
          className="mb-2 w-full rounded border p-2"
        />
        <input
          type="date"
          value={experience.endDate}
          onChange={(e) =>
            setExperience({ ...experience, endDate: e.target.value })
          }
          className="w-full rounded border p-2"
        />
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">Education</h3>
        <input
          type="text"
          placeholder="University"
          value={education.university}
          onChange={(e) =>
            setEducation({ ...education, university: e.target.value })
          }
          className="mb-2 w-full rounded border p-2"
        />
        <input
          type="text"
          placeholder="Degree"
          value={education.degree}
          onChange={(e) =>
            setEducation({ ...education, degree: e.target.value })
          }
          className="mb-2 w-full rounded border p-2"
        />
        <input
          type="number"
          placeholder="Start Year"
          value={education.startYear}
          onChange={(e) =>
            setEducation({ ...education, startYear: e.target.value })
          }
          className="mb-2 w-full rounded border p-2"
        />
        <input
          type="number"
          placeholder="End Year"
          value={education.endYear}
          onChange={(e) =>
            setEducation({ ...education, endYear: e.target.value })
          }
          className="w-full rounded border p-2"
        />
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">Projects</h3>
        {projects.map((project, index) => (
          <div key={index} className="mb-2">
            <input
              type="text"
              placeholder="Title"
              value={project.title}
              onChange={(e) =>
                handleProjectChange(index, 'title', e.target.value)
              }
              className="mb-2 w-full rounded border p-2"
            />
            <input
              type="number"
              placeholder="Year"
              value={project.year}
              onChange={(e) =>
                handleProjectChange(index, 'year', e.target.value)
              }
              className="mb-2 w-full rounded border p-2"
            />
            <input
              type="text"
              placeholder="Link"
              value={project.link}
              onChange={(e) =>
                handleProjectChange(index, 'link', e.target.value)
              }
              className="w-full rounded border p-2"
            />
          </div>
        ))}
        <button
          onClick={handleAddProject}
          className="mt-2 rounded bg-blue-500 px-4 py-2 text-white"
        >
          Add Project
        </button>
      </div>
      <button
        onClick={handleSubmit}
        className="rounded bg-green-500 px-4 py-2 text-white"
      >
        Submit
      </button>
    </div>
  );
};

export default ResumeForm;

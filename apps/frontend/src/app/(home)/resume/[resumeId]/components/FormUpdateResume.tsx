'use client';

import Button from '@/components/Button';
import AutoCompleteInput from '@/components/input/AutoCompleteInput';
import Inputnon from '@/components/input/Inputnon';
import TextArea from '@/components/input/TextArea';
import { SKILLS_DATA } from '@/constanst/skills';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent } from 'react';
import { MdOutlineCloudDownload } from 'react-icons/md';
import { RiAiGenerateText, RiAiGenerate2 } from 'react-icons/ri';
import LabelUpdateResume from './LabelUpdateResume';
import { IoAdd } from 'react-icons/io5';
import { AiOutlineDelete } from 'react-icons/ai';

interface ExperienceValueType {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
}

interface EducationValueType {
  university: string;
  startYear: string;
  endYear: string;
  major: string;
}

export interface ProjectValueType {
  title: string;
  year: string;
  link: string;
}

interface FormUpdateResumeProps {
  summaryValue: string;
  handleChangeSummary: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleSelectSkill: (selected: string[]) => void;
  onBlurSummary: () => void;
  errorSummary: boolean;
  errorMessageSummary: string;
  handleSubmit: (e: FormEvent) => void;
  experienceValue: ExperienceValueType;
  handleExperienceChange: (e: ChangeEvent<HTMLInputElement>) => void;
  educationValue: EducationValueType;
  handleEducationChange: (e: ChangeEvent<HTMLInputElement>) => void;
  projectValue: ProjectValueType[];
  handleAddProject: () => void;
  handleProjectChange: (index: number, field: string, value: string) => void;
  handleRemoveProject: (idx: number) => void;
}

const FormUpdateResume: React.FC<FormUpdateResumeProps> = ({
  handleChangeSummary,
  handleSelectSkill,
  summaryValue,
  onBlurSummary,
  errorMessageSummary,
  errorSummary,
  handleSubmit,
  experienceValue,
  handleExperienceChange,
  educationValue,
  handleEducationChange,
  projectValue,
  handleAddProject,
  handleProjectChange,
  handleRemoveProject,
}) => {
  const router = useRouter();

  const handleDraft = (e: FormEvent) => {
    handleSubmit(e);
    router.push('/resume');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-y-4">
      <div>
        <p className="font-semibold">Content</p>
        <div className="flex items-end justify-between">
          <LabelUpdateResume required>
            Enter your short summary
          </LabelUpdateResume>
          <Button
            onClick={() => {}}
            size="icon"
            disabled
            className="gap-2 px-2 text-sm ring-1 ring-gray-400"
          >
            <RiAiGenerateText />
            Generate summary
          </Button>
        </div>
        <TextArea
          id="summary"
          className="mt-2"
          errorMessage={errorMessageSummary}
          onBlur={onBlurSummary}
          value={summaryValue}
          error={errorSummary}
          onChange={handleChangeSummary}
        />
        <p className="text-end text-xs">{summaryValue.length}/500</p>
      </div>

      <div>
        <LabelUpdateResume>Choose a skill that you master</LabelUpdateResume>
        <AutoCompleteInput
          suggestions={SKILLS_DATA}
          onSelect={(selected) => handleSelectSkill(selected)}
        />
      </div>

      {/* experience */}
      <div className="mt-3 space-y-2">
        <p className="font-semibold">Experience</p>
        <div>
          <LabelUpdateResume>Choose a skill that you master</LabelUpdateResume>
          <div className="grid grid-cols-2 gap-2">
            <Inputnon
              name="company"
              type="text"
              placeholder="Company"
              variant="gost"
              autoComplete="off"
              value={experienceValue.company}
              onChange={handleExperienceChange}
            />
            <Inputnon
              name="position"
              type="text"
              variant="gost"
              autoComplete="off"
              value={experienceValue.position}
              onChange={handleExperienceChange}
              placeholder="Position"
            />
            <Inputnon
              name="startDate"
              type="date"
              variant="gost"
              autoComplete="off"
              value={experienceValue.startDate}
              onChange={handleExperienceChange}
              placeholder="Start date"
            />
            <Inputnon
              name="endDate"
              type="date"
              variant="gost"
              autoComplete="off"
              value={experienceValue.endDate}
              onChange={handleExperienceChange}
              placeholder="End date"
            />
          </div>
        </div>
      </div>

      {/* education */}
      <div className="mt-3 space-y-2">
        <p className="font-semibold">Education</p>
        <div>
          <LabelUpdateResume required>
            Choose a skill that you master
          </LabelUpdateResume>
          <div className="grid grid-cols-2 gap-2">
            <Inputnon
              name="university"
              type="text"
              variant="gost"
              autoComplete="off"
              placeholder="University"
              value={educationValue.university}
              onChange={handleEducationChange}
            />
            <Inputnon
              name="major"
              type="text"
              variant="gost"
              autoComplete="off"
              placeholder="Major"
              value={educationValue.major}
              onChange={handleEducationChange}
            />
            <Inputnon
              name="startYear"
              type="number"
              variant="gost"
              autoComplete="off"
              placeholder="Start year (number)"
              value={educationValue.startYear}
              onChange={handleEducationChange}
            />
            <Inputnon
              name="endYear"
              type="number"
              variant="gost"
              autoComplete="off"
              placeholder="End year (number)"
              value={educationValue.endYear}
              onChange={handleEducationChange}
            />
          </div>
        </div>
      </div>

      {/* project */}
      <div className="mt-3 space-y-2">
        <p className="font-semibold">Projects</p>
        <div className="flex items-end justify-between">
          <LabelUpdateResume>Choose a skill that you master</LabelUpdateResume>
          <Button
            size="icon"
            onClick={handleAddProject}
            className="gap-2 px-2 text-sm ring-1 ring-gray-400"
          >
            <IoAdd />
            Add project
          </Button>
        </div>
        {projectValue.map((project, idx) => (
          <div key={idx} className="mb-3 grid grid-cols-7 items-center gap-2">
            <div className="col-span-2">
              <Inputnon
                name="title"
                type="text"
                variant="gost"
                autoComplete="off"
                placeholder="Title"
                value={project.title}
                onChange={(e) =>
                  handleProjectChange(idx, 'title', e.target.value)
                }
              />
            </div>
            <div className="col-span-2 col-start-3">
              <Inputnon
                name="year"
                type="number"
                variant="gost"
                autoComplete="off"
                placeholder="Year (number)"
                value={project.year}
                onChange={(e) =>
                  handleProjectChange(idx, 'year', e.target.value)
                }
              />
            </div>
            <div className="col-span-2 col-start-5">
              <Inputnon
                name="link"
                type="text"
                variant="gost"
                autoComplete="off"
                placeholder="Link"
                value={project.link}
                onChange={(e) =>
                  handleProjectChange(idx, 'link', e.target.value)
                }
              />
            </div>
            <div className="col-start-7">
              <Button onClick={() => handleRemoveProject(idx)} danger>
                <AiOutlineDelete size={20} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex justify-end">
        <Button
          type="button"
          size="lg"
          onClick={(e: FormEvent) => handleDraft(e)}
          className="gap-2 hover:text-black/60"
        >
          <MdOutlineCloudDownload />
          Draft
        </Button>
        <Button
          type="submit"
          secondary
          size="lg"
          className="gap-2 hover:text-black/60"
        >
          <RiAiGenerate2 />
          Generated
        </Button>
      </div>
    </form>
  );
};

export default FormUpdateResume;

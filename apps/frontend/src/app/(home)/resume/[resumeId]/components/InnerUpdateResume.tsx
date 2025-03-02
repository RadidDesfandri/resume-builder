'use client';

import Button from '@/components/Button';
import TipsBox from '@/components/TipsBox';
import { useUpdateResume } from '@/hooks/resume/useUpdateResume';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useInput } from '@/hooks/useInput';
import { useTips } from '@/hooks/useTips';
import { useTextAreaValidation } from '@/hooks/validations/useTextAreaValidation';
import { cn } from '@/libs/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { IoArrowBackOutline } from 'react-icons/io5';
import { toast } from 'sonner';
import ContentPreviewResume from './ContentPreviewResume';
import FormUpdateResume, { ProjectValueType } from './FormUpdateResume';
import TipsCreateResume from './TipsCreateResume';

interface InnerUpdateResumeProps {
  titleParams: string;
}

const InnerUpdateResume: React.FC<InnerUpdateResumeProps> = ({
  titleParams,
}) => {
  const id = useSearchParams().get('id');
  const router = useRouter();

  const { mutate: updateResume } = useUpdateResume();
  // const { revalidate } = useGetResumeById(id!);

  const { isActiveTips, onCloseTips } = useTips();
  const {
    error: errorSummary,
    errorMessage: errorMessageSummary,
    handleBlur: handleBlurSummary,
    handleChange: handleChangeSummary,
    value: summaryValue,
    validate: summaryValidate,
  } = useTextAreaValidation({
    maxLength: 500,
    required: true,
    minLength: 75,
  });

  const [isOpenModalTips, setIsOpenModalTips] = useState<boolean>(false);
  const slideInRef = useRef<HTMLDivElement>(null);

  const [skillsValue, setSkillsValue] = useState<string[]>([]);

  useClickOutside(slideInRef, () => setIsOpenModalTips(false), isOpenModalTips);

  const handleSelectSkill = (selected: string[]) => {
    setSkillsValue(selected);
  };

  const [experienceValue, handleExperienceChange] = useInput({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
  });

  const [educationValue, handleEducationChange] = useInput({
    university: '',
    startYear: '',
    endYear: '',
    major: '',
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [projectValue, handleProjectsChange, setProjects, removeProject] =
    useInput<ProjectValueType[]>([]);

  const addProject = () => {
    if (projectValue.length >= 3) {
      toast.error('Maximum 3 projects');
    } else {
      setProjects([...projectValue, { title: '', year: '', link: '' }]);
    }
  };

  const handleProjectChange = (index: number, field: string, value: string) => {
    setProjects(
      projectValue.map((project, i) =>
        i === index ? { ...project, [field]: value } : project
      )
    );
  };

  const handleSubmitUpdateResume = (e: FormEvent) => {
    e.preventDefault();

    if (!summaryValidate(summaryValue)) return;

    const payload = {
      resumeId: id,
      title: titleParams,
      summary: summaryValue,
      sections: [
        {
          type: 'EXPERIENCE',
          content: JSON.stringify(experienceValue),
        },
        {
          type: 'EDUCATION',
          content: JSON.stringify(educationValue),
        },
        {
          type: 'SKILLS',
          content: JSON.stringify(skillsValue),
        },
        {
          type: 'PROJECTS',
          content: JSON.stringify(projectValue),
        },
      ],
    };

    updateResume(payload);
    // revalidate();
  };

  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="flex flex-col justify-between gap-y-7 border-t md:min-h-full md:flex-row">
      <div className="w-full md:w-[60%] md:border-r">
        <div className="flex min-h-[50px] items-center gap-x-4 border-b py-3 md:px-4">
          <Button
            size="icon"
            onClick={() => router.back()}
            className="ring-1 ring-gray-400"
          >
            <IoArrowBackOutline />
          </Button>
          <p className="font-semibold">Fill In</p>
        </div>
        <div className="h-full py-3 md:px-4">
          <TipsBox
            isOpen={isActiveTips}
            highlightText="here"
            onClose={onCloseTips}
            text="Click here to check out our tips for using Resume AI"
            onHighlightClick={() => setIsOpenModalTips(true)}
          />
          <h2
            className={cn(
              'text-lg font-semibold',
              isActiveTips ? 'mt-3' : 'mt-0'
            )}
          >
            Generate your resume
          </h2>
          <FormUpdateResume
            handleSubmit={(e) => handleSubmitUpdateResume(e)}
            onBlurSummary={handleBlurSummary}
            summaryValue={summaryValue}
            errorSummary={errorSummary}
            errorMessageSummary={errorMessageSummary}
            handleSelectSkill={handleSelectSkill}
            handleChangeSummary={handleChangeSummary}
            experienceValue={experienceValue}
            handleExperienceChange={handleExperienceChange}
            educationValue={educationValue}
            handleEducationChange={handleEducationChange}
            projectValue={projectValue}
            handleAddProject={addProject}
            handleProjectChange={handleProjectChange}
            handleRemoveProject={removeProject}
          />
        </div>
      </div>
      <div className="w-full md:w-[40%]">
        <div className="min-h-[50px] border-b py-3 md:px-4">
          <div className="flex items-center gap-1">
            <p className="font-semibold">Preview</p>
            <IoIosInformationCircleOutline className="cursor-pointer" />
          </div>
        </div>
        <ContentPreviewResume />
      </div>

      <TipsCreateResume isOpen={isOpenModalTips} ref={slideInRef} />
    </div>
  );
};

export default InnerUpdateResume;

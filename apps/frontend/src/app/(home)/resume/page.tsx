'use client';

import Button from '@/components/Button';
import SpinnerLoading from '@/components/loading/SpinnerLoading';
import { useCreateResume } from '@/hooks/resume/useCreateResume';

const Resume = () => {
  const { mutate: createResume, isPending } = useCreateResume();

  const handleCreateResume = () => {
    createResume('');
  };

  if (isPending) {
    return (
      <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-gray-800/30">
        <SpinnerLoading />
      </div>
    );
  }

  return (
    <div className="h-full">
      <Button
        type="button"
        secondary
        disabled={isPending}
        onClick={handleCreateResume}
      >
        {isPending ? 'Loading...' : 'Buat resume'}
      </Button>
    </div>
  );
};

export default Resume;

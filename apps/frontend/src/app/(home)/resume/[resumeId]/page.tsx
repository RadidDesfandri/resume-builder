import InnerUpdateResume from './components/InnerUpdateResume';

const UpdateResume = async ({
  params,
}: {
  params: Promise<{ resumeId: string }>;
}) => {
  const { resumeId } = await params;
  return <InnerUpdateResume titleParams={resumeId} />;
};

export default UpdateResume;

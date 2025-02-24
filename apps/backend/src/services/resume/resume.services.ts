import { Section } from '@prisma/client';
import prisma from '../../prisma';

interface BodyResume {
  summary: string;
  title: string;
  templateId: string;
  sections: Section[];
}

export const createResumeService = async (
  userEmail: string,
  body: BodyResume
) => {
  try {
    const { summary, title, templateId, sections } = body;

    const resume = await prisma.resume.create({
      data: {
        title,
        summary,
        templateId,
        userEmail,
        sections: {
          create: sections.map((section: Section) => ({
            type: section.type,
            content: section.content,
          })),
        },
      },
      include: { sections: true },
    });

    return resume;
  } catch (error) {
    throw error;
  }
};

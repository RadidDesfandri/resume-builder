import { Section } from '@prisma/client';
import prisma from '../../prisma';

interface BodyResume {
  title: string;
  templateId: string;
  summary: string;
  sections: Section[];
}

export const createResumeService = async (
  userEmail: string,
  body: BodyResume
) => {
  try {
    const { templateId } = body;

    const resumeCount = await prisma.resume.count({
      where: { userEmail },
    });

    const newResumeNumber = String(resumeCount + 1).padStart(3, '0');
    const newTitle = `untitled-${newResumeNumber}`;

    const resume = await prisma.resume.create({
      data: {
        title: newTitle,
        userEmail,
        templateId: templateId || 'defaultTemplate',
      },
    });

    return resume;
  } catch (error) {
    throw error;
  }
};

export const updateResumeService = async (
  body: BodyResume,
  resumeId: string,
  userEmail: string
) => {
  try {
    const { title, sections, summary } = body;

    const resume = await prisma.resume.findUnique({
      where: {
        id: resumeId,
        userEmail,
      },
    });

    if (!resume) throw { status: 404, msg: 'Resume notfound' };

    if (title || summary) {
      await prisma.resume.update({
        where: { id: resumeId },
        data: {
          ...(title && { title }),
          ...(summary && { summary }),
        },
      });
    }

    if (sections && sections.length > 0) {
      await Promise.all(
        sections.map((section) =>
          prisma.section.upsert({
            where: {
              resumeId_type: {
                resumeId,
                type: section.type,
              },
            },
            update: { content: section.content },
            create: {
              resumeId,
              type: section.type,
              content: section.content,
            },
          })
        )
      );
    }
  } catch (error) {
    throw error;
  }
};

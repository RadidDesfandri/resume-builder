/*
  Warnings:

  - The values [SUMMARY] on the enum `Section_type` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[resumeId,type]` on the table `Section` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `section` MODIFY `type` ENUM('EXPERIENCE', 'EDUCATION', 'SKILLS', 'PROJECTS') NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Section_resumeId_type_key` ON `Section`(`resumeId`, `type`);

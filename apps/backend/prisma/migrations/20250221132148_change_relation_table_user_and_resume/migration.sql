/*
  Warnings:

  - You are about to drop the column `userId` on the `resume` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userEmail]` on the table `Resume` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userEmail` to the `Resume` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `resume` DROP FOREIGN KEY `Resume_userId_fkey`;

-- DropIndex
DROP INDEX `Resume_userId_fkey` ON `resume`;

-- AlterTable
ALTER TABLE `resume` DROP COLUMN `userId`,
    ADD COLUMN `userEmail` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Resume_userEmail_key` ON `Resume`(`userEmail`);

-- AddForeignKey
ALTER TABLE `Resume` ADD CONSTRAINT `Resume_userEmail_fkey` FOREIGN KEY (`userEmail`) REFERENCES `User`(`email`) ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `userId` on the `resume` table. All the data in the column will be lost.
  - Added the required column `userEmail` to the `Resume` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `resume` DROP FOREIGN KEY `Resume_userId_fkey`;

-- DropIndex
DROP INDEX `Resume_userId_fkey` ON `resume`;

-- AlterTable
ALTER TABLE `resume` DROP COLUMN `userId`,
    ADD COLUMN `userEmail` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Resume` ADD CONSTRAINT `Resume_userEmail_fkey` FOREIGN KEY (`userEmail`) REFERENCES `User`(`email`) ON DELETE CASCADE ON UPDATE CASCADE;

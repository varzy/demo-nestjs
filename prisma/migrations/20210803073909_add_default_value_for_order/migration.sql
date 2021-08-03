/*
  Warnings:

  - Made the column `order` on table `cities` required. This step will fail if there are existing NULL values in that column.

*/
UPDATE `cities` SET `order` = -1 WHERE `order` IS NULL;

-- AlterTable
ALTER TABLE `cities` MODIFY `order` INTEGER NOT NULL DEFAULT -1;

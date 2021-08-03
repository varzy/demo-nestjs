/*
  Warnings:

  - You are about to drop the column `is_active` on the `cities` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `cities` DROP COLUMN `is_active`,
    ADD COLUMN `order` INTEGER;

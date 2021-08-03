/*
  Warnings:

  - You are about to drop the column `original_price` on the `houses` table. All the data in the column will be lost.
  - Added the required column `current_price` to the `houses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `houses` DROP COLUMN `original_price`,
    ADD COLUMN `current_price` INTEGER NOT NULL;

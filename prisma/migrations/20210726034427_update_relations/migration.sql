/*
  Warnings:

  - You are about to drop the `_post_tag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_post_tag` DROP FOREIGN KEY `_post_tag_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_post_tag` DROP FOREIGN KEY `_post_tag_ibfk_2`;

-- DropTable
DROP TABLE `_post_tag`;

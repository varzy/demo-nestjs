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

-- CreateTable
CREATE TABLE `post_tag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `post_id` INTEGER NOT NULL,
    `tag_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `post_tag` ADD FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `post_tag` ADD FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

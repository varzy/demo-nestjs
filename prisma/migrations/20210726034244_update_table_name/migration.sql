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
CREATE TABLE `_post_to_tag` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_post_to_tag_AB_unique`(`A`, `B`),
    INDEX `_post_to_tag_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_post_to_tag` ADD FOREIGN KEY (`A`) REFERENCES `posts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_post_to_tag` ADD FOREIGN KEY (`B`) REFERENCES `tags`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

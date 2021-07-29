/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `phone` VARCHAR(191),
    ADD COLUMN `username` VARCHAR(64) NOT NULL,
    MODIFY `email` VARCHAR(191),
    MODIFY `nickname` VARCHAR(191);

-- CreateIndex
CREATE UNIQUE INDEX `users.username_unique` ON `users`(`username`);

-- CreateIndex
CREATE UNIQUE INDEX `users.phone_unique` ON `users`(`phone`);

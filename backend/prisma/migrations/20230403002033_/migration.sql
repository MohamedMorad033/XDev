/*
  Warnings:

  - Added the required column `accesstoken` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ip` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `accesstoken` VARCHAR(191) NOT NULL,
    ADD COLUMN `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `ip` VARCHAR(191) NOT NULL,
    ADD COLUMN `profile` VARCHAR(191) NOT NULL;

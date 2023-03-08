/*
  Warnings:

  - You are about to drop the column `type` on the `productoutcomereturn` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `productoutcomereturn` DROP COLUMN `type`;

-- AlterTable
ALTER TABLE `products` ADD COLUMN `type` INTEGER NOT NULL DEFAULT 0;

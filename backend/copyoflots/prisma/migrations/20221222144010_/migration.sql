/*
  Warnings:

  - You are about to drop the column `expense` on the `workers` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `workers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `workers` DROP COLUMN `expense`,
    DROP COLUMN `type`,
    ADD COLUMN `time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

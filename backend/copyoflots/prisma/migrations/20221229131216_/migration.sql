/*
  Warnings:

  - You are about to drop the column `expense` on the `moneyowner` table. All the data in the column will be lost.
  - You are about to drop the column `payment` on the `moneyowner` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `moneyowner` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `moneyowner` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `moneyowner` DROP COLUMN `expense`,
    DROP COLUMN `payment`,
    DROP COLUMN `type`,
    ADD COLUMN `value` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `code` DOUBLE NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX `moneyowner_name_key` ON `moneyowner`(`name`);

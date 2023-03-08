/*
  Warnings:

  - Added the required column `vaultid` to the `Expenses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vaultname` to the `Expenses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `expenses` ADD COLUMN `time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `vaultid` DOUBLE NOT NULL,
    ADD COLUMN `vaultname` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `workerpayout` ALTER COLUMN `remaining` DROP DEFAULT;

/*
  Warnings:

  - A unique constraint covering the columns `[refid]` on the table `clientvaulttransaction` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `clientvaulttransaction` MODIFY `way` VARCHAR(191) NOT NULL DEFAULT 'in';

-- AlterTable
ALTER TABLE `moneyowner` ADD COLUMN `payed` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `payment` DOUBLE NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `mtransaction` ADD COLUMN `way` VARCHAR(191) NOT NULL DEFAULT 'in';

-- CreateIndex
CREATE UNIQUE INDEX `clientvaulttransaction_refid_key` ON `clientvaulttransaction`(`refid`);

-- RenameIndex
ALTER TABLE `vault` RENAME INDEX `vault_name_key` TO `Vault_name_key`;

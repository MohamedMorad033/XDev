-- AlterTable
ALTER TABLE `inventoryproducts` ADD COLUMN `linkid` INTEGER NULL,
    ADD COLUMN `linkname` VARCHAR(191) NULL,
    ADD COLUMN `rate` DOUBLE NULL;

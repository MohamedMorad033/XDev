-- AlterTable
ALTER TABLE `fridgeproducts` ADD COLUMN `type` INTEGER NOT NULL DEFAULT 0,
    MODIFY `productname` VARCHAR(191) NOT NULL DEFAULT '';

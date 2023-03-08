-- AlterTable
ALTER TABLE `productincome` ALTER COLUMN `remaining` DROP DEFAULT;

-- AlterTable
ALTER TABLE `products` ADD COLUMN `remaining` DOUBLE NOT NULL DEFAULT 0;

/*
  Warnings:

  - Added the required column `refid` to the `Productincome` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refid` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `productincome` ADD COLUMN `refid` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `products` ADD COLUMN `refid` DOUBLE NOT NULL;

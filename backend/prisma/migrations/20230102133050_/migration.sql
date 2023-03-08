/*
  Warnings:

  - Added the required column `refid` to the `fridgeproducts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `fridgeproducts` ADD COLUMN `refid` VARCHAR(191) NOT NULL;

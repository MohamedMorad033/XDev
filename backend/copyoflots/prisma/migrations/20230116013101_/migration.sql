/*
  Warnings:

  - You are about to drop the column `loss` on the `fridgeproducts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `fridgeproducts` DROP COLUMN `loss`,
    ADD COLUMN `return` DOUBLE NOT NULL DEFAULT 0;

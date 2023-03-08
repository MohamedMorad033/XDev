/*
  Warnings:

  - You are about to drop the column `Merer` on the `inventoryproducts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `inventoryproducts` DROP COLUMN `Merer`,
    ADD COLUMN `Meter` INTEGER NOT NULL DEFAULT 0;

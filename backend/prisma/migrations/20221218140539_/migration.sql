/*
  Warnings:

  - You are about to drop the column `M2` on the `inventoryproducts` table. All the data in the column will be lost.
  - You are about to drop the column `Meter` on the `inventoryproducts` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `inventoryproducts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `inventoryproducts` DROP COLUMN `M2`,
    DROP COLUMN `Meter`,
    DROP COLUMN `weight`;

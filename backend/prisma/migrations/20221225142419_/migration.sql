/*
  Warnings:

  - Added the required column `remaining` to the `fridgeproducts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `fridgeproducts` ADD COLUMN `remaining` DOUBLE NOT NULL;

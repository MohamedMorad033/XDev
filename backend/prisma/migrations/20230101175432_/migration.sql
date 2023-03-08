/*
  Warnings:

  - Added the required column `lotid` to the `productoutcome` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `productoutcome` ADD COLUMN `lotid` DOUBLE NOT NULL;

/*
  Warnings:

  - Added the required column `fromid` to the `Productincome` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toid` to the `Productincome` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `productincome` ADD COLUMN `fromid` INTEGER NOT NULL,
    ADD COLUMN `toid` INTEGER NOT NULL;

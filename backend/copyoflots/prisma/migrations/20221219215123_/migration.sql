/*
  Warnings:

  - Added the required column `nestedcategoryid` to the `Expenses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nestedcategoryname` to the `Expenses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `expenses` ADD COLUMN `nestedcategoryid` INTEGER NOT NULL,
    ADD COLUMN `nestedcategoryname` INTEGER NOT NULL;

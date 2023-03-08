/*
  Warnings:

  - Added the required column `nights` to the `workerpayout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `return` to the `workerpayout` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `workerpayout` ADD COLUMN `nights` DOUBLE NOT NULL,
    ADD COLUMN `return` DOUBLE NOT NULL;

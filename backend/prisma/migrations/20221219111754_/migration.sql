/*
  Warnings:

  - Added the required column `aprice1` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `aprice2` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bprice1` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bprice2` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `aprice1` INTEGER NOT NULL,
    ADD COLUMN `aprice2` INTEGER NOT NULL,
    ADD COLUMN `bprice1` INTEGER NOT NULL,
    ADD COLUMN `bprice2` INTEGER NOT NULL;

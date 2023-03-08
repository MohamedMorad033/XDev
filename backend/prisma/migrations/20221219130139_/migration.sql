/*
  Warnings:

  - A unique constraint covering the columns `[refid]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Transaction_refid_key` ON `Transaction`(`refid`);

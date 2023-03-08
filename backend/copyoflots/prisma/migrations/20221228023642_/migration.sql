/*
  Warnings:

  - A unique constraint covering the columns `[invoiceid]` on the table `Products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `invoiceid` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products` ADD COLUMN `invoiceid` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Products_invoiceid_key` ON `Products`(`invoiceid`);

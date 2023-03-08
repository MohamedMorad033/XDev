/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `inventoryproducts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `inventoryproducts_name_key` ON `inventoryproducts`(`name`);

/*
  Warnings:

  - A unique constraint covering the columns `[bigid]` on the table `Plink` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[smallid]` on the table `Plink` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Plink_bigid_key` ON `Plink`(`bigid`);

-- CreateIndex
CREATE UNIQUE INDEX `Plink_smallid_key` ON `Plink`(`smallid`);

/*
  Warnings:

  - You are about to alter the column `refid` on the `expenses` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.
  - You are about to alter the column `refid` on the `productincome` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.
  - You are about to alter the column `refid` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `expenses` MODIFY `refid` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `productincome` MODIFY `refid` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `products` MODIFY `refid` VARCHAR(191) NOT NULL;

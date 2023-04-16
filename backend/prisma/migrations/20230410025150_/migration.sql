/*
  Warnings:

  - You are about to drop the column `productid` on the `fridgeproducts` table. All the data in the column will be lost.
  - You are about to drop the column `productname` on the `fridgeproducts` table. All the data in the column will be lost.
  - You are about to drop the column `secamount` on the `fridgeproducts` table. All the data in the column will be lost.
  - You are about to drop the column `secprice` on the `fridgeproducts` table. All the data in the column will be lost.
  - You are about to drop the column `secreturn` on the `fridgeproducts` table. All the data in the column will be lost.
  - You are about to drop the column `sectotal` on the `fridgeproducts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `fridgeproducts` DROP COLUMN `productid`,
    DROP COLUMN `productname`,
    DROP COLUMN `secamount`,
    DROP COLUMN `secprice`,
    DROP COLUMN `secreturn`,
    DROP COLUMN `sectotal`;

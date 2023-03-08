/*
  Warnings:

  - You are about to alter the column `code` on the `clients` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `expense` on the `clients` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `payment` on the `clients` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `type` on the `clients` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `amount` on the `expenses` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `refid` on the `expenses` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `categoryid` on the `expenses` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `nestedcategoryid` on the `expenses` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `linkid` on the `expensescategory2` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `code` on the `inventoryproducts` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `quantity` on the `inventoryproducts` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `wayofmesure` on the `inventoryproducts` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `price` on the `inventoryproducts` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `net` on the `inventoryproducts` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `amount` on the `productincome` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `totalprice` on the `productincome` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `price` on the `productincome` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `fromid` on the `productincome` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `toid` on the `productincome` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `fromid` on the `transaction` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `toid` on the `transaction` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `amount` on the `transaction` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `aprice1` on the `transaction` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `aprice2` on the `transaction` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `bprice1` on the `transaction` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `bprice2` on the `transaction` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `code` on the `vault` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `value` on the `vault` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `clients` MODIFY `code` DOUBLE NULL,
    MODIFY `expense` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `payment` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `type` DOUBLE NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `expenses` MODIFY `amount` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `refid` DOUBLE NULL,
    MODIFY `categoryid` DOUBLE NOT NULL,
    MODIFY `nestedcategoryid` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `expensescategory2` MODIFY `linkid` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `inventoryproducts` MODIFY `code` DOUBLE NULL DEFAULT 0,
    MODIFY `quantity` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `wayofmesure` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `price` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `net` DOUBLE NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `productincome` MODIFY `amount` DOUBLE NOT NULL,
    MODIFY `totalprice` DOUBLE NOT NULL,
    MODIFY `price` DOUBLE NOT NULL,
    MODIFY `fromid` DOUBLE NOT NULL,
    MODIFY `toid` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `transaction` MODIFY `fromid` DOUBLE NOT NULL,
    MODIFY `toid` DOUBLE NOT NULL,
    MODIFY `amount` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `aprice1` DOUBLE NOT NULL,
    MODIFY `aprice2` DOUBLE NOT NULL,
    MODIFY `bprice1` DOUBLE NOT NULL,
    MODIFY `bprice2` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `vault` MODIFY `code` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `value` DOUBLE NOT NULL DEFAULT 0;

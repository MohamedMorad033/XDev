/*
  Warnings:

  - You are about to drop the column `code` on the `fridgeproducts` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `fridgeproducts` table. All the data in the column will be lost.
  - You are about to drop the column `net` on the `fridgeproducts` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `fridgeproducts` table. All the data in the column will be lost.
  - You are about to drop the column `wayofmesure` on the `fridgeproducts` table. All the data in the column will be lost.
  - Added the required column `amount` to the `fridgeproducts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `from` to the `fridgeproducts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fromid` to the `fridgeproducts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `to` to the `fridgeproducts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toid` to the `fridgeproducts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalprice` to the `fridgeproducts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `fridgeproducts` DROP COLUMN `code`,
    DROP COLUMN `name`,
    DROP COLUMN `net`,
    DROP COLUMN `quantity`,
    DROP COLUMN `wayofmesure`,
    ADD COLUMN `amount` DOUBLE NOT NULL,
    ADD COLUMN `from` VARCHAR(191) NOT NULL,
    ADD COLUMN `fromid` DOUBLE NOT NULL,
    ADD COLUMN `to` VARCHAR(191) NOT NULL,
    ADD COLUMN `toid` DOUBLE NOT NULL,
    ADD COLUMN `totalprice` DOUBLE NOT NULL,
    ALTER COLUMN `price` DROP DEFAULT;

/*
  Warnings:

  - You are about to drop the column `clientid` on the `productoutcomereturn` table. All the data in the column will be lost.
  - You are about to drop the column `clientname` on the `productoutcomereturn` table. All the data in the column will be lost.
  - You are about to drop the column `lotid` on the `productoutcomereturn` table. All the data in the column will be lost.
  - You are about to drop the column `productid` on the `productoutcomereturn` table. All the data in the column will be lost.
  - You are about to drop the column `productname` on the `productoutcomereturn` table. All the data in the column will be lost.
  - You are about to drop the `autoproductexportreturn` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `from` to the `productoutcomereturn` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fromid` to the `productoutcomereturn` table without a default value. This is not possible if the table is not empty.
  - Added the required column `remaining` to the `productoutcomereturn` table without a default value. This is not possible if the table is not empty.
  - Added the required column `to` to the `productoutcomereturn` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toid` to the `productoutcomereturn` table without a default value. This is not possible if the table is not empty.
  - Made the column `refid` on table `productoutcomereturn` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `productoutcomereturn` DROP COLUMN `clientid`,
    DROP COLUMN `clientname`,
    DROP COLUMN `lotid`,
    DROP COLUMN `productid`,
    DROP COLUMN `productname`,
    ADD COLUMN `from` VARCHAR(191) NOT NULL,
    ADD COLUMN `fromid` DOUBLE NOT NULL,
    ADD COLUMN `remainigtotal` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `remaining` DOUBLE NOT NULL,
    ADD COLUMN `to` VARCHAR(191) NOT NULL,
    ADD COLUMN `toid` DOUBLE NOT NULL,
    ADD COLUMN `type` INTEGER NOT NULL DEFAULT 0,
    MODIFY `refid` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `autoproductexportreturn`;

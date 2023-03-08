/*
  Warnings:

  - You are about to drop the column `clientexpa` on the `clientvaulttransaction` table. All the data in the column will be lost.
  - You are about to drop the column `clientexpb` on the `clientvaulttransaction` table. All the data in the column will be lost.
  - You are about to drop the column `clientpaya` on the `clientvaulttransaction` table. All the data in the column will be lost.
  - You are about to drop the column `clientpayb` on the `clientvaulttransaction` table. All the data in the column will be lost.
  - You are about to drop the column `vaultap` on the `clientvaulttransaction` table. All the data in the column will be lost.
  - You are about to drop the column `vaultbp` on the `clientvaulttransaction` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `clientvaulttransaction_refid_key` ON `clientvaulttransaction`;

-- AlterTable
ALTER TABLE `clientvaulttransaction` DROP COLUMN `clientexpa`,
    DROP COLUMN `clientexpb`,
    DROP COLUMN `clientpaya`,
    DROP COLUMN `clientpayb`,
    DROP COLUMN `vaultap`,
    DROP COLUMN `vaultbp`,
    ALTER COLUMN `way` DROP DEFAULT;

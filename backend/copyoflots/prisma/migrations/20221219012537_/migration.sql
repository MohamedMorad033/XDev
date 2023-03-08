/*
  Warnings:

  - You are about to alter the column `amount` on the `transaction` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - A unique constraint covering the columns `[name]` on the table `vault` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `transaction` MODIFY `amount` INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX `vault_name_key` ON `vault`(`name`);

-- CreateTable
CREATE TABLE `clientvaulttransaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `refid` VARCHAR(191) NULL,
    `fromid` DOUBLE NOT NULL,
    `toid` DOUBLE NOT NULL,
    `fromname` VARCHAR(191) NOT NULL,
    `toname` VARCHAR(191) NOT NULL,
    `vaultbp` DOUBLE NOT NULL,
    `vaultap` DOUBLE NOT NULL,
    `clientpayb` DOUBLE NOT NULL,
    `clientpaya` DOUBLE NOT NULL,
    `clientexpb` DOUBLE NOT NULL,
    `clientexpa` DOUBLE NOT NULL,
    `amount` DOUBLE NOT NULL DEFAULT 0,
    `time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `clientvaulttransaction_refid_key`(`refid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

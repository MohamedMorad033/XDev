-- CreateTable
CREATE TABLE `WTransaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `refid` VARCHAR(191) NULL,
    `fromid` DOUBLE NOT NULL,
    `toid` DOUBLE NOT NULL,
    `fromname` VARCHAR(191) NOT NULL,
    `toname` VARCHAR(191) NOT NULL,
    `bprice1` DOUBLE NOT NULL,
    `bprice2` DOUBLE NOT NULL,
    `aprice1` DOUBLE NOT NULL,
    `aprice2` DOUBLE NOT NULL,
    `amount` DOUBLE NOT NULL DEFAULT 0,
    `time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `WTransaction_refid_key`(`refid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

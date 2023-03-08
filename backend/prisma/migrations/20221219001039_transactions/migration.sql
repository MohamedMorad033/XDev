-- CreateTable
CREATE TABLE `Transaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `refid` VARCHAR(191) NULL,
    `fromid` INTEGER NOT NULL,
    `toid` INTEGER NOT NULL,
    `fromname` VARCHAR(191) NOT NULL,
    `toname` VARCHAR(191) NOT NULL,
    `amount` BIGINT NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `moneyowner` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` DOUBLE NULL,
    `name` VARCHAR(191) NOT NULL,
    `expense` DOUBLE NOT NULL DEFAULT 0,
    `payment` DOUBLE NOT NULL DEFAULT 0,
    `type` DOUBLE NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

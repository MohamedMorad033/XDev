-- CreateTable
CREATE TABLE `Plink` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bigid` INTEGER NOT NULL,
    `bigname` VARCHAR(191) NOT NULL,
    `smallid` INTEGER NOT NULL,
    `smallname` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,

    UNIQUE INDEX `Plink_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `finalproductexports` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `refid` VARCHAR(191) NULL,
    `productid` DOUBLE NOT NULL,
    `clientid` DOUBLE NOT NULL,
    `productname` VARCHAR(191) NOT NULL,
    `clientname` VARCHAR(191) NOT NULL,
    `totalprice` DOUBLE NOT NULL,
    `price` DOUBLE NOT NULL,
    `amount` DOUBLE NOT NULL,
    `return` DOUBLE NOT NULL DEFAULT 0,
    `returnid` VARCHAR(191) NULL,
    `remaining` DOUBLE NOT NULL DEFAULT 0,
    `payed` BOOLEAN NOT NULL,
    `payedamount` DOUBLE NOT NULL DEFAULT 0,
    `time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

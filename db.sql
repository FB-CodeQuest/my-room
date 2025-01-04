create schema myroom;
use myroom;

CREATE TABLE `Users` (
                         `user_id`	BIGINT	NULL,
                         `email`	VARCHAR(255)	NOT NULL,
                         `password`	VARCHAR(255)	NOT NULL,
                         `name`	VARCHAR(100)	NOT NULL,
                         `phone`	VARCHAR(30)	NULL,
                         `birth_date`	DATE	NULL,
                         `gender`	ENUM('M', 'F')	NULL	DEFAULT 'M',
                         `created_at`	TIMESTAMP	NULL,
                         `updated_at`	TIMESTAMP	NULL
);

CREATE TABLE `UserProfiles` (
                                `profile_id`	BIGINT	NULL,
                                `user_id`	BIGINT	NOT NULL,
                                `profile_image`	VARCHAR(255)	NULL,
                                `bio`	TEXT	NULL,
                                `social_link`	VARCHAR(255)	NULL,
                                `address`	VARCHAR(100)	NULL
);

CREATE TABLE `Categories` (
                              `category_id`	BIGINT	NULL,
                              `name`	VARCHAR(100)	NOT NULL
);

CREATE TABLE `Products` (
                            `product_id`	BIGINT	NULL,
                            `category_id`	BIGINT	NOT NULL,
                            `name`	VARCHAR(255)	NOT NULL,
                            `description`	TEXT	NULL,
                            `price`	DECIMAL(10, 2)	NOT NULL,
                            `stock`	INT	NULL,
                            `created_at`	TIMESTAMP	NULL,
                            `updated_at`	TIMESTAMP	NULL
);

CREATE TABLE `ProductImages` (
                                 `image_id`	BIGINT	NULL,
                                 `product_id`	BIGINT	NOT NULL,
                                 `image_url`	VARCHAR(255)	NOT NULL,
                                 `is_primary`	BOOLEAN	NULL
);

ALTER TABLE `Users` ADD CONSTRAINT `PK_USERS` PRIMARY KEY (
                                                           `user_id`
    );

ALTER TABLE `UserProfiles` ADD CONSTRAINT `PK_USERPROFILES` PRIMARY KEY (
                                                                         `profile_id`
    );

ALTER TABLE `Categories` ADD CONSTRAINT `PK_CATEGORIES` PRIMARY KEY (
                                                                     `category_id`
    );

ALTER TABLE `Products` ADD CONSTRAINT `PK_PRODUCTS` PRIMARY KEY (
                                                                 `product_id`
    );

ALTER TABLE `ProductImages` ADD CONSTRAINT `PK_PRODUCTIMAGES` PRIMARY KEY (
                                                                           `image_id`
    );


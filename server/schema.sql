DROP DATABASE IF EXISTS chat;

CREATE DATABASE chat;

USE chat;

-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Users'
--
-- ---

DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Users` (
  `id` INTEGER AUTO_INCREMENT,
  `username` VARCHAR(40) UNIQUE,
  `createdAt` DATETIME,
  `updatedAt` DATETIME,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Messages'
--
-- ---

DROP TABLE IF EXISTS `Messages`;

CREATE TABLE `Messages` (
  `id` INTEGER AUTO_INCREMENT,
  `text` VARCHAR(2000) NOT NULL,
  `userid` INTEGER not null,
  `roomid` INTEGER not null,
  `createdAt` DATETIME,
  `updatedAt` DATETIME,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Rooms'
--
-- ---

DROP TABLE IF EXISTS `Rooms`;

CREATE TABLE `Rooms` (
  `id` INTEGER AUTO_INCREMENT,
  `roomname` VARCHAR(40) UNIQUE,
  `createdAt` DATETIME,
  `updatedAt` DATETIME,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `Messages` ADD FOREIGN KEY (userid) REFERENCES `Users` (`id`);
ALTER TABLE `Messages` ADD FOREIGN KEY (roomid) REFERENCES `Rooms` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Messages` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Rooms` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

INSERT INTO `Users` (`id`,`username`, `createdAt`, `updatedAt`) VALUES
(1,'ANON', sysdate(), sysdate());
INSERT INTO `Users` (`id`,`username`, `createdAt`, `updatedAt`) VALUES
(2,'CHRIS', sysdate(), sysdate());
INSERT INTO `Rooms` (`id`, `roomname`, `createdAt`, `updatedAt`) VALUES
(1, 'ALL', sysdate(), sysdate());
INSERT INTO `Rooms` (`id`, `roomname`, `createdAt`, `updatedAt`) VALUES
(2, 'DOG', sysdate(), sysdate());
INSERT INTO `Messages` (`id`,`text`,`userid`,`roomid`, `createdAt`, `updatedAt`) VALUES
(1,'This is a test message',1,1, sysdate(), sysdate());
INSERT INTO `Messages` (`id`,`text`,`userid`,`roomid`, `createdAt`, `updatedAt`) VALUES
(2,'This is a test message in the Dog Room',1,2, sysdate(), sysdate());

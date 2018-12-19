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
  `userid` INTEGER AUTO_INCREMENT,
  `username` VARCHAR(40) UNIQUE,
  `createdAt` DATETIME not null,
  `updatedAt` DATETIME not null,
  PRIMARY KEY (`userid`)
);

-- ---
-- Table 'Messages'
--
-- ---

DROP TABLE IF EXISTS `Messages`;

CREATE TABLE `Messages` (
  `messageid` INTEGER AUTO_INCREMENT,
  `text` VARCHAR(2000) NOT NULL,
  `userid` INTEGER,
  `roomid` INTEGER,
  `createdAt` DATETIME not null,
  `updatedAt` DATETIME not null,
  PRIMARY KEY (`messageid`)
);

-- ---
-- Table 'Rooms'
--
-- ---

DROP TABLE IF EXISTS `Rooms`;

CREATE TABLE `Rooms` (
  `roomid` INTEGER AUTO_INCREMENT,
  `roomname` VARCHAR(40) UNIQUE,
  `createdAt` DATETIME not null,
  `updatedAt` DATETIME not null,
  PRIMARY KEY (`roomid`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `Messages` ADD FOREIGN KEY (userid) REFERENCES `Users` (`userid`);
ALTER TABLE `Messages` ADD FOREIGN KEY (roomid) REFERENCES `Rooms` (`roomid`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Messages` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Rooms` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

INSERT INTO `Users` (`userid`,`username`, `createdAt`, `updatedAt`) VALUES
(1,'ANON', sysdate(), sysdate());
INSERT INTO `Rooms` (`roomid`, `roomname`, `createdAt`, `updatedAt`) VALUES
(1, 'All', sysdate(), sysdate());
INSERT INTO `Rooms` (`roomid`, `roomname`, `createdAt`, `updatedAt`) VALUES
(2, 'Dog', sysdate(), sysdate());
INSERT INTO `Messages` (`messageid`,`text`,`userid`,`roomid`, `createdAt`, `updatedAt`) VALUES
(1,'This is a test message',1,1, sysdate(), sysdate());
INSERT INTO `Messages` (`messageid`,`text`,`userid`,`roomid`, `createdAt`, `updatedAt`) VALUES
(2,'This is a test message in the Dog Room',1,2, sysdate(), sysdate());

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
  `userid` INTEGER AUTO_INCREMENT COMMENT 'Primary Key',
  `firstname` VARCHAR(25) NULL DEFAULT NULL,
  `lastname` VARCHAR(20) NULL DEFAULT NULL,
  `email` VARCHAR(40) NULL DEFAULT NULL,
  PRIMARY KEY (`userid`)
);

-- ---
-- Table 'Messages'
--
-- ---

DROP TABLE IF EXISTS `Messages`;

CREATE TABLE `Messages` (
  `messageid` INTEGER AUTO_INCREMENT,
  `message` VARCHAR(2000) NOT NULL,
  `userid` INTEGER COMMENT 'Primary Key',
  `roomid` INTEGER,
  PRIMARY KEY (`messageid`)
);

-- ---
-- Table 'Rooms'
--
-- ---

DROP TABLE IF EXISTS `Rooms`;

CREATE TABLE `Rooms` (
  `roomid` INTEGER AUTO_INCREMENT,
  `roomname` VARCHAR(50) NOT NULL,
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

-- INSERT INTO `Users` (`userid`,`firstname`,`lastname`,`email`) VALUES
-- ('','','','');
-- INSERT INTO `Messages` (`messageid`,`message`,`userid`,`roomid`) VALUES
-- ('','','','');
-- INSERT INTO `Rooms` (`roomid`,`roomname`) VALUES
-- ('','');
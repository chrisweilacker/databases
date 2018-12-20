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
  `userid` INTEGER,
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
  `roomname` VARCHAR(40) UNIQUE,
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

INSERT INTO `Users` (`userid`,`username`) VALUES
(1,'ANON');
INSERT INTO `Rooms` (`roomid`, `roomname`) VALUES
(1, 'All');
INSERT INTO `Rooms` (`roomid`, `roomname`) VALUES
(2, 'Dog');
INSERT INTO `Messages` (`messageid`,`message`,`userid`,`roomid`) VALUES
(1,'This is a test message',1,1);
INSERT INTO `Messages` (`messageid`,`message`,`userid`,`roomid`) VALUES
(2,'This is a test message in the Dog Room',1,2);

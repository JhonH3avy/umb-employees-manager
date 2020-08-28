-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.5.5-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for umb
CREATE DATABASE IF NOT EXISTS `umb` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `umb`;

-- Dumping structure for table umb.companies
CREATE TABLE IF NOT EXISTS `companies` (
  `company_key` int(11) NOT NULL AUTO_INCREMENT,
  `company_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`company_key`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Dumping data for table umb.companies: ~2 rows (approximately)
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` (`company_key`, `company_name`) VALUES
	(1, 'umb'),
	(2, 'third company');
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;

-- Dumping structure for table umb.departments
CREATE TABLE IF NOT EXISTS `departments` (
  `department_key` int(11) NOT NULL AUTO_INCREMENT,
  `department_name` varchar(50) DEFAULT NULL,
  `company_key` int(11) DEFAULT NULL,
  PRIMARY KEY (`department_key`),
  KEY `FK_DEPARTMENT_COMPANY` (`company_key`),
  CONSTRAINT `FK_DEPARTMENT_COMPANY` FOREIGN KEY (`company_key`) REFERENCES `companies` (`company_key`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Dumping data for table umb.departments: ~5 rows (approximately)
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` (`department_key`, `department_name`, `company_key`) VALUES
	(1, 'software', 1),
	(2, 'nursering', 1),
	(3, 'industrila', 1),
	(4, 'third companys department', 2),
	(5, 'dance', 1);
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;

-- Dumping structure for table umb.employees
CREATE TABLE IF NOT EXISTS `employees` (
  `employee_key` int(11) NOT NULL AUTO_INCREMENT,
  `employee_name` varchar(50) DEFAULT NULL,
  `department_key` int(11) DEFAULT NULL,
  PRIMARY KEY (`employee_key`),
  KEY `FK_EMPLOYEE_DEPARTMENT` (`department_key`),
  CONSTRAINT `FK_EMPLOYEE_DEPARTMENT` FOREIGN KEY (`department_key`) REFERENCES `departments` (`department_key`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;

-- Dumping data for table umb.employees: ~14 rows (approximately)
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` (`employee_key`, `employee_name`, `department_key`) VALUES
	(1, 'first employee', 1),
	(2, 'second employee', 1),
	(3, 'third employee', 1),
	(6, 'new employee', 1),
	(29, 'a new one', 3),
	(31, 'the last one', 3),
	(32, 'third companys deparments employee', 4),
	(33, 'more than this', 1),
	(34, 'another one', 3),
	(35, 'test test test', 1),
	(36, 'test test test', 1),
	(37, 'Ok alright', 3),
	(38, 'Ok alright v2', 3),
	(39, 'why so serious? hahaha', 1);
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

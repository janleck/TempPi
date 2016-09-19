-- phpMyAdmin SQL Dump
-- version 3.4.11.1deb2+deb7u5
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Erstellungszeit: 19. Sep 2016 um 19:54
-- Server Version: 5.5.50
-- PHP-Version: 5.4.45-0+deb7u4

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Datenbank: `Buero1`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Minuten`
--

DROP TABLE IF EXISTS `Minuten`;
CREATE TABLE IF NOT EXISTS `Minuten` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Zeit` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Temperatur` float DEFAULT NULL,
  `Feuchte` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Time` (`Zeit`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=428 ;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Tage`
--

DROP TABLE IF EXISTS `Tage`;
CREATE TABLE IF NOT EXISTS `Tage` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Zeit` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Tmin` float DEFAULT NULL,
  `Tmittel` float DEFAULT NULL,
  `Tmax` float DEFAULT NULL,
  `Hmin` float DEFAULT NULL,
  `Hmittel` float DEFAULT NULL,
  `Hmax` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Time` (`Zeit`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

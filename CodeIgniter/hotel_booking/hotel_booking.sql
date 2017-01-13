-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 13, 2017 at 11:20 AM
-- Server version: 5.5.50-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `hotel_booking`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE IF NOT EXISTS `booking` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `hotel_name` varchar(255) NOT NULL,
  `des` text NOT NULL,
  `price` text NOT NULL,
  `pic` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`id`, `hotel_name`, `des`, `price`, `pic`) VALUES
(1, 'Courtyard', 'The luxurious Courtyard Ahmedabad welcomes business travelers and vacationing families with comfort, style, and an excellent location in Gujarat''s commercial capital. Our hotel strives to make guests feel relaxed and refreshed, with a range of thoughtful amenities and award-winning service. Settle into one of our 164 contemporary rooms and suites, and enjoy amenities including marble bathrooms', '150', 'Courtyard.jpg'),
(2, 'Gordhan Thaal', 'The luxurious Courtyard Ahmedabad welcomes business travelers and vacationing families with comfort, style, and an excellent location in Gujarat''s commercial capital. Our hotel strives to make guests feel relaxed and refreshed, with a range of thoughtful amenities and award-winning service. Settle into one of our 164 contemporary rooms and suites, and enjoy amenities including marble bathrooms', '200', 'Gordhan.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `details`
--

CREATE TABLE IF NOT EXISTS `details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `p_no` text NOT NULL,
  `address` text NOT NULL,
  `hotel_name` varchar(255) NOT NULL,
  `price` text NOT NULL,
  `email` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

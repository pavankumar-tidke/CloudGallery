-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 18, 2021 at 09:50 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cloudgallery`
--

-- --------------------------------------------------------

--
-- Table structure for table `favourite`
--

CREATE TABLE `favourite` (
  `favourite_id` int(255) NOT NULL,
  `user_id` int(255) DEFAULT NULL,
  `media_category_id` int(255) DEFAULT NULL,
  `media_category_name` text DEFAULT NULL,
  `favourite_name` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `folder`
--

CREATE TABLE `folder` (
  `folder_id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `folder_name` text NOT NULL,
  `date/time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `folder_data`
--

CREATE TABLE `folder_data` (
  `folder_data_id` int(255) NOT NULL,
  `user_id` int(255) DEFAULT NULL,
  `folder_id` text DEFAULT NULL,
  `media_name` text DEFAULT NULL,
  `favourite` tinyint(1) NOT NULL,
  `date/time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `query_answer`
--

CREATE TABLE `query_answer` (
  `query_ans_id` int(10) NOT NULL,
  `query_id` int(10) NOT NULL,
  `query_ans` varchar(200) NOT NULL,
  `date/time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `recent`
--

CREATE TABLE `recent` (
  `recent_id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `recent_name` text NOT NULL,
  `favourite` tinyint(1) NOT NULL,
  `date/time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `support`
--

CREATE TABLE `support` (
  `query_id` int(10) NOT NULL,
  `username` varchar(20) NOT NULL,
  `email` text NOT NULL,
  `query` text NOT NULL,
  `query_ans` text NOT NULL,
  `date/time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(10) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Username` text DEFAULT NULL,
  `Email` text NOT NULL,
  `user_img` text DEFAULT NULL,
  `sub` text DEFAULT NULL,
  `Password` text DEFAULT NULL,
  `session_token` text DEFAULT NULL,
  `date/time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `favourite`
--
ALTER TABLE `favourite`
  ADD PRIMARY KEY (`favourite_id`);

--
-- Indexes for table `folder`
--
ALTER TABLE `folder`
  ADD PRIMARY KEY (`folder_id`);

--
-- Indexes for table `folder_data`
--
ALTER TABLE `folder_data`
  ADD PRIMARY KEY (`folder_data_id`),
  ADD UNIQUE KEY `media_name` (`media_name`) USING HASH;

--
-- Indexes for table `query_answer`
--
ALTER TABLE `query_answer`
  ADD PRIMARY KEY (`query_ans_id`);

--
-- Indexes for table `recent`
--
ALTER TABLE `recent`
  ADD PRIMARY KEY (`recent_id`),
  ADD UNIQUE KEY `recent_name` (`recent_name`) USING HASH;

--
-- Indexes for table `support`
--
ALTER TABLE `support`
  ADD PRIMARY KEY (`query_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `Username` (`Username`(25)),
  ADD UNIQUE KEY `Email` (`Email`) USING HASH;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `favourite`
--
ALTER TABLE `favourite`
  MODIFY `favourite_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `folder`
--
ALTER TABLE `folder`
  MODIFY `folder_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `folder_data`
--
ALTER TABLE `folder_data`
  MODIFY `folder_data_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `query_answer`
--
ALTER TABLE `query_answer`
  MODIFY `query_ans_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `recent`
--
ALTER TABLE `recent`
  MODIFY `recent_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `support`
--
ALTER TABLE `support`
  MODIFY `query_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

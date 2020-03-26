-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 16, 2020 at 03:39 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ekasi-foodhub`
--

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `order_id` int(11) NOT NULL,
  `name` varchar(55) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `qty` int(255) DEFAULT NULL,
  `totalAmt` double GENERATED ALWAYS AS (`price` * `qty`) VIRTUAL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`order_id`, `name`, `price`, `qty`) VALUES
(1, 'Chicken & Mushroom', 149, 50);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(255) NOT NULL,
  `Breakfast` text NOT NULL,
  `lunch` varchar(255) NOT NULL,
  `dinner` varchar(255) NOT NULL,
  `dessert` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `Breakfast`, `lunch`, `dinner`, `dessert`) VALUES
(98, 'eggs and bacon', 'pap and vlies', 'greek salad ', 'cake'),
(987, 'eggs and bacon', 'pap and vlies', 'greek salad ', 'cake');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `customer_ID` int(255) NOT NULL,
  `name` text NOT NULL,
  `surname` text NOT NULL,
  `address` text NOT NULL,
  `email_address` varchar(255) NOT NULL,
  `cell_no` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `cust_status` tinyint(1) NOT NULL DEFAULT 1,
  `images` blob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`customer_ID`, `name`, `surname`, `address`, `email_address`, `cell_no`, `password`, `cust_status`, `images`) VALUES
(0, '', '', 'sosha south monate', 'mgl@gmail.com', '', '458', 1, ''),
(963852741, 'athandwa', 'zeni', '1490 Soshanguve', 'tutu2@yahoo.com', '072360360', 'idont9876', 1, ''),
(963852742, 'kabelo', 'malete', '124 maponto 7th Avennue', 'kabelo@gmail.com', '0213545874', '1212', 1, ''),
(963852743, 'kabelo', 'malete', '124 maponto 7th Avennue', 'kabelo@gmail.com', '0213545874', '1212', 1, ''),
(963852744, 'kabelo', 'malete', '124 maponto 7th Avennue', 'kabelo@gmail.com', '0213545874', '1212', 1, ''),
(963852745, 'rme', 'suame', 'address', 'emailess', '8526125', '$2a$10$YtzvSXPzK9j5GOp/M0fCF.0Hn.Ay7xBzialo12Jxl8AGhy1KQk3NC', 1, '');

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `item_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `item_price` int(11) NOT NULL,
  `item_description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`item_id`, `product_id`, `item_name`, `item_price`, `item_description`) VALUES
(1, 0, 'kota', 22, 'Chips,and atcher'),
(2, 0, 'chicken', 25, 'chicken wings');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(255) NOT NULL,
  `fk_Customer_ID` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `totalAmount` double NOT NULL,
  `order_Status` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `fk_Customer_ID`, `quantity`, `totalAmount`, `order_Status`) VALUES
(1, 0, 20, 650, 0);

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `payID` int(11) NOT NULL,
  `orderNo` int(255) NOT NULL,
  `payment_type` varchar(255) NOT NULL,
  `amount` double NOT NULL,
  `payment_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(150) NOT NULL,
  `quantity` int(100) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `restuarant_admin`
--

CREATE TABLE `restuarant_admin` (
  `restuarant_id` int(255) NOT NULL,
  `restuarant_name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email_address` varchar(255) NOT NULL,
  `rest_status` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `restuarant_admin`
--

INSERT INTO `restuarant_admin` (`restuarant_id`, `restuarant_name`, `address`, `password`, `email_address`, `rest_status`) VALUES
(123456789, 'kentucky', 'shop 19 Soshanguve', 'admin123', 'rest@gmail.com', 1),
(963852741, 'chicken now', 'shop 3 soshanguve', 'admin1234', 'resst@yahoo.com\r\n', 1),
(963852742, 'mogodu', 'sosha south monate', '458', 'mgl@gmail.com', 1);

-- --------------------------------------------------------

--
-- Table structure for table `system_admin`
--

CREATE TABLE `system_admin` (
  `system_Id` int(11) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email_address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `system_admin`
--

INSERT INTO `system_admin` (`system_Id`, `password`, `email_address`) VALUES
(1, 'admin@123', 'admin123@yahoo.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`customer_ID`);

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`item_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`payID`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `restuarant_admin`
--
ALTER TABLE `restuarant_admin`
  ADD PRIMARY KEY (`restuarant_id`);

--
-- Indexes for table `system_admin`
--
ALTER TABLE `system_admin`
  ADD PRIMARY KEY (`system_Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `customer_ID` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=963852746;

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `payID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `restuarant_admin`
--
ALTER TABLE `restuarant_admin`
  MODIFY `restuarant_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=963852743;

--
-- AUTO_INCREMENT for table `system_admin`
--
ALTER TABLE `system_admin`
  MODIFY `system_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=987654322;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

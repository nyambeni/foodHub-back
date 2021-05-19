-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 14, 2021 at 11:28 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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
  `streetname` varchar(255) NOT NULL,
  `house_number` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`customer_ID`, `name`, `surname`, `address`, `email_address`, `cell_no`, `password`, `streetname`, `house_number`) VALUES
(0, '', '', 'sosha south monate', 'mgl@gmail.com', '', '458', '', ''),
(963852741, 'athandwa', 'zeni', '1490 Soshanguve', 'tutu2@yahoo.com', '072360360', 'idont9876', '', ''),
(963852742, 'kabelo', 'malete', '124 maponto 7th Avennue', 'kabelo@gmail.com', '0213545874', '1212', '', ''),
(963852743, 'kabelo', 'malete', '124 maponto 7th Avennue', 'kabelo@gmail.com', '0213545874', '1212', '', ''),
(963852744, 'kabelo', 'malete', '124 maponto 7th Avennue', 'kabelo@gmail.com', '0213545874', '1212', '', ''),
(963852745, 'khodi', 'ndou', '241 henna street', 'kay@gmail.com', '0730733865', 'Kay123456', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `driver`
--

CREATE TABLE `driver` (
  `driverID` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `vehicleNo` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email_address` varchar(255) NOT NULL,
  `cell_no` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `driver`
--

INSERT INTO `driver` (`driverID`, `name`, `surname`, `address`, `vehicleNo`, `password`, `email_address`, `cell_no`, `status`) VALUES
(1, 'Solomon', 'Mahlangu', 'Pretoria', 'GH78TTGP', 'Solomon99', 'solomon@outlook.com', '0797418899', 'PENDING'),
(2, 'jali', 'Mnisi', 'Pretoria', 'GD15HGGP', 'Qwerty1234', 'jali@gmil.com', '0653572171', 'PENDING'),
(3, 'john', 'black', 'Pretoria', 'HG43GTGP', 'John@123456', 'jBlack@gmail.com', '0834568974', 'PENDING');

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `itemNo` varchar(200) NOT NULL,
  `item` varchar(200) NOT NULL,
  `price` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `totalAmount` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `ordertable`
--

CREATE TABLE `ordertable` (
  `orderNo` int(200) NOT NULL,
  `totPrice` int(20) NOT NULL,
  `orderStatus` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `orderDate` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `product_id` int(255) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_price` int(11) NOT NULL,
  `product_description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `product_price`, `product_description`) VALUES
(1, 'fried fish', 22, 'kentucky'),
(2, '4 Wings', 50, 'Hot Wings'),
(3, 'Wings', 35, '4 peri peri wings');

-- --------------------------------------------------------

--
-- Table structure for table `restuarant_admin`
--

CREATE TABLE `restuarant_admin` (
  `restuarant_id` int(11) NOT NULL,
  `restuarant_name` varchar(255) NOT NULL,
  `cellNo` varchar(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email_address` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `restuarant_admin`
--

INSERT INTO `restuarant_admin` (`restuarant_id`, `restuarant_name`, `cellNo`, `address`, `password`, `email_address`, `status`) VALUES
(1, 'kentucky', '', 'shop 19 Soshanguve', 'admin123', 'rest@gmail.com', 'Active'),
(2, 'chicken now', '', 'shop 3 soshanguve', 'admin1234', 'resst@yahoo.com\r\n', 'Active'),
(4, 'kasi', '0653572171', '21 kasi', 'Kasi123456', 'kasi@gmail.com', 'PENDING');

-- --------------------------------------------------------

--
-- Table structure for table `system_admin`
--

CREATE TABLE `system_admin` (
  `system_Id` int(11) NOT NULL,
  `customer_ID` int(255) NOT NULL,
  `restaurant_id` int(11) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email_address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `system_admin`
--

INSERT INTO `system_admin` (`system_Id`, `customer_ID`, `restaurant_id`, `password`, `email_address`) VALUES
(147258369, 0, 963852741, 'syst123', 'admin@yahoo.com'),
(987654321, 0, 147258369, 'admin234', 'syst@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `Id` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `Roles` varchar(100) NOT NULL,
  `Created_on` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Id`, `Name`, `Email`, `Password`, `Roles`, `Created_on`) VALUES
(1, 'Jali', 'Mnisi@gmail.comm', 'hello', 'user', '2020-12-16 16:41:59'),
(3, 'Tibi', 'Tibi@gmail.com', 'its abowt tym', 'User', '2020-12-16 16:57:38'),
(4, 'John', 'john@gmail.com', 'Tym to rest now', 'ADMIN', '2020-12-16 17:26:23'),
(5, 'John', 'john@gmail.com', 'Tym to rest now', 'ADMIN', '2020-12-16 21:00:16'),
(6, 'John', 'john@gmail.com', 'Tym to rest now', 'ADMIN', '2020-12-16 21:05:43'),
(8, '$scope.name', '$scope.email', '$scope.pswd', '$scope.roles', '2020-12-17 14:01:47'),
(9, '$scope.name', '$scope.email', '$scope.pswd', '$scope.roles', '2020-12-17 14:04:01'),
(10, 'jali', 'j.mnisi.c.jm@gmail.com', '#Mdawekamatla1', 'customer', '2021-01-21 11:41:24'),
(11, 'Jali Mnisi', 'j.mnisi@gmail.com', '123456', 'admin', '2021-01-21 22:16:48'),
(12, 'Jali Mnisi', 'j.mdawe@gmail.com', '123456', 'admin', '2021-01-21 22:22:39'),
(13, 'Jali Mnisi', 'j.sina@gmail.com', '123456', 'admin', '2021-01-21 22:23:39'),
(14, 'Jali Mdawwe', 'j.lee@gmail.com', '123456', 'admin', '2021-01-21 22:26:20'),
(15, 'Jali Mdawwe', 'j.lee@gmail', '123456', 'admin', '2021-01-22 12:18:22'),
(16, 'Jali Mdawwe', 'j.lee.com', '123456', 'admin', '2021-01-22 12:19:10'),
(17, 'Jali Mdawwe', 'j.lee.co@haha.com', '123456', 'admin', '2021-01-26 12:27:32'),
(18, 'Jali Mdawwe', 'j.lee.co@haha.co', '123456', 'admin', '2021-01-27 10:41:27'),
(19, 'Jali Mdawwe', 'j.lee.coha@ha.com', '123456', 'admin', '2021-01-27 10:44:59'),
(20, 'Jali Mdawwe', 'j.lee.coha@haha.com', '123456', 'admin', '2021-01-27 10:47:15');

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
-- Indexes for table `driver`
--
ALTER TABLE `driver`
  ADD PRIMARY KEY (`driverID`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `ordertable`
--
ALTER TABLE `ordertable`
  ADD PRIMARY KEY (`orderNo`);

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
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `customer_ID` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=963852746;

--
-- AUTO_INCREMENT for table `driver`
--
ALTER TABLE `driver`
  MODIFY `driverID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ordertable`
--
ALTER TABLE `ordertable`
  MODIFY `orderNo` int(200) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `payID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `restuarant_admin`
--
ALTER TABLE `restuarant_admin`
  MODIFY `restuarant_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `system_admin`
--
ALTER TABLE `system_admin`
  MODIFY `system_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=987654322;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

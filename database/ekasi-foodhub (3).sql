-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 22, 2021 at 03:52 PM
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
  `email_address` varchar(255) NOT NULL,
  `cell_no` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`customer_ID`, `name`, `surname`, `email_address`, `cell_no`, `password`) VALUES
(963852746, 'jali', 'mnisi', 'j.misi.c.jm@gmail.co.za', '0653572171', '12345');

-- --------------------------------------------------------

--
-- Table structure for table `customeradd`
--

CREATE TABLE `customeradd` (
  `email` int(11) NOT NULL,
  `street` varchar(255) NOT NULL,
  `surburb` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `postalCode` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customeradd`
--

INSERT INTO `customeradd` (`email`, `street`, `surburb`, `city`, `postalCode`) VALUES
(0, '27', '0', '0', 2090);

-- --------------------------------------------------------

--
-- Table structure for table `driver`
--

CREATE TABLE `driver` (
  `driverID` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `vehicleNo` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `cellNo` varchar(255) NOT NULL,
  `pasword` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `driver`
--

INSERT INTO `driver` (`driverID`, `name`, `surname`, `vehicleNo`, `status`, `email`, `cellNo`, `pasword`) VALUES
(4, 'jali', 'mnisi', 'dx12vv gp', 'ACTIVE', 'j.mnisi.c.jm@gmail.com', '0653572171', '$2b$10$wLkGlDAGoXyTWyRn/41aqeo8mJNQF3wiquEdQi4o5WwaCmC8UNyVm'),
(5, 'jali', 'mnisi', 'dx12vv gp', 'ACTIVE', 'j.mnisi.c.jm@gmail.co', '0653572171', '$2b$10$lHiR46p3EFVaRpBzV4UsfucNzJdEbeOXCHYh6s3xctFGsy8BT3xSy'),
(6, 'jali', 'mnisi', 'dx12vv gp', 'ACTIVE', 'j.mnisi.c.jm@gmail.co.za', '0653572171', '$2b$10$jjayKC2dJZIhCKWCW9VJ1.KR9VdDpgF6Iuq8r8t4qbvoT6MZ6ZydW');

-- --------------------------------------------------------

--
-- Table structure for table `driveradd`
--

CREATE TABLE `driveradd` (
  `email` varchar(255) NOT NULL,
  `street` varchar(11) NOT NULL,
  `surburb` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `postalCode` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `driveradd`
--

INSERT INTO `driveradd` (`email`, `street`, `surburb`, `city`, `postalCode`) VALUES
('0', '252', '0', '0', 2090),
('0', '252', '0', '0', 2090),
('j.mnisi.c.jm@gmail.co', '252', 'Gresswold', 'johannesburg', 2090),
('j.mnisi.c.jm@gmail.co.za', '252', 'Gresswold', 'johannesburg', 2090);

-- --------------------------------------------------------

--
-- Table structure for table `logbook`
--

CREATE TABLE `logbook` (
  `logID` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `login_Time` time NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `logbook`
--

INSERT INTO `logbook` (`logID`, `email`, `token`, `login_Time`) VALUES
(1, '963852745', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0SUQiOjk2Mzg1Mjc0NSwibmFtZSI6ImphbGkiLCJzdXJuYW1lIjoibW5pc2kiLCJhZGRyZXNzIjoiMjcgaGF0aGF3YXkgIGdyZXNzd29ybGQiLCJlbWFpbCI6ImoubWlzaS5jLmptQGdtYWlsLmNvbSIsImNlbGxObyI6IjA2NTM1NzIxNzEiLCJpYXQiOjE2MTQxNjg4NzgsImV4cC', '14:14:38'),
(2, '963852745', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0SUQiOjk2Mzg1Mjc0NSwibmFtZSI6ImphbGkiLCJzdXJuYW1lIjoibW5pc2kiLCJhZGRyZXNzIjoiam9oYW5uZXNidXJnIiwiZW1haWwiOiJqLm1pc2kuYy5qbUBnbWFpbC5jb20iLCJjZWxsTm8iOiIwNjUzNTcyMTcxIiwiaWF0IjoxNjE0MTY5MDQ5LCJleHAiOjE2MTQxNzI2ND', '14:17:29'),
(3, '963852745', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0SUQiOjk2Mzg1Mjc0NSwibmFtZSI6ImphbGkiLCJzdXJuYW1lIjoibW5pc2kiLCJhZGRyZXNzIjoiam9oYW5uZXNidXJnIiwiZW1haWwiOiJqLm1pc2kuYy5qbUBnbWFpbC5jb20iLCJjZWxsTm8iOiIwNjUzNTcyMTcxIiwiaWF0IjoxNjE0MTY5MTMwLCJleHAiOjE2MTQxNzI3Mz', '14:18:50'),
(4, '963852745', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0SUQiOjk2Mzg1Mjc0NSwibmFtZSI6ImphbGkiLCJzdXJuYW1lIjoibW5pc2kiLCJhZGRyZXNzIjoiam9oYW5uZXNidXJnIiwiZW1haWwiOiJqLm1pc2kuYy5qbUBnbWFpbC5jb20iLCJjZWxsTm8iOiIwNjUzNTcyMTcxIiwiaWF0IjoxNjE0MTY5MTYwLCJleHAiOjE2MTQxNzI3Nj', '14:19:20'),
(5, 'j.misi.c.jm@gmail.co.za', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0SUQiOjk2Mzg1Mjc0NiwibmFtZSI6ImphbGkiLCJzdXJuYW1lIjoibW5pc2kiLCJlbWFpbCI6ImoubWlzaS5jLmptQGdtYWlsLmNvLnphIiwiY2VsbE5vIjoiMDY1MzU3MjE3MSIsImlhdCI6MTYxOTA3ODE1MiwiZXhwIjoxNjE5MDgxNzUyfQ.XF2AFaEZDkpFXRa72OVp1CNKWNI', '09:55:52'),
(6, 'jali.mci@gmail.coza', 'N/A', '11:20:05');

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
  `product_description` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `resturantName` varchar(255) NOT NULL,
  `picture` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `product_price`, `product_description`, `category`, `resturantName`, `picture`) VALUES
(0, 'Rice & stew', 45, 'yellow rice cooked with beef stew ', 'Supper', '', ''),
(1, 'fried fish', 22, 'kentucky', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `restuarant`
--

CREATE TABLE `restuarant` (
  `restuarant_id` int(255) NOT NULL,
  `restuarant_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email_address` varchar(255) NOT NULL,
  `cellNo` varchar(255) NOT NULL,
  `logo` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `restuarant`
--

INSERT INTO `restuarant` (`restuarant_id`, `restuarant_name`, `password`, `email_address`, `cellNo`, `logo`, `status`) VALUES
(1, 'Mavimbela', 'ali', 'resst@yahoo.com', '0653572171', '', 'ACTIVE'),
(2, 'mavimbelaSweets', '$2b$10$H/E5S.v8ZFXsSk1cBtT8Yu67F9S8Pn59Vj2yO.uwOfPQZFN2UUJcW', 'jali.mci@gmail.jali', '0653572171', 'upload\\logo\\1619083063790-zrbmlQej.jpg', 'ACTIVE'),
(3, 'mavimbelaSweets', '$2b$10$tQWU0IWYZsqcRx4yJ1QmVO14Idb8z.33LFfk4uASMnEPxwscE.eSG', 'jali.mci@gmail.com', '0653572171', 'upload\\logo\\1619083163439-zrbmlQej.jpg', 'ACTIVE'),
(4, 'mavimbelaSweets', '$2b$10$uyaDwoQD.65Ev8FsTiHwWuyIQ1WSNjtUNi2foaHZvcAixgN5nHriC', 'jali.mci@gmail.coza', '0653572171', 'upload\\logo\\1619083204813-zrbmlQej.jpg', 'PENDING');

-- --------------------------------------------------------

--
-- Table structure for table `restuarantadd`
--

CREATE TABLE `restuarantadd` (
  `addID` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `street` varchar(255) NOT NULL,
  `surburb` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `postalCode` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `restuarantadd`
--

INSERT INTO `restuarantadd` (`addID`, `email`, `street`, `surburb`, `city`, `postalCode`) VALUES
(1, 'jali.mci@gmail.coza', '27 jak', 'Soshanguve', 'johannesburg', 2090);

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
-- Indexes for table `logbook`
--
ALTER TABLE `logbook`
  ADD PRIMARY KEY (`logID`);

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
-- Indexes for table `restuarant`
--
ALTER TABLE `restuarant`
  ADD PRIMARY KEY (`restuarant_id`);

--
-- Indexes for table `restuarantadd`
--
ALTER TABLE `restuarantadd`
  ADD PRIMARY KEY (`addID`);

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
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `customer_ID` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=963852747;

--
-- AUTO_INCREMENT for table `driver`
--
ALTER TABLE `driver`
  MODIFY `driverID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `logbook`
--
ALTER TABLE `logbook`
  MODIFY `logID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `payID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `restuarant`
--
ALTER TABLE `restuarant`
  MODIFY `restuarant_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `restuarantadd`
--
ALTER TABLE `restuarantadd`
  MODIFY `addID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `system_admin`
--
ALTER TABLE `system_admin`
  MODIFY `system_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=987654322;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

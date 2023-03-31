-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: erDB
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `erDB`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `erDB` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `erDB`;

--
-- Table structure for table `prediction`
--

DROP TABLE IF EXISTS `prediction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prediction` (
  `request_id` varchar(36) NOT NULL,
  `scenario_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `input_vars` json NOT NULL,
  `prediction` varchar(255) DEFAULT NULL,
  `date_time` timestamp NULL DEFAULT NULL,
  `scenario_version_number` int DEFAULT NULL,
  `prediction_name` varchar(36) NOT NULL,
  PRIMARY KEY (`request_id`),
  UNIQUE KEY `request_id` (`request_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `prediction_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prediction`
--

LOCK TABLES `prediction` WRITE;
/*!40000 ALTER TABLE `prediction` DISABLE KEYS */;
INSERT INTO `prediction` VALUES ('7ab6d41f-53ee-4e54-8ea3-544149bac860','c409c855-1a7c-4e57-baa1-fa1cf60e94ee','9109cb85-b090-4930-ba35-3c288c7de6e2','{\"age\": 30, \"car\": null, \"name\": \"John\"}','3','2023-01-26 20:58:28',2),('dedbfcff-15e0-460e-8262-18b111d3b804','c409c855-1a7c-4e57-baa1-fa1cf60e94ee','9109cb85-b090-4930-ba35-3c288c7de6e2','{\"age\": 30, \"car\": null, \"name\": \"John\"}','2','2023-01-26 20:58:28',2),('fcede0ad-0f7d-4713-a5ee-25176c0555a6','c409c855-1a7c-4e57-baa1-fa1cf60e94ee','9109cb85-b090-4930-ba35-3c288c7de6e2','{\"age\": 30, \"car\": null, \"name\": \"John\"}','1','2023-01-26 20:58:28',1);
/*!40000 ALTER TABLE `prediction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` varchar(36) NOT NULL,
  `username` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id` (`user_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('408f75a4-c52b-4792-b02b-b9d3b4f60ab4','hello','test'),('9109cb85-b090-4930-ba35-3c288c7de6e2','user1','user123'),('aa38a112-f563-4e19-b24f-fb85233c6282','user3','user123'),('c409c855-1a7c-4e57-baa1-fa1cf60e94ee','user2','user123');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `what_if_scenario`
--

DROP TABLE IF EXISTS `what_if_scenario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `what_if_scenario` (
  `scenario_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `scenario_name` varchar(255) NOT NULL,
  `input_vars` json NOT NULL,
  PRIMARY KEY (`scenario_id`),
  UNIQUE KEY `scenario_id` (`scenario_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `what_if_scenario_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `what_if_scenario`
--

LOCK TABLES `what_if_scenario` WRITE;
/*!40000 ALTER TABLE `what_if_scenario` DISABLE KEYS */;
INSERT INTO `what_if_scenario` VALUES ('70ea8bc0-35fc-4f00-80a9-0310a6fec9e6','408f75a4-c52b-4792-b02b-b9d3b4f60ab4','default','{}'),('c409c855-1a7c-4e57-baa1-fa1cf60e94ee','9109cb85-b090-4930-ba35-3c288c7de6e2','scen3','{\"name\": \"bob\", \"poor\": \"yes\"}'),('e01d1a89-22be-46f5-a373-6019f797c6b6','9109cb85-b090-4930-ba35-3c288c7de6e2','scen1','{\"age\": 30, \"car\": null, \"name\": \"John\"}'),('e46cd225-867a-4af8-9e6b-4373b0a836df','9109cb85-b090-4930-ba35-3c288c7de6e2','scen2','{\"age\": 30, \"car\": null, \"name\": \"John\"}');
/*!40000 ALTER TABLE `what_if_scenario` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`admin`@`%`*/ /*!50003 TRIGGER `what_if_scenario_history_insert` AFTER INSERT ON `what_if_scenario` FOR EACH ROW BEGIN
    INSERT INTO what_if_scenario_history (scenario_id, user_id, input_vars, scenario_name, version_number)
    VALUES (new.scenario_id, new.user_id, new.input_vars, new.scenario_name, 1);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`admin`@`%`*/ /*!50003 TRIGGER `what_if_scenario_history_update` AFTER UPDATE ON `what_if_scenario` FOR EACH ROW BEGIN
    DECLARE x INTEGER;
    SET x = (SELECT MAX(version_number) FROM what_if_scenario_history WHERE scenario_id = new.scenario_id);
    INSERT INTO what_if_scenario_history (scenario_id, user_id, input_vars, scenario_name, version_number)
    VALUES (new.scenario_id, new.user_id, new.input_vars, new.scenario_name, x + 1);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `what_if_scenario_history`
--

DROP TABLE IF EXISTS `what_if_scenario_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `what_if_scenario_history` (
  `scenario_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `scenario_name` varchar(255) NOT NULL,
  `input_vars` json NOT NULL,
  `version_number` int NOT NULL,
  PRIMARY KEY (`scenario_id`,`version_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `what_if_scenario_history`
--

LOCK TABLES `what_if_scenario_history` WRITE;
/*!40000 ALTER TABLE `what_if_scenario_history` DISABLE KEYS */;
INSERT INTO `what_if_scenario_history` VALUES ('70ea8bc0-35fc-4f00-80a9-0310a6fec9e6','408f75a4-c52b-4792-b02b-b9d3b4f60ab4','default','{}',1),('c409c855-1a7c-4e57-baa1-fa1cf60e94ee','9109cb85-b090-4930-ba35-3c288c7de6e2','scen3','{\"age\": 30, \"car\": null, \"name\": \"John\"}',1),('c409c855-1a7c-4e57-baa1-fa1cf60e94ee','9109cb85-b090-4930-ba35-3c288c7de6e2','scen3','{\"name\": \"bob\", \"poor\": \"yes\"}',2),('e01d1a89-22be-46f5-a373-6019f797c6b6','9109cb85-b090-4930-ba35-3c288c7de6e2','scen1','{\"age\": 30, \"car\": null, \"name\": \"John\"}',1),('e46cd225-867a-4af8-9e6b-4373b0a836df','9109cb85-b090-4930-ba35-3c288c7de6e2','scen2','{\"age\": 30, \"car\": null, \"name\": \"John\"}',1);
/*!40000 ALTER TABLE `what_if_scenario_history` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-29 22:23:07

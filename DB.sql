-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: my_db
-- ------------------------------------------------------
-- Server version	8.0.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chapter`
--

DROP TABLE IF EXISTS `chapter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chapter` (
  `chapter_id` int NOT NULL,
  `chapter_name` varchar(70) NOT NULL,
  `max_victory_cups` int NOT NULL,
  `automatic_win` tinyint NOT NULL,
  PRIMARY KEY (`chapter_id`),
  UNIQUE KEY `chapterName_UNIQUE` (`chapter_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chapter`
--

LOCK TABLES `chapter` WRITE;
/*!40000 ALTER TABLE `chapter` DISABLE KEYS */;
INSERT INTO `chapter` VALUES (1,'מכתב פתיחה',1,0),(2,'פרק א - סוד האושר',1,1),(3,'משימת קרמבו',1,0),(4,'פרק ב - האנשים הגדולים',1,0),(5,'פרק ג - אני טוב',7,0),(6,'פרק ד - להוקיר את החיים',7,0),(7,'פרק ה - נעים להכיר',7,0),(8,'פרק ו',5,1),(9,'פרק ז',4,1),(10,'פרק ח',12,1),(11,'פרק ט - המסלול הבטוח',28,0),(13,'פרק י - לתת ולצמוח',7,0),(14,'פרק יא - החמצות',7,0),(15,'פרק יב',2,1),(16,'פרק יג',5,1),(17,'פרק יח',4,1),(18,'פרק טו - למלא את החלל',28,0),(19,'פרק טו - מדיה - הסיפור האמיתי',14,0),(20,'פרק יז - מישהו לרוץ איתו',1,0),(21,'פרק יט - אמא אדמה',1,0),(22,'פרק כג - יום השחרור',42,0),(23,'פרק כה - חוזרים לשליטה',28,0),(24,'פרק כו - אין לי כח',6,1),(25,'פרק כז - לבחור נכון',5,1),(26,'פרק כח - הסטורי',3,1),(27,'פרק כט - תמיד מוכן',1,0);
/*!40000 ALTER TABLE `chapter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chapter2`
--

DROP TABLE IF EXISTS `chapter2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chapter2` (
  `chapter_id` int NOT NULL,
  `chapter_name` varchar(70) NOT NULL,
  `max_victory_cups` int NOT NULL,
  `automatic_win` tinyint NOT NULL,
  PRIMARY KEY (`chapter_id`),
  UNIQUE KEY `chapterName_UNIQUE` (`chapter_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chapter2`
--

LOCK TABLES `chapter2` WRITE;
/*!40000 ALTER TABLE `chapter2` DISABLE KEYS */;
INSERT INTO `chapter2` VALUES (1,'מכתב פתיחה',1,0),(2,'פרק א - סוד האושר',1,1),(3,'משימת קרמבו',1,0),(4,'פרק ב - האנשים הגדולים',1,1),(5,'פרק ג - אני טוב',7,0),(6,'פרק ד - להוקיר את החיים',7,0),(7,'פרק ה - נעים להכיר',7,0),(8,'פרק ו111',5,1),(9,'חיים שאל11',11,1),(10,'פרק ח',12,1),(11,'פרק ט - המסלול הבטוח',28,0),(13,'פרק י - לתת ולצמוח',7,0),(14,'פרק יא - החמצות',7,0),(15,'פרק יב',2,1),(16,'פרק יג',5,1),(17,'פרק יח',4,1),(18,'פרק טו - למלא את החלל',28,0),(19,'פרק טו - מדיה - הסיפור האמיתי',14,0),(20,'פרק יז - מישהו לרוץ איתו',1,1),(21,'פרק יט - אמא אדמה',1,0),(22,'פרק כג - יום השחרור',42,0),(23,'פרק כה - חוזרים לשליטה',28,0),(24,'פרק כו - אין לי כח',6,1),(25,'פרק כז - לבחור נכון',5,1),(26,'פרק כח - הסטורי',3,1),(27,'פרק כט - תמיד מוכן',1,0);
/*!40000 ALTER TABLE `chapter2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedbacktext`
--

DROP TABLE IF EXISTS `feedbacktext`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedbacktext` (
  `under_or_equal_seccess_percent` int NOT NULL,
  `your_control` varchar(100) NOT NULL,
  `connection_to_yourself` varchar(100) NOT NULL,
  `commitment_to_success` varchar(100) NOT NULL,
  `self_fulfillment` varchar(100) NOT NULL,
  PRIMARY KEY (`under_or_equal_seccess_percent`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='	';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedbacktext`
--

LOCK TABLES `feedbacktext` WRITE;
/*!40000 ALTER TABLE `feedbacktext` DISABLE KEYS */;
INSERT INTO `feedbacktext` VALUES (40,'עד 40 מצויין ככה צריך להמשיך יש לך שליטה עצמית סבירה','עד 40','עד 40','עד 40'),(60,'עד 60!!','עד 60!!','עד 60','עד 60'),(80,'מצויין, אתה ממשיך להתקדם, תמשיך כך עוד ועוד','עד 80','עד 80','עד 80'),(100,'אין עליך!!!!','עד 100','עד 100','עד 100');
/*!40000 ALTER TABLE `feedbacktext` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goals_or_habits`
--

DROP TABLE IF EXISTS `goals_or_habits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `goals_or_habits` (
  `user_name` varchar(45) NOT NULL,
  `goals_selected` tinyint NOT NULL,
  `max_goals` int DEFAULT NULL,
  PRIMARY KEY (`user_name`),
  CONSTRAINT `goals_or_habits__user` FOREIGN KEY (`user_name`) REFERENCES `user` (`user_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goals_or_habits`
--

LOCK TABLES `goals_or_habits` WRITE;
/*!40000 ALTER TABLE `goals_or_habits` DISABLE KEYS */;
INSERT INTO `goals_or_habits` VALUES ('aaa',0,0),('binyamin',1,20);
/*!40000 ALTER TABLE `goals_or_habits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `points_max`
--

DROP TABLE IF EXISTS `points_max`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `points_max` (
  `chapter_id` int NOT NULL,
  `your_control` int NOT NULL,
  `connection_to_yourself` int NOT NULL,
  `commitment_to_success` int NOT NULL,
  `self_fulfillment` int NOT NULL,
  PRIMARY KEY (`chapter_id`),
  CONSTRAINT `distribution_of_points-chapter` FOREIGN KEY (`chapter_id`) REFERENCES `chapter` (`chapter_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `points_max`
--

LOCK TABLES `points_max` WRITE;
/*!40000 ALTER TABLE `points_max` DISABLE KEYS */;
INSERT INTO `points_max` VALUES (1,0,1,0,0),(2,0,1,0,0),(3,0,0,1,0),(4,0,0,1,0),(5,0,4,3,0),(6,0,4,3,0),(7,0,4,2,3),(8,0,2,3,0),(9,4,0,0,0),(10,4,8,0,0),(11,4,4,10,10),(12,4,4,10,10),(13,0,0,2,5),(14,3,3,1,0),(15,1,1,0,0),(16,2,2,0,1),(17,0,0,4,0),(18,14,6,8,4),(19,6,0,2,6),(20,0,0,10,0),(21,2,4,0,0),(22,14,14,14,0),(23,14,4,10,0),(24,2,0,4,0),(25,3,2,0,0),(26,0,3,0,0),(27,0,2,1,2);
/*!40000 ALTER TABLE `points_max` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `points_max2`
--

DROP TABLE IF EXISTS `points_max2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `points_max2` (
  `chapter_id` int NOT NULL,
  `your_control` int NOT NULL,
  `connection_to_yourself` int NOT NULL,
  `commitment_to_success` int NOT NULL,
  `self_fulfillment` int NOT NULL,
  PRIMARY KEY (`chapter_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `points_max2`
--

LOCK TABLES `points_max2` WRITE;
/*!40000 ALTER TABLE `points_max2` DISABLE KEYS */;
INSERT INTO `points_max2` VALUES (1,0,1,0,0),(2,0,1,0,0),(3,0,0,1,0),(4,2,2,4,0),(5,0,4,3,0),(6,0,4,3,0),(7,0,4,2,3),(8,0,2,3,0),(9,9,11,3,9),(10,4,8,0,0),(11,4,4,10,10),(12,4,4,10,10),(13,0,0,2,5),(14,3,3,1,0),(15,1,1,0,0),(16,2,2,0,1),(17,0,0,4,0),(18,14,6,8,4),(19,6,0,2,6),(20,0,0,10,0),(21,2,4,0,0),(22,14,14,14,0),(23,14,4,10,0),(24,2,0,4,0),(25,3,2,0,0),(26,0,3,0,0),(27,0,2,1,2);
/*!40000 ALTER TABLE `points_max2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `setting`
--

DROP TABLE IF EXISTS `setting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `setting` (
  `key` varchar(30) NOT NULL,
  `explanation` varchar(200) NOT NULL,
  `value` varchar(45) NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `setting`
--

LOCK TABLES `setting` WRITE;
/*!40000 ALTER TABLE `setting` DISABLE KEYS */;
INSERT INTO `setting` VALUES ('email_sender','כתובת אימייל שממנה נשלח הודעות אוטומטיות','lokchimAchraiut.noReplay@gmail.com'),('email_sender_password','סיסמת אימייל שממנה נשלחים הודעות אוטומטיות','israelOnly'),('reciver_email_address','כתובת אימייל שאליה ישלחו הודעות ממשתמשים','jacov141@gmail.com');
/*!40000 ALTER TABLE `setting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_name` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `is_admin` tinyint NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `date_of_registering` date DEFAULT NULL,
  `filled_feedback` tinyint DEFAULT NULL,
  PRIMARY KEY (`user_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('aaa','102030',0,NULL,NULL,NULL),('bbb','102030',0,NULL,NULL,NULL),('binyamin','1234',0,'2010-10-10',NULL,NULL),('ccc','102030',0,NULL,NULL,NULL),('jac','102030',0,'1985-12-29',NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_cups`
--

DROP TABLE IF EXISTS `user_cups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_cups` (
  `user_name` varchar(45) NOT NULL,
  `date_update` date NOT NULL,
  `chapter_id` int NOT NULL,
  `victory_cups_wined` int DEFAULT NULL,
  PRIMARY KEY (`user_name`,`chapter_id`),
  KEY `user_cups-chapter_idx` (`chapter_id`),
  CONSTRAINT `user_cups-chapter` FOREIGN KEY (`chapter_id`) REFERENCES `chapter` (`chapter_id`),
  CONSTRAINT `user_cups-user` FOREIGN KEY (`user_name`) REFERENCES `user` (`user_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_cups`
--

LOCK TABLES `user_cups` WRITE;
/*!40000 ALTER TABLE `user_cups` DISABLE KEYS */;
INSERT INTO `user_cups` VALUES ('binyamin','2020-06-20',1,0),('binyamin','2020-06-20',2,1),('binyamin','2020-06-20',3,0),('binyamin','2020-06-20',4,0),('binyamin','2020-06-23',5,4),('binyamin','2020-06-21',6,7),('binyamin','2020-06-23',7,6),('binyamin','2020-06-20',8,5),('binyamin','2020-06-20',9,4),('binyamin','2020-06-20',10,12),('binyamin','2020-06-24',11,28),('binyamin','2020-06-21',13,7),('binyamin','2020-06-21',14,7),('binyamin','2020-06-20',15,2),('binyamin','2020-06-20',16,5),('binyamin','2020-06-20',17,4),('binyamin','2020-06-21',18,28),('binyamin','2020-06-21',19,14),('binyamin','2020-06-21',20,0),('binyamin','2020-06-21',21,0),('binyamin','2020-06-21',22,39),('binyamin','2020-06-22',23,0),('binyamin','2020-06-20',24,6),('binyamin','2020-06-20',25,5),('binyamin','2020-06-20',26,3),('binyamin','2020-06-20',27,0),('jac','2020-06-21',1,0),('jac','2020-06-21',2,1),('jac','2020-06-21',3,0),('jac','2020-06-21',4,0),('jac','2020-06-21',5,0),('jac','2020-06-21',6,0),('jac','2020-06-21',7,0),('jac','2020-06-21',8,5),('jac','2020-06-21',9,4),('jac','2020-06-21',10,12),('jac','2020-06-21',11,0),('jac','2020-06-21',13,0),('jac','2020-06-21',14,0),('jac','2020-06-21',15,2),('jac','2020-06-21',16,5),('jac','2020-06-21',17,4),('jac','2020-06-21',18,0),('jac','2020-06-21',19,0),('jac','2020-06-21',20,0),('jac','2020-06-21',21,0),('jac','2020-06-21',22,0),('jac','2020-06-21',23,0),('jac','2020-06-21',24,6),('jac','2020-06-21',25,5),('jac','2020-06-21',26,3),('jac','2020-06-21',27,0);
/*!40000 ALTER TABLE `user_cups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'my_db'
--

--
-- Dumping routines for database 'my_db'
--
/*!50003 DROP PROCEDURE IF EXISTS `get_relative_self_control` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `get_relative_self_control`(
IN userName varchar(100),
out result decimal
)
BEGIN

/* this query returns the max sum of points one may get for your_control until last chapter that user filed  */
SELECT @maxCupsTillLastChapterFilled := sum(your_control) 
FROM distribution_of_points_for_max_victory_cups 
WHERE chapter_id <= 
(SELECT max(chapter_id)
FROM user_cups_by_chapters left join chapter on id = chapter_id
WHERE victory_cups_wined > 0 and automatic_win = 0);
 
/* gets the sumOfUser/ @maxCupsTillLastChapterFilled  */
SELECT sumOfUser/@maxCupsTillLastChapterFilled
INTO @result
FROM
(SELECT  sum((victory_cups_wined/max_victory_cups)*distribution_of_points_for_max_victory_cups.your_control) as sumOfUser
FROM chapter 
	left join user_cups_by_chapters on chapter.id = user_cups_by_chapters.chapter_id 
	left join distribution_of_points_for_max_victory_cups on chapter.id = distribution_of_points_for_max_victory_cups.chapter_id
WHERE user_cups_by_chapters.user_name = userName) as baseTable;
select @result;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_text_for_self_control` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `get_text_for_self_control`(in userName varchar(100), out aab decimal, out resultText varchar(100))
BEGIN
	call get_user_control_percent(userName, aab);
  if(  aab >0 && aab  <= 40) then 
  select  your_control into resultText from feedbacktext where under_or_equal_seccess_percent = 40 ;
  end if;
  if( aab >40 && aab  <= 60) then 
  select your_control into resultText from feedbacktext where under_or_equal_seccess_percent = 60 ;
  end if;
  if( aab >60 && aab  <= 80) then
  select your_control into resultText from feedbacktext where under_or_equal_seccess_percent = 80 ;
  end if;
  if( aab >80 && aab  <= 100) then
  select your_control into resultText from feedbacktext where under_or_equal_seccess_percent = 80 ;
  end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_user_self_commitment` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `get_user_self_commitment`(IN userName varchar(100), IN chapterUserHolds INT )
BEGIN
	/* gets the percent of seccess relative to max points */
	SELECT sum(userPoints)/sum(maxPoints) as commitment_to_success_result
    FROM
    (SELECT (victory_cups_wined/max_victory_cups) * points_max.commitment_to_success as userPoints, points_max.commitment_to_success as maxPoints 
    FROM chapter natural join user_cups natural join points_max
    WHERE user_cups.user_name = userName and chapter.chapter_id <= chapterUserHolds ) as baseTable ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_user_self_connection` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `get_user_self_connection`(IN userName varchar(100), IN chapterUserHolds INT )
BEGIN
	/* gets the percent of seccess relative to max points */
	SELECT sum(userPoints)/sum(maxPoints) as self_connection_result
    FROM
    (SELECT (victory_cups_wined/max_victory_cups) * points_max.connection_to_yourself as userPoints, points_max.connection_to_yourself as maxPoints 
    FROM chapter natural join user_cups natural join points_max
    WHERE user_cups.user_name = userName and chapter.chapter_id <= chapterUserHolds ) as baseTable ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_user_self_control` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `get_user_self_control`(IN userName varchar(100), IN chapterUserHolds INT )
BEGIN
	/* gets the percent of seccess relative to max points */
	SELECT sum(userPoints)/sum(maxPoints) as your_control_result
    FROM
    (SELECT (victory_cups_wined/max_victory_cups) * points_max.your_control as userPoints, points_max.your_control as maxPoints 
    FROM chapter natural join user_cups natural join points_max
    WHERE user_cups.user_name = userName and chapter.chapter_id <= chapterUserHolds ) as baseTable ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_user_self_fulfillment` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `get_user_self_fulfillment`(IN userName varchar(100), IN chapterUserHolds INT )
BEGIN
	/* gets the percent of seccess relative to max points */
	SELECT sum(userPoints)/sum(maxPoints) as self_fulfillment_result
    FROM
    (SELECT (victory_cups_wined/max_victory_cups) * points_max.self_fulfillment as userPoints, points_max.self_fulfillment as maxPoints 
    FROM chapter natural join user_cups natural join points_max
    WHERE user_cups.user_name = userName and chapter.chapter_id <= chapterUserHolds ) as baseTable ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `update_points_max_and_chapter` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `update_points_max_and_chapter`(
IN chapterId INT, IN yourControl INT, IN connectionToYourself INT, 
IN commitmentToSuccess INT, IN selfFulfillment INT,
IN chapterName varchar(100), IN maxVictoryCups INT,
IN automaticWin BOOLEAN
)
BEGIN
 #SET SQL_SAFE_UPDATES=0;
 UPDATE `my_db`.`points_max2`
    SET
    your_control = yourControl,
    connection_to_yourself = connectionToYourself,
    commitment_to_success = commitmentToSuccess,
    self_fulfillment = selfFulfillment
    WHERE chapter_id = chapterId;
    
    
     UPDATE `my_db`.`chapter2`
	SET
	`chapter_name` = chapterName,
	`max_victory_cups` = maxVictoryCups,
	`automatic_win` = automaticWin
	WHERE chapter_id = chapterId;
    
  #   SET SQL_SAFE_UPDATES=1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `update_user_cups` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `update_user_cups`(IN userName varchar(45), IN newCups INT, IN chapterId int, IN chapterOfGoalsOrHabits INT)
BEGIN
SET SQL_SAFE_UPDATES=0;
 UPDATE my_db.user_cups
    SET date_update = CURDATE(), victory_cups_wined = newCups
    WHERE user_name = userName and chapter_id = chapterId
		and exists (select * from chapter where chapter_id = chapterId and max_victory_cups >= newCups and automatic_win = 0 )
		and (
			chapter_id <> chapterOfGoalsOrHabits 
			OR not exists (select * from goals_or_habits where user_name = userName and goals_selected = 1)
			);
    SET SQL_SAFE_UPDATES=1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `update_user_cups_sql` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `update_user_cups_sql`(IN userName varchar(100), IN maxGoals int, IN achivedGoals int  )
BEGIN
set @maxCups = (select max_victory_cups from my_db.chapter where chapter_id = 11);
set @newCups = (achivedGoals/maxGoals)* @maxCups;

	INSERT INTO my_db.user_cups(user_name, date_update, chapter_id, victory_cups_wined)
    values(userName, CURDATE(), 11, @newCups )
    ON DUPLICATE KEY UPDATE date_update=CURDATE(), chapter_id=11, victory_cups_wined=@newCups ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-25 15:34:47

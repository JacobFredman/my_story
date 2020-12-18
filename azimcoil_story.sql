-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 13, 2020 at 05:47 PM
-- Server version: 5.7.32-log
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `azimcoil_story`
--

DELIMITER $$
--
-- Procedures
--
$$

$$

CREATE DEFINER=`azimcoil`@`localhost` PROCEDURE `get_relative_self_control` (IN `userName` VARCHAR(100), OUT `result` DECIMAL)  BEGIN

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
END$$

CREATE DEFINER=`azimcoil`@`localhost` PROCEDURE `get_text_for_self_control` (IN `userName` VARCHAR(100), OUT `aab` DECIMAL, OUT `resultText` VARCHAR(100))  BEGIN
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
END$$

CREATE DEFINER=`azimcoil`@`localhost` PROCEDURE `get_user_self_commitment` (IN `userName` VARCHAR(100), IN `chapterUserHolds` INT)  BEGIN
	/* gets the percent of seccess relative to max points */
	SELECT sum(userPoints)/sum(maxPoints) as commitment_to_success_result
    FROM
    (SELECT (victory_cups_wined/max_victory_cups) * points_max.commitment_to_success as userPoints, points_max.commitment_to_success as maxPoints 
    FROM chapter natural join user_cups natural join points_max
    WHERE user_cups.user_name = userName and chapter.chapter_id <= chapterUserHolds ) as baseTable ;
END$$

CREATE DEFINER=`azimcoil`@`localhost` PROCEDURE `get_user_self_connection` (IN `userName` VARCHAR(100), IN `chapterUserHolds` INT)  BEGIN
	/* gets the percent of seccess relative to max points */
	SELECT sum(userPoints)/sum(maxPoints) as self_connection_result
    FROM
    (SELECT (victory_cups_wined/max_victory_cups) * points_max.connection_to_yourself as userPoints, points_max.connection_to_yourself as maxPoints 
    FROM chapter natural join user_cups natural join points_max
    WHERE user_cups.user_name = userName and chapter.chapter_id <= chapterUserHolds ) as baseTable ;
END$$

CREATE DEFINER=`azimcoil`@`localhost` PROCEDURE `get_user_self_control` (IN `userName` VARCHAR(100), IN `chapterUserHolds` INT)  BEGIN
	/* gets the percent of seccess relative to max points */
	SELECT sum(userPoints)/sum(maxPoints) as your_control_result
    FROM
    (SELECT (victory_cups_wined/max_victory_cups) * points_max.your_control as userPoints, points_max.your_control as maxPoints 
    FROM chapter natural join user_cups natural join points_max
    WHERE user_cups.user_name = userName and chapter.chapter_id <= chapterUserHolds ) as baseTable ;
END$$

CREATE DEFINER=`azimcoil`@`localhost` PROCEDURE `get_user_self_fulfillment` (IN `userName` VARCHAR(100), IN `chapterUserHolds` INT)  BEGIN
	/* gets the percent of seccess relative to max points */
	SELECT sum(userPoints)/sum(maxPoints) as self_fulfillment_result
    FROM
    (SELECT (victory_cups_wined/max_victory_cups) * points_max.self_fulfillment as userPoints, points_max.self_fulfillment as maxPoints 
    FROM chapter natural join user_cups natural join points_max
    WHERE user_cups.user_name = userName and chapter.chapter_id <= chapterUserHolds ) as baseTable ;
END$$

CREATE DEFINER=`azimcoil`@`localhost` PROCEDURE `update_points_max_and_chapter` (IN `chapterId` INT, IN `yourControl` INT, IN `connectionToYourself` INT, IN `commitmentToSuccess` INT, IN `selfFulfillment` INT, IN `chapterName` VARCHAR(100) CHARSET utf8, IN `maxVictoryCups` INT, IN `automaticWin` BOOLEAN)  BEGIN
 #SET SQL_SAFE_UPDATES=0;
 UPDATE points_max
    SET
    your_control = yourControl,
    connection_to_yourself = connectionToYourself,
    commitment_to_success = commitmentToSuccess,
    self_fulfillment = selfFulfillment
    WHERE chapter_id = chapterId;
    
    
     UPDATE chapter
	SET
	`chapter_name` = chapterName,
	`max_victory_cups` = maxVictoryCups,
	`automatic_win` = automaticWin
	WHERE chapter_id = chapterId;
    
  #   SET SQL_SAFE_UPDATES=1;
END$$

CREATE DEFINER=`azimcoil`@`localhost` PROCEDURE `update_user_cups` (IN `userName` VARCHAR(45), IN `newCups` INT, IN `chapterId` INT, IN `chapterOfGoalsOrHabits` INT)  BEGIN
SET SQL_SAFE_UPDATES=0;
 UPDATE user_cups
    SET date_update = CURDATE(), victory_cups_wined = newCups
    WHERE user_name = userName and chapter_id = chapterId
		and exists (select * from chapter where chapter_id = chapterId and max_victory_cups >= newCups and automatic_win = 0 )
		and (
			chapter_id <> chapterOfGoalsOrHabits 
			OR not exists (select * from goals_or_habits where user_name = userName and goals_selected = 1)
			);
    SET SQL_SAFE_UPDATES=1;
END$$

CREATE DEFINER=`azimcoil`@`localhost` PROCEDURE `update_user_cups_sql` (IN `userName` VARCHAR(100), IN `maxGoals` INT, IN `achivedGoals` INT)  BEGIN
set @maxCups = (select max_victory_cups from chapter where chapter_id = 11);
set @newCups = (achivedGoals/maxGoals)* @maxCups;

	INSERT INTO user_cups(user_name, date_update, chapter_id, victory_cups_wined)
    values(userName, CURDATE(), 11, @newCups )
    ON DUPLICATE KEY UPDATE date_update=CURDATE(), chapter_id=11, victory_cups_wined=@newCups ;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `chapter`
--

CREATE TABLE `chapter` (
  `chapter_id` int(11) NOT NULL,
  `chapter_name` varchar(70) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `max_victory_cups` int(11) NOT NULL,
  `automatic_win` tinyint(4) NOT NULL,
  `part_number` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `chapter`
--

INSERT INTO `chapter` (`chapter_id`, `chapter_name`, `max_victory_cups`, `automatic_win`, `part_number`) VALUES
(1, 'מכתב פתיחה', 1, 1, 1),
(2, 'פרק א - סוד האושר', 1, 1, 1),
(3, 'משימת קרמבו - אגף המשימות', 1, 0, 1),
(4, 'פרק ב - האנשים הגדולים', 1, 0, 1),
(5, 'פרק ג - אני טוב', 2, 0, 2),
(6, 'פרק ד - להוקיר את החיים', 2, 0, 2),
(7, '!פרק ה - נעים להכיר', 2, 0, 2),
(8, 'פרק ו - מגשימי החלומות', 2, 1, 3),
(9, 'פרק ז - החופש הגדול', 2, 1, 3),
(10, 'פרק ח - לרוץ עם הרצון', 4, 1, 3),
(11, 'פרק ט - המסלול הבטוח', 14, 0, 3),
(13, 'פרק י - לתת ולצמוח', 2, 0, 3),
(14, 'פרק יא - ההחמצות', 2, 0, 4),
(15, 'פרק יב - מה הם יודעים שאנחנו לא?', 1, 1, 4),
(16, 'פרק יג', 3, 1, 4),
(17, 'פרק יד - הבלו פרינט', 2, 1, 4),
(18, 'פרק טו - למלא את החלל', 5, 0, 4),
(19, 'פרק טז - מדיה הסיפור האמיתי', 2, 0, 4),
(20, 'פרק יז - מישהו לרוץ איתו', 3, 0, 5),
(21, 'פרק יח - טיפים של אלופים', 2, 1, 5),
(22, 'פרק יט - אמא אדמה', 2, 0, 5),
(23, 'פרק כג - יום השחרור', 12, 0, 6),
(24, 'פרק כה - חוזרים לשליטה', 14, 0, 6),
(25, 'פרק כו - אין לי כח', 3, 1, 6),
(26, 'פרק כז - לבחור נכון', 2, 1, 7),
(27, 'פרק כח - מה הסיפור שלי?', 2, 1, 7),
(28, 'פרק כט - תמיד מוכן', 3, 0, 7);

-- --------------------------------------------------------

--
-- Table structure for table `chapter2`
--

CREATE TABLE `chapter2` (
  `chapter_id` int(11) NOT NULL,
  `chapter_name` varchar(70) COLLATE utf8mb4_unicode_ci NOT NULL,
  `max_victory_cups` int(11) NOT NULL,
  `automatic_win` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `chapter2`
--

INSERT INTO `chapter2` (`chapter_id`, `chapter_name`, `max_victory_cups`, `automatic_win`) VALUES
(1, 'מכתב פתיחה', 1, 0),
(2, 'פרק א - סוד האושר', 1, 1),
(3, 'משימת קרמבו', 1, 0),
(4, 'פרק ב - האנשים הגדולים', 1, 0),
(5, 'פרק ג - אני טוב', 7, 0),
(6, 'פרק ד - להוקיר את החיים', 7, 0),
(7, 'פרק ה - נעים להכיר', 7, 0),
(8, 'פרק ו', 5, 1),
(9, 'פרק ז', 4, 1),
(10, 'פרק ח', 12, 1),
(11, 'פרק ט - המסלול הבטוח', 28, 0),
(13, 'פרק י - לתת ולצמוח', 7, 0),
(14, 'פרק יא - החמצות', 7, 0),
(15, 'פרק יב', 2, 1),
(16, 'פרק יג', 5, 1),
(17, 'פרק יח', 4, 1),
(18, 'פרק טו - למלא את החלל', 28, 0),
(19, 'פרק טו - מדיה - הסיפור האמיתי', 14, 0),
(20, 'פרק יז - מישהו לרוץ איתו', 1, 0),
(21, 'פרק יט - אמא אדמה', 1, 0),
(22, 'פרק כג - יום השחרור', 42, 0),
(23, 'פרק כה - חוזרים לשליטה', 28, 0),
(24, 'פרק כו - אין לי כח', 6, 1),
(25, 'פרק כז - לבחור נכון', 5, 1),
(26, 'פרק כח - הסטורי', 3, 1),
(27, 'פרק כט - תמיד מוכן', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `feedbacktext`
--

CREATE TABLE `feedbacktext` (
  `under_or_equal_seccess_percent` decimal(4,2) NOT NULL,
  `your_control` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection_to_yourself` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `commitment_to_success` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `self_fulfillment` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='	';

--
-- Dumping data for table `feedbacktext`
--

INSERT INTO `feedbacktext` (`under_or_equal_seccess_percent`, `your_control`, `connection_to_yourself`, `commitment_to_success`, `self_fulfillment`) VALUES
(-2.00, 'היכולת שלך לנהל את חייך כרצונך בלי להיסחף אחרי הסחות ומסכים', 'היכולת שלך להיות נאמן לעולם הפנימי שלך וקשוב אליו', 'היכולת שלך להתקדם בהתמדה וללא ויתורים אל היעדים שלך', 'היכולת שלך להוציא אל הפועל את כל האיכויות והכישרונות הגלומים בך'),
(-1.00, 'שליטה עצמית', 'חיבור לעצמך', 'מחויבות להצלחה', 'מימוש עצמי'),
(49.99, 'אתה נוטה להיסחף אחרי רצונות וחשקים חולפים בחייך. נסה לעמוד מולם, ללכת עם השאיפות האמיתיות שלך ולהגשים חלומות לטווח ארוך.$\r\nייתכן שהסחות דעת רבות מפריעות לך להיות ממוקד במטרותיך. ספקיות מדיה, כמו נטפליקס ואינסטגרם, מצליחות לשדוד ממך זמן יקר.$ \r\nאין הרגשה נפלאה כהרגשת החירות. כדאי לך להתאמץ למענה!$\r\nנסה להימנע מפיזור ומזמינות סלולרית גבוהה. נסה להיות נוכח יותר כאן ועכשיו. מה הדברים שבאמת נכונים לך כרגע?$\r\nאתה לא נותן לייאוש להפיל את העמידה שלך. אתה משתדל להתקדם תמיד. בחרת לא להיות קורבן של נסיבות חייך – אתה נלחם כדי לשנות!$\r\n', 'אתה מודע לאתגרים ולכאבים שבחייך ויש לך רצון למצוא כיוון ודרך.$\r\nנסה להכיר יותר את עצמך ואת הטוב שבך – זו הדרך לאושר אמיתי.$\r\nעליך להוקיר יותר ולהעריך את המתנות הקטנות והגדולות שבחייך. הודה עליהן בכל הזדמנות שיש לך!$ \r\nעדיין לא התחברת למשאבים הפנימיים שלך. החיבור הזה דומה לחיבור לתחנת כוח אדירה, המספקת ביטחון, מוטיבציה ותנועה חיה, שמחה ומתמדת.$ \r\nככל שתבנה לעצמך זהות, חלומות ושאיפות משלך, כך תדע להצביע באופן ברור יותר על התכונות ועל ההרגלים שנכון שיהיו חלק מאישיותך ועל אלה שהיית שמח להיפרד מהם.$  \r\nאתה מבין מה אתה באמת מחפש בעולם. הצורך העמוק שלך בשייכות, בהערכה, במשמעות ובמימוש עצמי התברר לך.$\r\nאתה עדיין חושש מה\'לבד\' הזה, רק עם עצמך. נסה להתנתק לעיתים מכל המסכים וההסחות, ותגלה עולם פנימי עשיר שמחכה לך.$\r\nפעמים רבות מעידות נובעות מחוסר חיבור לעצמך, לתחושותיך ולמה שעובר עליך. ככל שתהיה קשוב יותר לרגשותיך ולתחושותיך, כך ההתמודדות תהיה קלה יותר.$ \r\nהשתדל להיות נאמן לרצונות האמיתיים שלך ולדייק את הבחירות שלך.$ \r\n\r\nהמשך לבנות מבט נכון ובריא על זוגיות ועל המין השני.$ \r\nהמשך לעבוד על ניתוב ואיסוף הכוח המיני לביטוי הנכון שלו ביצירה ובהשפעה, ולייעד אותו לקשר זוגי אמיתי, בריא ומשפחתי.$ \r\nאתה מתחבר יותר ויותר לייחודיות שלך ולהבנה שיש לך תפקיד בלעדי בעולם. ככל שתפתח יותר את אישיותך, כך תחושות ערך וסיפוק ימלאו את חייך.$\r\n', 'אם תתמיד יותר ותסכים לשלם מחירים – תפגוש הרבה יותר הצלחות בחייך, בלימודים, במשפחה ובעבודה.$ \r\nאתה לומד להתגבר על מכשולים בדרך לחלומות שלך. השתדל להציב מטרות ולהפוך אותן ליעד מוחלט. זו הדרך להגיע אליהן.$\r\nעליך לנסות להשתמש יותר בתנאים שיש סביבך כדי לצמוח. אל תתבייש לקבל עזרה.$\r\nעבודה מסודרת של מעקב וזיהוי הגורמים המעכבים אותך יכולה לעזור לך מאוד.$ \r\nהשתדל להגיע מוכן לכל אתגר ומשימה, עם תוכנית פעולה מסודרת, לפי האישיות והדרך שבנית לעצמך.$\r\n', '\r\nככל שתצליח להציב לעצמך יעדים אישיים המתאימים לכישרונות שלך ולתחומים שאליהם אתה מתחבר, כך תחוש סיפוק רב יותר.$\r\nהחלומות שלך כרגע מתבשלים בבטן. נסה להגשים אותם בזה אחר זה, באופן מסודר. זו הדרך אל האושר שלך.$\r\nכשתצליח לשפר את מצב הסחות דעת שאתה חווה בחייך יצאו ממך כוחות אדירים שלא חלמת שיש לך!$ \r\nכדאי לנסות להפחית הסחות, כמו להניח את הטלפון מחוץ לחדר בזמן למידה או יצירה.$ \r\nאתה לומד להשתמש במדיה כדי להביא בעזרתה כישרונות, תכונות, רעיונות ומיזמים שלך לידי ביטוי.$\r\nנסה להשתמש בכלי המדיה כדי להוציא אל הפועל את היכולות המיוחדות שלך.  אל תיתן להם לטשטש את הגוון המיוחד שיש לך להביא לעולם. חשוֹב עצמאי, מקורי ויצירתי והשתדל להיות נאמן לערכיך ולדעותיך.$\r\nככל שתעמיק ותלמד מה הם הדברים החשובים לך באמת, מהו המצפן הפנימי שלך, כך תצליח לכוון את חייך לעבר החלטות מספקות ובוגרות, שיכניסו להם עומק ואנרגיה.$ \r\n'),
(69.99, 'אתה משתדל לתת לרצונות האמיתיים שלך להוביל ואתה לא נסחף אחרי ה\'בא לי\'. אתה לומד להשתחרר מהסחות דעת ולהשתמש נכון יותר במשאבי הזמן והיכולת שלך. $ \r\nנסה להימנע מפיזור ומזמינות סלולרית גבוהה. נסה להיות נוכח יותר כאן ועכשיו. מה הדברים שבאמת נכונים לך כרגע?$  \r\nאתה בצמיחה! המדיה היא כלי להתקדמות ולהתייעלות בחייך.$\r\nתחושות של חוסר נוחות לא מוציאות אותך מאיזון, אתה יודע לעבוד איתן. \r\nאתה משתדל להילחם במה שמשעבד אותך ולהשתחרר ממנו. \r\nעוד קצת מאמץ ואתה מצליח לצאת לחופשי.$\r\n\r\n', 'בתוכך יש אוצר של יופי ואתה יודע את זה! \r\nאתה מתקדם בזיהוי התכונות הטובות הקיימות בך.$ \r\nאתה מודע לאתגרים ולכאבים שבחייך ויש לך רצון למצוא כיוון ודרך.$\r\nמגלישת גלים ועד לימודי רפואה – אתה מתאהב בחלומות שלך ולומד לתת להם מקום. מתפתחת אצלך התשוקה שחלומותיך יתגשמו.$\r\nלאט־לאט אתה בונה זהות ברורה ויציבה. אתה יודע להצביע על התכונות ועל ההרגלים שנכון שיהיו חלק מאישיותך ועל אלה שמהם היית שמח להיפרד.$  \r\nאתה מבין מה אתה באמת מחפש בעולם. הצורך העמוק שלך בשייכות, בהערכה, במשמעות ובמימוש עצמי מתברר לך.$\r\nאתה נעשה קשוב לרגשות, לצרכים ולקשיים שלך. אתה פחות ציני ויותר ישיר עם עצמך.$ \r\nעדיין קשה לך ברגעים של \'לבד\' עם עצמך. נסה להתנתק לפעמים מכל המסכים וההסחות ותגלה עולם פנימי עשיר שמחכה לך.$\r\nאתה מתקדם. מיום ליום אתה נאמן יותר לרצונות האמיתיים שלך ומדייק את הבחירות שלך.$ \r\nמתפתח אצלך מבט נכון ובריא על זוגיות ועל המין השני. אתה לומד לנתב ולאסוף את הכוח המיני לביטוי הנכון שלו ביצירה ובהשפעה ומייעד אותו לקשר זוגי אמיתי, בריא ומשפחתי.$ \r\nמעידות נובעות פעמים רבות ממיעוט הקשבה לתחושותיך ולמה שעובר עליך. ככל  שתהיה קשוב יותר לרגשותיך ולתחושותיך, כך ההתמודדות תהיה קלה יותר.$ \r\nאתה מתחבר עוד ועוד לייחודיות שלך ומכיר את הערך ואת התפקיד הבלעדי שלך בעולם.$ \r\n', 'אתה משתדל להתמיד בדרך אל ההצלחה. כוח הרצון שלך מתחזק מיום ליום!$ \r\nאתה לומד להתגבר על מכשולים בדרך לחלומות שלך. אתה מציב מטרות ופועל כדי להשיג אותן. אתה עוד תגיע אליהן.$\r\nאתה עומד מול אתגרי חייך בגבורה. אתה לומד להתחייב ולא לפחד מטעויות.$ \r\nעבודה מסודרת של מעקב וזיהוי הגורמים המעכבים אותך יכולה לעזור לך מאוד.$ \r\nנסה להשקיע יותר בטיפול בקשיים ובהרגלים שליליים, ומכל מעידה תסיק מסקנות לשיפור להמשך.$ \r\nאתה משתדל להשתמש בתנאים שיש סביבך כדי לגדול. את יודע לקבל עזרה כשצריך.$ \r\nאתה מתקדם מאוד בעמידה מול הקשיים והחולשות שלך. אתה פועל יום־יום בהתמדה כדי להיפרד מהרגלים שליליים הפוגעים באיכות חייך.$ \r\nהגורמים המפריעים לך לצמוח לא מייאשים אותך.$ \r\nהשתדל להתייצב לפני האתגרים והמשימות שלך עם תוכנית פעולה מסודרת, ', '\r\nאתה לומד להכיר את האיכויות המיוחדות שלך ואתה עושה המון כדי לפתח אותן ולתת להן ביטוי בכל ממד בחייך.$  \r\nהיום־יום שלך הולך ומתמלא במשמעות. השתדל לתת מעצמך יותר לסובבים אותך – זו הדרך לצמוח.$\r\nאתה בתהליך שגורם לך להיות בריא יותר ושמח יותר. הקשרים החברתיים שלך מתפתחים ונעים יותר להיות בסביבתך. אתה אוהב את הסביבה יותר, אתה חי בעולם טוב יותר.$ \r\nאתה מאמץ הרגלי שימוש נכונים בכלי המדיה. אתה מביא בעזרתם כישרונות, תכונות, רעיונות ומיזמים שלך לידי ביטוי.$\r\nאל תיתן למדיה לטשטש את הגוון המיוחד שיש לך להביא לעולם. חשוֹב עצמאי, מקורי ויצירתי והשתדל להיות נאמן לערכיך ולדעותיך.$\r\nאתה לומד לכתוב את סיפור חייך בהתאמה לאיכויות, לתכונות ולכישרונות המיוחדים לך.$\r\nאתה רוכש כלים להגיע להחלטות בחיים בצורה שקולה, רצינית ונבונה, על פי שאיפותיך וייעודך ולפי המצפן הפנימי שלך.$  \r\n'),
(99.99, 'כמו טייס קרב מיומן ומנוסה – אתה בשליטה! $\r\nיש לך יכולת לזהות דחפים חולפים ורצונות עמוקים ולהבדיל ביניהם, כמו גם בין עיקר ובין טפל. אתה לא נותן לחשקים הקטנים של \'בא לי\' להשתלט עליך.$\r\nאתה יותר ממוקד, יותר חופשי. יכולת השליטה במחשבות, במשאבים ובזמן שלך גדולה. אתה לא תלוי בגירויים חיצוניים. אתה מסוגל להתנתק בשביל לפגוש את עצמך.$ \r\nאתה לא נותן להתראות שקופצות באינסטגרם ובווצאפ לסחרר אותך. אתה משתחרר יותר ויותר מהסחות דעת ומסוגל לעסוק בדברים שחשובים לך באמת.$ \r\nלמדת להציב לעצמך גבולות כדי לבנות את המקום הפנימי שלך, אתה מפתח יכולת של דחיית סיפוקים ואיפוק.$ \r\n\r\nאתה בצמיחה! המדיה עבורך היא כלי להתקדמות ולהתייעלות בחיים, ולא גורם מרכזי לפיזור ולבזבוז של זמן יקר.$ \r\n\r\nאתה לא נותן לייאוש למוטט את העמידה שלך – אתה משתדל להתקדם תמיד. בחרת לא להיות קורבן לנסיבות החיים.$\r\nאתה מנהיג שינוי מבורך בחייך!$\r\n\r\n', 'בתוכך יש אוצר של יופי ואתה יודע את זה! \r\nאתה מצליח לזהות את התכונות הטובות הקיימות בך.$ \r\nמגלישת גלים ועד לימודי רפואה - אתה מתאהב בחלומות שלך. למדת לתת להם מקום ויש לך תשוקה עזה להגשים אותם.$\r\nאתה בונה זהות ברורה ויציבה. אתה יודע להצביע באופן ברור על התכונות ועל ההרגלים שנכון שיהיו חלק מאישיותך, ועל אלה שמהם היית שמח להיפרד.$  \r\nאתה מבין מה אתה באמת מחפש בעולם. הצורך העמוק שלך בשייכות, בהערכה, במשמעות ובמימוש עצמי התברר לך.$\r\nלמדת להבין מה הכאבים וחוסר הנוחות בחייך מספרים לך. אתה מזהה את הצרכים שלך, מכיר בהם ויודע לתת להם מענה משמעותי ועמוק.$ \r\nאתה מבין מה מניע אותך רגשית, מה משפיע עליך ואיך אפשר להתמודד, לתעל ולמנף את רגשות. אתה חווה חיבור בין הגוף לנפש ומבין את ההשפעה ההדדית בין תחושותיך וצורכי גופך.$  \r\nיש לך מבט נכון ובריא על זוגיות ועל המין השני. אתה מצליח לנתב ולאסוף את הכוח המיני לביטוי הנכון שלו ביצירה ובהשפעה ומייעד אותו לקשר זוגי אמיתי, בריא ומשפחתי.$ \r\nאתה מחובר לייחודיות שלך.$ \r\nאתה מבין את הערך ואת התפקיד הבלעדי שלך בעולם.$ \r\n', 'יש לך סטנדרטים גבוהים. גם אם יהיה קשה להשיג את התואר הראשון בהנדסת חשמל אתה מוכן להתמיד, לשלם מחירים ולהשקיע בדרך להצלחה.$ \r\nאתה יודע להתגבר על מכשולים בדרך לחלומות שלך. אתה מציב מטרות והופך אותן ליעד מוחלט. אתה עוד תגיע אליהן.$\r\nאתה עומד מול אתגרי חייך בגבורה. אתה לא חושש להתחייב ולא מפחד לטעות וללמוד. אתה מטפל בבעיות ולא בורח מהן.$ \r\nאתה משתמש בכל התנאים שיש סביבך כדי לגדול. אתה לא מפחד מפדיחות או מעבודה קשה בדרך ליעדים. אתה יודע לקבל עזרה כשצריך.$ \r\nאתה מוכן לעמוד מול הקשיים והחולשות שלך. אתה פועל יום־יום בהתמדה כדי להיפרד מהרגלים שליליים הפוגעים באיכות חייך.$  \r\nקשה לתפוס אותך לא מוכן. יש לך תוכנית פעולה מסודרת לכל אתגר ומשימה, לפי האישיות והדרך שבנית לעצמך.$ \r\n', 'אתה מכיר את האיכויות המיוחדות שלך, ואתה עושה המון כדי לפתח אותן ולתת להן ביטוי בכל ממד בחייך.$  \r\nהיום־יום שלך מלא במשמעות. אתה נותן מעצמך לסביבה והסביבה מקבלת ממך. אתה בצמיחה!$ \r\nאתה בריא יותר, שמח יותר, מסופק. הקשרים החברתיים שלך מתפתחים. נעים להיות בסביבתך. אתה אוהב את הסביבה יותר, אתה חי בעולם טוב יותר.$ \r\nאתה משתמש בכל הכלים שיש למדיה להציע כדי להוציא אל הפועל את היכולות המיוחדות שלך. בעזרתה אתה מביא כישרונות, תכונות, רעיונות, ומיזמים שלך לרמה הרבה יותר משוכללת ומגיע להרבה יותר אנשים. אתה מנצל כל הזדמנות כדי לצמוח.$ \r\nאתה לא נותן למדיה לטשטש את הגוון המיוחד שיש לך להביא לעולם.$\r\nאתה נאמן לסטורי הפנימי שלך. אתה כותב את סיפור חייך בהתאמה לאיכויות, לתכונות ולכישרונות המיוחדים לך.$\r\nאתה מקבל החלטות בחיים בצורה שקולה, רצינית ונבונה, על פי שאיפותיך וייעודך ולפי המצפן הפנימי שלך. $ \r\n');

-- --------------------------------------------------------

--
-- Table structure for table `goals_or_habits`
--

CREATE TABLE `goals_or_habits` (
  `user_name` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `goals_selected` tinyint(4) NOT NULL,
  `max_goals` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `goals_or_habits`
--

INSERT INTO `goals_or_habits` (`user_name`, `goals_selected`, `max_goals`) VALUES
('aaa', 0, 0),
('binyamin', 0, 5),
('bLop43H3t3WJLPXxjhm3txCFDEk1', 1, 3),
('C3zACYtRllfXSloQ5EEw7hkUmP43', 0, 0),
('KuucVlgFT3frBoAY8UDGXjOAPWK2', 0, 0),
('M3TvJ6pDJRYk71AYds3llBoHjWG2', 0, 0),
('qwlMwdfpSlYHO4ayO65YruvsioW2', 1, 5),
('r5nzd3WDpDV9ZFBWewZj6pWRA2g1', 0, 10),
('SSGMwIZ3xKOVkrOJmoDAJEe9o0W2', 0, 9),
('WcnUgxlCFlSs4KH0wmVzstCtFGq1', 1, 20),
('yjKr0gG1gZaQdVHcWEygMo5beZn2', 1, 6);

-- --------------------------------------------------------

--
-- Table structure for table `points_max`
--

CREATE TABLE `points_max` (
  `chapter_id` int(11) NOT NULL,
  `your_control` decimal(3,2) NOT NULL,
  `connection_to_yourself` decimal(3,2) NOT NULL,
  `commitment_to_success` decimal(3,2) NOT NULL,
  `self_fulfillment` decimal(3,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `points_max`
--

INSERT INTO `points_max` (`chapter_id`, `your_control`, `connection_to_yourself`, `commitment_to_success`, `self_fulfillment`) VALUES
(1, 0.00, 1.00, 0.00, 0.00),
(2, 0.00, 1.00, 0.00, 0.00),
(3, 0.00, 0.00, 1.00, 0.00),
(4, 0.00, 0.00, 1.00, 0.00),
(5, 0.00, 1.00, 1.00, 0.00),
(6, 0.00, 1.00, 1.00, 0.00),
(7, 0.00, 1.00, 0.50, 0.50),
(8, 0.00, 1.00, 1.00, 0.00),
(9, 2.00, 0.00, 0.00, 0.00),
(10, 1.00, 3.00, 0.00, 0.00),
(11, 2.00, 2.00, 5.00, 5.00),
(13, 0.00, 0.00, 0.50, 1.50),
(14, 0.75, 0.75, 0.50, 0.00),
(15, 0.50, 0.50, 0.00, 0.00),
(16, 1.20, 1.20, 0.00, 0.60),
(17, 2.00, 1.00, 0.00, 0.00),
(18, 2.80, 1.00, 1.00, 0.20),
(19, 0.90, 0.00, 0.20, 0.90),
(20, 0.00, 0.00, 3.00, 0.00),
(21, 0.00, 0.00, 2.00, 0.00),
(22, 1.00, 1.00, 0.00, 0.00),
(23, 3.00, 3.00, 3.00, 0.00),
(24, 7.00, 2.00, 5.00, 0.00),
(25, 1.00, 0.00, 2.00, 0.00),
(26, 1.00, 1.00, 0.00, 0.00),
(27, 0.00, 2.00, 0.00, 0.00),
(28, 0.00, 1.20, 0.60, 1.20);

-- --------------------------------------------------------

--
-- Table structure for table `points_max2`
--

CREATE TABLE `points_max2` (
  `chapter_id` int(11) NOT NULL,
  `your_control` int(11) NOT NULL,
  `connection_to_yourself` int(11) NOT NULL,
  `commitment_to_success` int(11) NOT NULL,
  `self_fulfillment` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `points_max2`
--

INSERT INTO `points_max2` (`chapter_id`, `your_control`, `connection_to_yourself`, `commitment_to_success`, `self_fulfillment`) VALUES
(1, 0, 1, 0, 0),
(2, 0, 1, 0, 0),
(3, 0, 0, 1, 0),
(4, 0, 0, 1, 0),
(5, 0, 4, 3, 0),
(6, 0, 4, 3, 0),
(7, 0, 4, 2, 3),
(8, 0, 2, 3, 0),
(9, 4, 0, 0, 0),
(10, 4, 8, 0, 0),
(11, 4, 4, 10, 10),
(12, 4, 4, 10, 10),
(13, 0, 0, 2, 5),
(14, 3, 3, 1, 0),
(15, 1, 1, 0, 0),
(16, 2, 2, 0, 1),
(17, 0, 0, 4, 0),
(18, 14, 6, 8, 4),
(19, 6, 0, 2, 6),
(20, 0, 0, 10, 0),
(21, 2, 4, 0, 0),
(22, 14, 14, 14, 0),
(23, 14, 4, 10, 0),
(24, 2, 0, 4, 0),
(25, 3, 2, 0, 0),
(26, 0, 3, 0, 0),
(27, 0, 2, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `setting`
--

CREATE TABLE `setting` (
  `key` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `explanation` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `setting`
--

INSERT INTO `setting` (`key`, `explanation`, `value`) VALUES
('email_sender', 'כתובת אימייל שממנה נשלח הודעות אוטומטיות', 'lokchimAchraiut.noReplay@gmail.com'),
('email_sender_password', 'סיסמת אימייל שממנה נשלחים הודעות אוטומטיות', 'israelOnly'),
('reciver_email_address', 'כתובת אימייל שאליה ישלחו הודעות ממשתמשים', 'jacov141@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_name` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_admin` tinyint(4) NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `date_of_registering` date DEFAULT NULL,
  `filled_feedback` tinyint(4) DEFAULT NULL,
  `user_first_name` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_last_name` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_name`, `password`, `is_admin`, `date_of_birth`, `date_of_registering`, `filled_feedback`, `user_first_name`, `user_last_name`) VALUES
('', NULL, 0, NULL, '2020-06-27', 0, 'jac', 'fredman'),
('07X2IvRnJvUc13UpOyyfqpNCc5i2', NULL, 0, NULL, '2020-06-30', 0, NULL, NULL),
('3aOlSXf9dPNnmYfz9FQ1hluo6oa2', NULL, 0, NULL, '2020-07-01', 0, '????', '?????'),
('8zaEfixn37W7s9RSVDbPWnhne7E3', NULL, 0, NULL, '2020-06-28', 0, '????', '?????'),
('aaa', '102030', 0, NULL, NULL, NULL, NULL, NULL),
('B2QbKOJnPsSyi1liIgpimwQcp5Q2', NULL, 0, NULL, '2020-07-01', 0, '????', '???'),
('bbb', '102030', 0, NULL, NULL, NULL, NULL, NULL),
('binyamin', '1234', 0, '2010-10-10', NULL, NULL, NULL, NULL),
('bLop43H3t3WJLPXxjhm3txCFDEk1', NULL, 0, NULL, '2020-07-05', 0, NULL, NULL),
('BX2AOVygt4hEIyIrStgjotayYdB3', NULL, 0, NULL, '2020-06-27', 0, 'יעקב', 'פרדמן'),
('C3zACYtRllfXSloQ5EEw7hkUmP43', NULL, 0, NULL, '2020-12-08', 0, '????', '?'),
('ccc', '102030', 0, NULL, NULL, NULL, NULL, NULL),
('cOJBiGjcxQQb7czdLcTzFLcwupQ2', NULL, 1, NULL, '2020-06-30', 0, '?', '?'),
('fExWdYVbMXYpvZJLPjVyOetzle82', NULL, 0, NULL, '2020-12-08', 0, '????', '?????'),
('fPdKgkUnIGSGVvrm6PeI8amS7Y82', NULL, 0, NULL, '2020-06-27', 0, '????', '?????'),
('HgHcfuhhekZvbGohwxxhhmp4Dgu1', NULL, 0, NULL, '2020-06-30', 0, '?????????', '?????'),
('htOUg2fh8lW4XmRb5GY2E93qvHn2', NULL, 0, NULL, '2020-11-30', 0, '????', 'p'),
('i3Z9YvozRXewyinzZGLdLYdjXUJ3', NULL, 0, NULL, '2020-07-01', 0, '?', 'p'),
('ielCI1jhFid7Xwk5T7q0dsUVGK12', NULL, 0, NULL, '2020-08-05', 0, NULL, NULL),
('jac', '102030', 0, '1985-12-29', NULL, NULL, NULL, NULL),
('KuucVlgFT3frBoAY8UDGXjOAPWK2', NULL, 0, NULL, '2020-07-09', 0, NULL, NULL),
('LIRk9WxpDsTbhsFcHFbcSsgZca42', NULL, 0, NULL, '2020-10-12', 0, NULL, NULL),
('M3TvJ6pDJRYk71AYds3llBoHjWG2', NULL, 0, NULL, '2020-07-02', 0, '???? ', '???????'),
('qOQkOu6kwcQIGQ8GdiYpPCNSn6l1', NULL, 0, NULL, '2020-07-02', 0, NULL, NULL),
('qwlMwdfpSlYHO4ayO65YruvsioW2', NULL, 0, NULL, '2020-10-01', 0, NULL, NULL),
('R1Rzicm3iSR4EWqJ8AweoADEEPU2', NULL, 0, NULL, '2020-12-01', 0, '????', '?????111'),
('r5nzd3WDpDV9ZFBWewZj6pWRA2g1', NULL, 0, NULL, '2020-07-03', 0, NULL, NULL),
('rAyRVlNoyqOa7wGhdSv4czARqOb2', NULL, 0, NULL, '2020-06-30', 0, NULL, NULL),
('S3GsuN6sgrNSq24j7OMzgsSiY5h1', NULL, 0, NULL, '2020-06-27', 0, 'jac', 'fredman'),
('SSGMwIZ3xKOVkrOJmoDAJEe9o0W2', NULL, 1, NULL, '2020-06-28', 0, '?', '?'),
('UOktAX3U2dXLrl3YTNoX45jw3Ib2', NULL, 0, NULL, '2020-07-02', 0, '????', '???'),
('WcnUgxlCFlSs4KH0wmVzstCtFGq1', NULL, 0, NULL, '2020-07-25', 0, NULL, NULL),
('xDwOqPCTV3WSdq7atK8bVuVmJfD3', NULL, 0, NULL, '2020-07-19', 0, NULL, NULL),
('xTkSLi25eQTdvHc8ZKQ2Z9zF31n2', NULL, 0, NULL, '2020-08-05', 0, NULL, NULL),
('Y4xU7AUblHhmTUVo5gHrjEaHsmF2', NULL, 0, NULL, '2020-07-06', 0, NULL, NULL),
('yjKr0gG1gZaQdVHcWEygMo5beZn2', NULL, 0, NULL, '2020-07-02', 0, '?????', '???'),
('ZIZVrXyTx8hwfvdTFAkrVCNpdYD2', NULL, 0, NULL, '2020-06-30', 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_cups`
--

CREATE TABLE `user_cups` (
  `user_name` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_update` date NOT NULL,
  `chapter_id` int(11) NOT NULL,
  `victory_cups_wined` int(11) DEFAULT NULL,
  `is_readed` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_cups`
--

INSERT INTO `user_cups` (`user_name`, `date_update`, `chapter_id`, `victory_cups_wined`, `is_readed`) VALUES
('07X2IvRnJvUc13UpOyyfqpNCc5i2', '2020-08-05', 1, 4, 0),
('07X2IvRnJvUc13UpOyyfqpNCc5i2', '2020-06-30', 2, 1, 0),
('07X2IvRnJvUc13UpOyyfqpNCc5i2', '2020-06-30', 3, 0, 0),
('07X2IvRnJvUc13UpOyyfqpNCc5i2', '2020-07-03', 4, 0, 0),
('07X2IvRnJvUc13UpOyyfqpNCc5i2', '2020-08-07', 5, 3, 0),
('07X2IvRnJvUc13UpOyyfqpNCc5i2', '2020-08-07', 6, 5, 0),
('07X2IvRnJvUc13UpOyyfqpNCc5i2', '2020-07-03', 7, 7, 0),
('07X2IvRnJvUc13UpOyyfqpNCc5i2', '2020-06-30', 8, 5, 0),
('07X2IvRnJvUc13UpOyyfqpNCc5i2', '2020-06-30', 9, 4, 0),
('07X2IvRnJvUc13UpOyyfqpNCc5i2', '2020-06-30', 10, 12, 0),
('07X2IvRnJvUc13UpOyyfqpNCc5i2', '2020-07-03', 11, 19, 0),
('07X2IvRnJvUc13UpOyyfqpNCc5i2', '2020-06-30', 13, 0, 0),
('07X2IvRnJvUc13UpOyyfqpNCc5i2', '2020-06-30', 14, 0, 0),
('07X2IvRnJvUc13UpOyyfqpNCc5i2', '2020-06-30', 15, 2, 0),
('07X2IvRnJvUc13UpOyyfqpNCc5i2', '2020-06-30', 16, 5, 0),
('07X2IvRnJvUc13UpOyyfqpNCc5i2', '2020-06-30', 17, 4, 0),
('07X2IvRnJvUc13UpOyyfqpNCc5i2', '2020-08-05', 18, 21, 0),
('07X2IvRnJvUc13UpOyyfqpNCc5i2', '2020-08-05', 19, 12, 0),
('07X2IvRnJvUc13UpOyyfqpNCc5i2', '2020-06-30', 20, 0, 0),
('07X2IvRnJvUc13UpOyyfqpNCc5i2', '2020-06-30', 21, 0, 0),
('07X2IvRnJvUc13UpOyyfqpNCc5i2', '2020-08-05', 22, 12, 0),
('07X2IvRnJvUc13UpOyyfqpNCc5i2', '2020-08-05', 23, 20, 0),
('07X2IvRnJvUc13UpOyyfqpNCc5i2', '2020-06-30', 24, 6, 0),
('07X2IvRnJvUc13UpOyyfqpNCc5i2', '2020-06-30', 25, 5, 0),
('07X2IvRnJvUc13UpOyyfqpNCc5i2', '2020-06-30', 26, 3, 0),
('07X2IvRnJvUc13UpOyyfqpNCc5i2', '2020-06-30', 27, 0, 0),
('3aOlSXf9dPNnmYfz9FQ1hluo6oa2', '2020-07-01', 1, 0, 0),
('3aOlSXf9dPNnmYfz9FQ1hluo6oa2', '2020-07-01', 2, 1, 0),
('3aOlSXf9dPNnmYfz9FQ1hluo6oa2', '2020-07-01', 3, 0, 0),
('3aOlSXf9dPNnmYfz9FQ1hluo6oa2', '2020-07-01', 4, 0, 0),
('3aOlSXf9dPNnmYfz9FQ1hluo6oa2', '2020-07-01', 5, 0, 0),
('3aOlSXf9dPNnmYfz9FQ1hluo6oa2', '2020-07-01', 6, 0, 0),
('3aOlSXf9dPNnmYfz9FQ1hluo6oa2', '2020-07-01', 7, 0, 0),
('3aOlSXf9dPNnmYfz9FQ1hluo6oa2', '2020-07-01', 8, 5, 0),
('3aOlSXf9dPNnmYfz9FQ1hluo6oa2', '2020-07-01', 9, 4, 0),
('3aOlSXf9dPNnmYfz9FQ1hluo6oa2', '2020-07-01', 10, 12, 0),
('3aOlSXf9dPNnmYfz9FQ1hluo6oa2', '2020-07-01', 11, 0, 0),
('3aOlSXf9dPNnmYfz9FQ1hluo6oa2', '2020-07-01', 13, 0, 0),
('3aOlSXf9dPNnmYfz9FQ1hluo6oa2', '2020-07-01', 14, 0, 0),
('3aOlSXf9dPNnmYfz9FQ1hluo6oa2', '2020-07-01', 15, 2, 0),
('3aOlSXf9dPNnmYfz9FQ1hluo6oa2', '2020-07-01', 16, 5, 0),
('3aOlSXf9dPNnmYfz9FQ1hluo6oa2', '2020-07-01', 17, 4, 0),
('3aOlSXf9dPNnmYfz9FQ1hluo6oa2', '2020-07-01', 18, 0, 0),
('3aOlSXf9dPNnmYfz9FQ1hluo6oa2', '2020-07-01', 19, 0, 0),
('3aOlSXf9dPNnmYfz9FQ1hluo6oa2', '2020-07-01', 20, 0, 0),
('3aOlSXf9dPNnmYfz9FQ1hluo6oa2', '2020-07-01', 21, 0, 0),
('3aOlSXf9dPNnmYfz9FQ1hluo6oa2', '2020-07-01', 22, 0, 0),
('3aOlSXf9dPNnmYfz9FQ1hluo6oa2', '2020-07-01', 23, 0, 0),
('3aOlSXf9dPNnmYfz9FQ1hluo6oa2', '2020-07-01', 24, 6, 0),
('3aOlSXf9dPNnmYfz9FQ1hluo6oa2', '2020-07-01', 25, 5, 0),
('3aOlSXf9dPNnmYfz9FQ1hluo6oa2', '2020-07-01', 26, 3, 0),
('3aOlSXf9dPNnmYfz9FQ1hluo6oa2', '2020-07-01', 27, 0, 0),
('8zaEfixn37W7s9RSVDbPWnhne7E3', '2020-06-28', 1, 0, 0),
('8zaEfixn37W7s9RSVDbPWnhne7E3', '2020-06-28', 2, 1, 0),
('8zaEfixn37W7s9RSVDbPWnhne7E3', '2020-06-28', 3, 0, 0),
('8zaEfixn37W7s9RSVDbPWnhne7E3', '2020-06-28', 4, 0, 0),
('8zaEfixn37W7s9RSVDbPWnhne7E3', '2020-06-28', 5, 0, 0),
('8zaEfixn37W7s9RSVDbPWnhne7E3', '2020-06-28', 6, 0, 0),
('8zaEfixn37W7s9RSVDbPWnhne7E3', '2020-06-28', 7, 0, 0),
('8zaEfixn37W7s9RSVDbPWnhne7E3', '2020-06-28', 8, 5, 0),
('8zaEfixn37W7s9RSVDbPWnhne7E3', '2020-06-28', 9, 4, 0),
('8zaEfixn37W7s9RSVDbPWnhne7E3', '2020-06-28', 10, 12, 0),
('8zaEfixn37W7s9RSVDbPWnhne7E3', '2020-06-28', 11, 0, 0),
('8zaEfixn37W7s9RSVDbPWnhne7E3', '2020-06-28', 13, 0, 0),
('8zaEfixn37W7s9RSVDbPWnhne7E3', '2020-06-28', 14, 0, 0),
('8zaEfixn37W7s9RSVDbPWnhne7E3', '2020-06-28', 15, 2, 0),
('8zaEfixn37W7s9RSVDbPWnhne7E3', '2020-06-28', 16, 5, 0),
('8zaEfixn37W7s9RSVDbPWnhne7E3', '2020-06-28', 17, 4, 0),
('8zaEfixn37W7s9RSVDbPWnhne7E3', '2020-06-28', 18, 0, 0),
('8zaEfixn37W7s9RSVDbPWnhne7E3', '2020-06-28', 19, 0, 0),
('8zaEfixn37W7s9RSVDbPWnhne7E3', '2020-06-28', 20, 0, 0),
('8zaEfixn37W7s9RSVDbPWnhne7E3', '2020-06-28', 21, 0, 0),
('8zaEfixn37W7s9RSVDbPWnhne7E3', '2020-06-28', 22, 0, 0),
('8zaEfixn37W7s9RSVDbPWnhne7E3', '2020-06-28', 23, 0, 0),
('8zaEfixn37W7s9RSVDbPWnhne7E3', '2020-06-28', 24, 6, 0),
('8zaEfixn37W7s9RSVDbPWnhne7E3', '2020-06-28', 25, 5, 0),
('8zaEfixn37W7s9RSVDbPWnhne7E3', '2020-06-28', 26, 3, 0),
('8zaEfixn37W7s9RSVDbPWnhne7E3', '2020-06-28', 27, 0, 0),
('B2QbKOJnPsSyi1liIgpimwQcp5Q2', '2020-07-01', 1, 0, 0),
('B2QbKOJnPsSyi1liIgpimwQcp5Q2', '2020-07-01', 2, 1, 0),
('B2QbKOJnPsSyi1liIgpimwQcp5Q2', '2020-07-01', 3, 0, 0),
('B2QbKOJnPsSyi1liIgpimwQcp5Q2', '2020-07-01', 4, 0, 0),
('B2QbKOJnPsSyi1liIgpimwQcp5Q2', '2020-07-01', 5, 0, 0),
('B2QbKOJnPsSyi1liIgpimwQcp5Q2', '2020-07-01', 6, 0, 0),
('B2QbKOJnPsSyi1liIgpimwQcp5Q2', '2020-07-01', 7, 0, 0),
('B2QbKOJnPsSyi1liIgpimwQcp5Q2', '2020-07-01', 8, 5, 0),
('B2QbKOJnPsSyi1liIgpimwQcp5Q2', '2020-07-01', 9, 4, 0),
('B2QbKOJnPsSyi1liIgpimwQcp5Q2', '2020-07-01', 10, 12, 0),
('B2QbKOJnPsSyi1liIgpimwQcp5Q2', '2020-07-01', 11, 0, 0),
('B2QbKOJnPsSyi1liIgpimwQcp5Q2', '2020-07-01', 13, 0, 0),
('B2QbKOJnPsSyi1liIgpimwQcp5Q2', '2020-07-01', 14, 0, 0),
('B2QbKOJnPsSyi1liIgpimwQcp5Q2', '2020-07-01', 15, 2, 0),
('B2QbKOJnPsSyi1liIgpimwQcp5Q2', '2020-07-01', 16, 5, 0),
('B2QbKOJnPsSyi1liIgpimwQcp5Q2', '2020-07-01', 17, 4, 0),
('B2QbKOJnPsSyi1liIgpimwQcp5Q2', '2020-07-01', 18, 0, 0),
('B2QbKOJnPsSyi1liIgpimwQcp5Q2', '2020-07-01', 19, 0, 0),
('B2QbKOJnPsSyi1liIgpimwQcp5Q2', '2020-07-01', 20, 0, 0),
('B2QbKOJnPsSyi1liIgpimwQcp5Q2', '2020-07-01', 21, 0, 0),
('B2QbKOJnPsSyi1liIgpimwQcp5Q2', '2020-07-01', 22, 0, 0),
('B2QbKOJnPsSyi1liIgpimwQcp5Q2', '2020-07-01', 23, 0, 0),
('B2QbKOJnPsSyi1liIgpimwQcp5Q2', '2020-07-01', 24, 6, 0),
('B2QbKOJnPsSyi1liIgpimwQcp5Q2', '2020-07-01', 25, 5, 0),
('B2QbKOJnPsSyi1liIgpimwQcp5Q2', '2020-07-01', 26, 3, 0),
('B2QbKOJnPsSyi1liIgpimwQcp5Q2', '2020-07-01', 27, 0, 0),
('binyamin', '2020-06-30', 1, 1, 0),
('binyamin', '2020-06-20', 2, 1, 0),
('binyamin', '2020-06-30', 3, 1, 0),
('binyamin', '2020-06-30', 4, 1, 0),
('binyamin', '2020-06-27', 5, 6, 0),
('binyamin', '2020-06-30', 6, 3, 0),
('binyamin', '2020-06-30', 7, 2, 0),
('binyamin', '2020-06-20', 8, 5, 0),
('binyamin', '2020-06-20', 9, 4, 0),
('binyamin', '2020-06-20', 10, 12, 0),
('binyamin', '2020-06-29', 11, 17, 0),
('binyamin', '2020-06-30', 13, 7, 0),
('binyamin', '2020-06-26', 14, 7, 0),
('binyamin', '2020-06-20', 15, 2, 0),
('binyamin', '2020-06-20', 16, 5, 0),
('binyamin', '2020-06-20', 17, 4, 0),
('binyamin', '2020-06-26', 18, 24, 0),
('binyamin', '2020-06-29', 19, 14, 0),
('binyamin', '2020-06-27', 20, 0, 0),
('binyamin', '2020-06-27', 21, 0, 0),
('binyamin', '2020-06-29', 22, 0, 0),
('binyamin', '2020-06-29', 23, 0, 0),
('binyamin', '2020-06-20', 24, 6, 0),
('binyamin', '2020-06-20', 25, 5, 0),
('binyamin', '2020-06-20', 26, 3, 0),
('binyamin', '2020-06-29', 27, 0, 0),
('bLop43H3t3WJLPXxjhm3txCFDEk1', '2020-07-05', 1, 0, 0),
('bLop43H3t3WJLPXxjhm3txCFDEk1', '2020-07-05', 2, 1, 0),
('bLop43H3t3WJLPXxjhm3txCFDEk1', '2020-07-05', 3, 1, 0),
('bLop43H3t3WJLPXxjhm3txCFDEk1', '2020-07-05', 4, 1, 0),
('bLop43H3t3WJLPXxjhm3txCFDEk1', '2020-07-05', 5, 2, 0),
('bLop43H3t3WJLPXxjhm3txCFDEk1', '2020-07-05', 6, 0, 0),
('bLop43H3t3WJLPXxjhm3txCFDEk1', '2020-07-05', 7, 0, 0),
('bLop43H3t3WJLPXxjhm3txCFDEk1', '2020-07-05', 8, 5, 0),
('bLop43H3t3WJLPXxjhm3txCFDEk1', '2020-07-05', 9, 4, 0),
('bLop43H3t3WJLPXxjhm3txCFDEk1', '2020-07-05', 10, 12, 0),
('bLop43H3t3WJLPXxjhm3txCFDEk1', '2020-07-05', 11, 19, 0),
('bLop43H3t3WJLPXxjhm3txCFDEk1', '2020-07-05', 13, 0, 0),
('bLop43H3t3WJLPXxjhm3txCFDEk1', '2020-07-05', 14, 0, 0),
('bLop43H3t3WJLPXxjhm3txCFDEk1', '2020-07-05', 15, 2, 0),
('bLop43H3t3WJLPXxjhm3txCFDEk1', '2020-07-05', 16, 5, 0),
('bLop43H3t3WJLPXxjhm3txCFDEk1', '2020-07-05', 17, 4, 0),
('bLop43H3t3WJLPXxjhm3txCFDEk1', '2020-07-05', 18, 4, 0),
('bLop43H3t3WJLPXxjhm3txCFDEk1', '2020-07-05', 19, 0, 0),
('bLop43H3t3WJLPXxjhm3txCFDEk1', '2020-07-05', 20, 0, 0),
('bLop43H3t3WJLPXxjhm3txCFDEk1', '2020-07-05', 21, 0, 0),
('bLop43H3t3WJLPXxjhm3txCFDEk1', '2020-07-05', 22, 0, 0),
('bLop43H3t3WJLPXxjhm3txCFDEk1', '2020-07-05', 23, 0, 0),
('bLop43H3t3WJLPXxjhm3txCFDEk1', '2020-07-05', 24, 6, 0),
('bLop43H3t3WJLPXxjhm3txCFDEk1', '2020-07-05', 25, 5, 0),
('bLop43H3t3WJLPXxjhm3txCFDEk1', '2020-07-05', 26, 3, 0),
('bLop43H3t3WJLPXxjhm3txCFDEk1', '2020-07-05', 27, 0, 0),
('BX2AOVygt4hEIyIrStgjotayYdB3', '2020-06-27', 1, 0, 0),
('BX2AOVygt4hEIyIrStgjotayYdB3', '2020-06-27', 2, 1, 0),
('BX2AOVygt4hEIyIrStgjotayYdB3', '2020-06-27', 3, 0, 0),
('BX2AOVygt4hEIyIrStgjotayYdB3', '2020-06-27', 4, 0, 0),
('BX2AOVygt4hEIyIrStgjotayYdB3', '2020-06-27', 5, 0, 0),
('BX2AOVygt4hEIyIrStgjotayYdB3', '2020-06-27', 6, 0, 0),
('BX2AOVygt4hEIyIrStgjotayYdB3', '2020-06-27', 7, 0, 0),
('BX2AOVygt4hEIyIrStgjotayYdB3', '2020-06-27', 8, 5, 0),
('BX2AOVygt4hEIyIrStgjotayYdB3', '2020-06-27', 9, 4, 0),
('BX2AOVygt4hEIyIrStgjotayYdB3', '2020-06-27', 10, 12, 0),
('BX2AOVygt4hEIyIrStgjotayYdB3', '2020-06-27', 11, 0, 0),
('BX2AOVygt4hEIyIrStgjotayYdB3', '2020-06-27', 13, 0, 0),
('BX2AOVygt4hEIyIrStgjotayYdB3', '2020-06-27', 14, 0, 0),
('BX2AOVygt4hEIyIrStgjotayYdB3', '2020-06-27', 15, 2, 0),
('BX2AOVygt4hEIyIrStgjotayYdB3', '2020-06-27', 16, 5, 0),
('BX2AOVygt4hEIyIrStgjotayYdB3', '2020-06-27', 17, 4, 0),
('BX2AOVygt4hEIyIrStgjotayYdB3', '2020-06-27', 18, 0, 0),
('BX2AOVygt4hEIyIrStgjotayYdB3', '2020-06-27', 19, 0, 0),
('BX2AOVygt4hEIyIrStgjotayYdB3', '2020-06-27', 20, 0, 0),
('BX2AOVygt4hEIyIrStgjotayYdB3', '2020-06-27', 21, 0, 0),
('BX2AOVygt4hEIyIrStgjotayYdB3', '2020-06-27', 22, 0, 0),
('BX2AOVygt4hEIyIrStgjotayYdB3', '2020-06-27', 23, 0, 0),
('BX2AOVygt4hEIyIrStgjotayYdB3', '2020-06-27', 24, 6, 0),
('BX2AOVygt4hEIyIrStgjotayYdB3', '2020-06-27', 25, 5, 0),
('BX2AOVygt4hEIyIrStgjotayYdB3', '2020-06-27', 26, 3, 0),
('BX2AOVygt4hEIyIrStgjotayYdB3', '2020-06-27', 27, 0, 0),
('C3zACYtRllfXSloQ5EEw7hkUmP43', '2020-12-08', 1, 1, 0),
('C3zACYtRllfXSloQ5EEw7hkUmP43', '2020-12-08', 2, 1, 0),
('C3zACYtRllfXSloQ5EEw7hkUmP43', '2020-12-12', 3, 0, 0),
('C3zACYtRllfXSloQ5EEw7hkUmP43', '2020-12-13', 4, 1, 0),
('C3zACYtRllfXSloQ5EEw7hkUmP43', '2020-12-13', 5, 2, 0),
('C3zACYtRllfXSloQ5EEw7hkUmP43', '2020-12-13', 6, 2, 0),
('C3zACYtRllfXSloQ5EEw7hkUmP43', '2020-12-12', 7, 1, 0),
('C3zACYtRllfXSloQ5EEw7hkUmP43', '2020-12-08', 8, 2, 0),
('C3zACYtRllfXSloQ5EEw7hkUmP43', '2020-12-08', 9, 2, 0),
('C3zACYtRllfXSloQ5EEw7hkUmP43', '2020-12-08', 10, 4, 0),
('C3zACYtRllfXSloQ5EEw7hkUmP43', '2020-12-13', 11, 7, 0),
('C3zACYtRllfXSloQ5EEw7hkUmP43', '2020-12-10', 13, 2, 0),
('C3zACYtRllfXSloQ5EEw7hkUmP43', '2020-12-12', 14, 2, 0),
('C3zACYtRllfXSloQ5EEw7hkUmP43', '2020-12-08', 15, 1, 0),
('C3zACYtRllfXSloQ5EEw7hkUmP43', '2020-12-08', 16, 3, 0),
('C3zACYtRllfXSloQ5EEw7hkUmP43', '2020-12-08', 17, 2, 0),
('C3zACYtRllfXSloQ5EEw7hkUmP43', '2020-12-10', 18, 5, 0),
('C3zACYtRllfXSloQ5EEw7hkUmP43', '2020-12-10', 19, 2, 0),
('C3zACYtRllfXSloQ5EEw7hkUmP43', '2020-12-13', 20, 3, 0),
('C3zACYtRllfXSloQ5EEw7hkUmP43', '2020-12-08', 21, 2, 0),
('C3zACYtRllfXSloQ5EEw7hkUmP43', '2020-12-09', 22, 2, 0),
('C3zACYtRllfXSloQ5EEw7hkUmP43', '2020-12-13', 23, 5, 0),
('C3zACYtRllfXSloQ5EEw7hkUmP43', '2020-12-13', 24, 10, 0),
('C3zACYtRllfXSloQ5EEw7hkUmP43', '2020-12-08', 25, 3, 0),
('C3zACYtRllfXSloQ5EEw7hkUmP43', '2020-12-08', 26, 2, 0),
('C3zACYtRllfXSloQ5EEw7hkUmP43', '2020-12-08', 27, 2, 0),
('C3zACYtRllfXSloQ5EEw7hkUmP43', '2020-12-11', 28, 2, 0),
('cOJBiGjcxQQb7czdLcTzFLcwupQ2', '2020-06-30', 1, 0, 0),
('cOJBiGjcxQQb7czdLcTzFLcwupQ2', '2020-07-01', 2, 0, 0),
('cOJBiGjcxQQb7czdLcTzFLcwupQ2', '2020-07-01', 3, 0, 0),
('cOJBiGjcxQQb7czdLcTzFLcwupQ2', '2020-06-30', 4, 0, 0),
('cOJBiGjcxQQb7czdLcTzFLcwupQ2', '2020-07-01', 5, 5, 0),
('cOJBiGjcxQQb7czdLcTzFLcwupQ2', '2020-06-30', 6, 0, 0),
('cOJBiGjcxQQb7czdLcTzFLcwupQ2', '2020-06-30', 7, 0, 0),
('cOJBiGjcxQQb7czdLcTzFLcwupQ2', '2020-06-30', 8, 5, 0),
('cOJBiGjcxQQb7czdLcTzFLcwupQ2', '2020-06-30', 9, 4, 0),
('cOJBiGjcxQQb7czdLcTzFLcwupQ2', '2020-06-30', 10, 12, 0),
('cOJBiGjcxQQb7czdLcTzFLcwupQ2', '2020-06-30', 11, 0, 0),
('cOJBiGjcxQQb7czdLcTzFLcwupQ2', '2020-06-30', 13, 0, 0),
('cOJBiGjcxQQb7czdLcTzFLcwupQ2', '2020-07-02', 14, 6, 0),
('cOJBiGjcxQQb7czdLcTzFLcwupQ2', '2020-06-30', 15, 2, 0),
('cOJBiGjcxQQb7czdLcTzFLcwupQ2', '2020-06-30', 16, 5, 0),
('cOJBiGjcxQQb7czdLcTzFLcwupQ2', '2020-06-30', 17, 4, 0),
('cOJBiGjcxQQb7czdLcTzFLcwupQ2', '2020-07-02', 18, 10, 0),
('cOJBiGjcxQQb7czdLcTzFLcwupQ2', '2020-06-30', 19, 0, 0),
('cOJBiGjcxQQb7czdLcTzFLcwupQ2', '2020-06-30', 20, 0, 0),
('cOJBiGjcxQQb7czdLcTzFLcwupQ2', '2020-06-30', 21, 0, 0),
('cOJBiGjcxQQb7czdLcTzFLcwupQ2', '2020-06-30', 22, 0, 0),
('cOJBiGjcxQQb7czdLcTzFLcwupQ2', '2020-06-30', 23, 0, 0),
('cOJBiGjcxQQb7czdLcTzFLcwupQ2', '2020-06-30', 24, 6, 0),
('cOJBiGjcxQQb7czdLcTzFLcwupQ2', '2020-06-30', 25, 5, 0),
('cOJBiGjcxQQb7czdLcTzFLcwupQ2', '2020-06-30', 26, 3, 0),
('cOJBiGjcxQQb7czdLcTzFLcwupQ2', '2020-06-30', 27, 0, 0),
('fExWdYVbMXYpvZJLPjVyOetzle82', '2020-12-08', 1, 1, 0),
('fExWdYVbMXYpvZJLPjVyOetzle82', '2020-12-08', 2, 1, 0),
('fExWdYVbMXYpvZJLPjVyOetzle82', '2020-12-08', 3, 0, 0),
('fExWdYVbMXYpvZJLPjVyOetzle82', '2020-12-08', 4, 0, 0),
('fExWdYVbMXYpvZJLPjVyOetzle82', '2020-12-08', 5, 0, 0),
('fExWdYVbMXYpvZJLPjVyOetzle82', '2020-12-08', 6, 0, 0),
('fExWdYVbMXYpvZJLPjVyOetzle82', '2020-12-08', 7, 0, 0),
('fExWdYVbMXYpvZJLPjVyOetzle82', '2020-12-08', 8, 2, 0),
('fExWdYVbMXYpvZJLPjVyOetzle82', '2020-12-08', 9, 2, 0),
('fExWdYVbMXYpvZJLPjVyOetzle82', '2020-12-08', 10, 4, 0),
('fExWdYVbMXYpvZJLPjVyOetzle82', '2020-12-08', 11, 0, 0),
('fExWdYVbMXYpvZJLPjVyOetzle82', '2020-12-08', 13, 0, 0),
('fExWdYVbMXYpvZJLPjVyOetzle82', '2020-12-08', 14, 0, 0),
('fExWdYVbMXYpvZJLPjVyOetzle82', '2020-12-08', 15, 1, 0),
('fExWdYVbMXYpvZJLPjVyOetzle82', '2020-12-08', 16, 3, 0),
('fExWdYVbMXYpvZJLPjVyOetzle82', '2020-12-08', 17, 2, 0),
('fExWdYVbMXYpvZJLPjVyOetzle82', '2020-12-08', 18, 0, 0),
('fExWdYVbMXYpvZJLPjVyOetzle82', '2020-12-08', 19, 0, 0),
('fExWdYVbMXYpvZJLPjVyOetzle82', '2020-12-08', 20, 0, 0),
('fExWdYVbMXYpvZJLPjVyOetzle82', '2020-12-08', 21, 2, 0),
('fExWdYVbMXYpvZJLPjVyOetzle82', '2020-12-08', 22, 0, 0),
('fExWdYVbMXYpvZJLPjVyOetzle82', '2020-12-08', 23, 0, 0),
('fExWdYVbMXYpvZJLPjVyOetzle82', '2020-12-08', 24, 3, 0),
('fExWdYVbMXYpvZJLPjVyOetzle82', '2020-12-08', 25, 2, 0),
('fExWdYVbMXYpvZJLPjVyOetzle82', '2020-12-08', 26, 2, 0),
('fExWdYVbMXYpvZJLPjVyOetzle82', '2020-12-08', 27, 1, 0),
('fExWdYVbMXYpvZJLPjVyOetzle82', '2020-12-08', 28, 0, 0),
('fPdKgkUnIGSGVvrm6PeI8amS7Y82', '2020-06-27', 1, 0, 0),
('fPdKgkUnIGSGVvrm6PeI8amS7Y82', '2020-06-27', 2, 1, 0),
('fPdKgkUnIGSGVvrm6PeI8amS7Y82', '2020-06-27', 3, 0, 0),
('fPdKgkUnIGSGVvrm6PeI8amS7Y82', '2020-06-27', 4, 0, 0),
('fPdKgkUnIGSGVvrm6PeI8amS7Y82', '2020-06-27', 5, 0, 0),
('fPdKgkUnIGSGVvrm6PeI8amS7Y82', '2020-06-27', 6, 0, 0),
('fPdKgkUnIGSGVvrm6PeI8amS7Y82', '2020-06-27', 7, 0, 0),
('fPdKgkUnIGSGVvrm6PeI8amS7Y82', '2020-06-27', 8, 5, 0),
('fPdKgkUnIGSGVvrm6PeI8amS7Y82', '2020-06-27', 9, 4, 0),
('fPdKgkUnIGSGVvrm6PeI8amS7Y82', '2020-06-27', 10, 12, 0),
('fPdKgkUnIGSGVvrm6PeI8amS7Y82', '2020-06-27', 11, 0, 0),
('fPdKgkUnIGSGVvrm6PeI8amS7Y82', '2020-06-27', 13, 0, 0),
('fPdKgkUnIGSGVvrm6PeI8amS7Y82', '2020-06-27', 14, 0, 0),
('fPdKgkUnIGSGVvrm6PeI8amS7Y82', '2020-06-27', 15, 2, 0),
('fPdKgkUnIGSGVvrm6PeI8amS7Y82', '2020-06-27', 16, 5, 0),
('fPdKgkUnIGSGVvrm6PeI8amS7Y82', '2020-06-27', 17, 4, 0),
('fPdKgkUnIGSGVvrm6PeI8amS7Y82', '2020-06-27', 18, 0, 0),
('fPdKgkUnIGSGVvrm6PeI8amS7Y82', '2020-06-27', 19, 0, 0),
('fPdKgkUnIGSGVvrm6PeI8amS7Y82', '2020-06-27', 20, 0, 0),
('fPdKgkUnIGSGVvrm6PeI8amS7Y82', '2020-06-27', 21, 0, 0),
('fPdKgkUnIGSGVvrm6PeI8amS7Y82', '2020-06-27', 22, 0, 0),
('fPdKgkUnIGSGVvrm6PeI8amS7Y82', '2020-06-27', 23, 0, 0),
('fPdKgkUnIGSGVvrm6PeI8amS7Y82', '2020-06-27', 24, 6, 0),
('fPdKgkUnIGSGVvrm6PeI8amS7Y82', '2020-06-27', 25, 5, 0),
('fPdKgkUnIGSGVvrm6PeI8amS7Y82', '2020-06-27', 26, 3, 0),
('fPdKgkUnIGSGVvrm6PeI8amS7Y82', '2020-06-27', 27, 0, 0),
('HgHcfuhhekZvbGohwxxhhmp4Dgu1', '2020-06-30', 1, 0, 0),
('HgHcfuhhekZvbGohwxxhhmp4Dgu1', '2020-06-30', 2, 1, 0),
('HgHcfuhhekZvbGohwxxhhmp4Dgu1', '2020-06-30', 3, 0, 0),
('HgHcfuhhekZvbGohwxxhhmp4Dgu1', '2020-06-30', 4, 0, 0),
('HgHcfuhhekZvbGohwxxhhmp4Dgu1', '2020-06-30', 5, 0, 0),
('HgHcfuhhekZvbGohwxxhhmp4Dgu1', '2020-06-30', 6, 0, 0),
('HgHcfuhhekZvbGohwxxhhmp4Dgu1', '2020-06-30', 7, 0, 0),
('HgHcfuhhekZvbGohwxxhhmp4Dgu1', '2020-06-30', 8, 5, 0),
('HgHcfuhhekZvbGohwxxhhmp4Dgu1', '2020-06-30', 9, 4, 0),
('HgHcfuhhekZvbGohwxxhhmp4Dgu1', '2020-06-30', 10, 12, 0),
('HgHcfuhhekZvbGohwxxhhmp4Dgu1', '2020-06-30', 11, 0, 0),
('HgHcfuhhekZvbGohwxxhhmp4Dgu1', '2020-06-30', 13, 0, 0),
('HgHcfuhhekZvbGohwxxhhmp4Dgu1', '2020-06-30', 14, 0, 0),
('HgHcfuhhekZvbGohwxxhhmp4Dgu1', '2020-06-30', 15, 2, 0),
('HgHcfuhhekZvbGohwxxhhmp4Dgu1', '2020-06-30', 16, 5, 0),
('HgHcfuhhekZvbGohwxxhhmp4Dgu1', '2020-06-30', 17, 4, 0),
('HgHcfuhhekZvbGohwxxhhmp4Dgu1', '2020-06-30', 18, 0, 0),
('HgHcfuhhekZvbGohwxxhhmp4Dgu1', '2020-06-30', 19, 0, 0),
('HgHcfuhhekZvbGohwxxhhmp4Dgu1', '2020-06-30', 20, 0, 0),
('HgHcfuhhekZvbGohwxxhhmp4Dgu1', '2020-06-30', 21, 0, 0),
('HgHcfuhhekZvbGohwxxhhmp4Dgu1', '2020-06-30', 22, 0, 0),
('HgHcfuhhekZvbGohwxxhhmp4Dgu1', '2020-06-30', 23, 0, 0),
('HgHcfuhhekZvbGohwxxhhmp4Dgu1', '2020-06-30', 24, 6, 0),
('HgHcfuhhekZvbGohwxxhhmp4Dgu1', '2020-06-30', 25, 5, 0),
('HgHcfuhhekZvbGohwxxhhmp4Dgu1', '2020-06-30', 26, 3, 0),
('HgHcfuhhekZvbGohwxxhhmp4Dgu1', '2020-06-30', 27, 0, 0),
('htOUg2fh8lW4XmRb5GY2E93qvHn2', '2020-11-30', 1, 1, 0),
('htOUg2fh8lW4XmRb5GY2E93qvHn2', '2020-11-30', 2, 1, 0),
('htOUg2fh8lW4XmRb5GY2E93qvHn2', '2020-11-30', 3, 1, 0),
('htOUg2fh8lW4XmRb5GY2E93qvHn2', '2020-11-30', 4, 0, 0),
('htOUg2fh8lW4XmRb5GY2E93qvHn2', '2020-11-30', 5, 0, 0),
('htOUg2fh8lW4XmRb5GY2E93qvHn2', '2020-11-30', 6, 0, 0),
('htOUg2fh8lW4XmRb5GY2E93qvHn2', '2020-11-30', 7, 0, 0),
('htOUg2fh8lW4XmRb5GY2E93qvHn2', '2020-11-30', 8, 2, 0),
('htOUg2fh8lW4XmRb5GY2E93qvHn2', '2020-11-30', 9, 2, 0),
('htOUg2fh8lW4XmRb5GY2E93qvHn2', '2020-11-30', 10, 4, 0),
('htOUg2fh8lW4XmRb5GY2E93qvHn2', '2020-11-30', 11, 0, 0),
('htOUg2fh8lW4XmRb5GY2E93qvHn2', '2020-11-30', 13, 0, 0),
('htOUg2fh8lW4XmRb5GY2E93qvHn2', '2020-11-30', 14, 0, 0),
('htOUg2fh8lW4XmRb5GY2E93qvHn2', '2020-11-30', 15, 1, 0),
('htOUg2fh8lW4XmRb5GY2E93qvHn2', '2020-11-30', 16, 3, 0),
('htOUg2fh8lW4XmRb5GY2E93qvHn2', '2020-11-30', 17, 2, 0),
('htOUg2fh8lW4XmRb5GY2E93qvHn2', '2020-11-30', 18, 0, 0),
('htOUg2fh8lW4XmRb5GY2E93qvHn2', '2020-11-30', 19, 0, 0),
('htOUg2fh8lW4XmRb5GY2E93qvHn2', '2020-11-30', 20, 0, 0),
('htOUg2fh8lW4XmRb5GY2E93qvHn2', '2020-11-30', 21, 0, 0),
('htOUg2fh8lW4XmRb5GY2E93qvHn2', '2020-11-30', 22, 0, 0),
('htOUg2fh8lW4XmRb5GY2E93qvHn2', '2020-11-30', 23, 0, 0),
('htOUg2fh8lW4XmRb5GY2E93qvHn2', '2020-11-30', 24, 3, 0),
('htOUg2fh8lW4XmRb5GY2E93qvHn2', '2020-11-30', 25, 2, 0),
('htOUg2fh8lW4XmRb5GY2E93qvHn2', '2020-11-30', 26, 2, 0),
('htOUg2fh8lW4XmRb5GY2E93qvHn2', '2020-11-30', 27, 0, 0),
('i3Z9YvozRXewyinzZGLdLYdjXUJ3', '2020-07-02', 1, 4, 0),
('i3Z9YvozRXewyinzZGLdLYdjXUJ3', '2020-07-01', 2, 1, 0),
('i3Z9YvozRXewyinzZGLdLYdjXUJ3', '2020-07-02', 3, 1, 0),
('i3Z9YvozRXewyinzZGLdLYdjXUJ3', '2020-07-02', 4, 1, 0),
('i3Z9YvozRXewyinzZGLdLYdjXUJ3', '2020-07-02', 5, 5, 0),
('i3Z9YvozRXewyinzZGLdLYdjXUJ3', '2020-07-02', 6, 4, 0),
('i3Z9YvozRXewyinzZGLdLYdjXUJ3', '2020-07-01', 7, 7, 0),
('i3Z9YvozRXewyinzZGLdLYdjXUJ3', '2020-07-01', 8, 5, 0),
('i3Z9YvozRXewyinzZGLdLYdjXUJ3', '2020-07-01', 9, 4, 0),
('i3Z9YvozRXewyinzZGLdLYdjXUJ3', '2020-07-01', 10, 12, 0),
('i3Z9YvozRXewyinzZGLdLYdjXUJ3', '2020-07-02', 11, 8, 0),
('i3Z9YvozRXewyinzZGLdLYdjXUJ3', '2020-07-01', 13, 0, 0),
('i3Z9YvozRXewyinzZGLdLYdjXUJ3', '2020-07-01', 14, 0, 0),
('i3Z9YvozRXewyinzZGLdLYdjXUJ3', '2020-07-01', 15, 2, 0),
('i3Z9YvozRXewyinzZGLdLYdjXUJ3', '2020-07-01', 16, 5, 0),
('i3Z9YvozRXewyinzZGLdLYdjXUJ3', '2020-07-01', 17, 4, 0),
('i3Z9YvozRXewyinzZGLdLYdjXUJ3', '2020-07-01', 18, 0, 0),
('i3Z9YvozRXewyinzZGLdLYdjXUJ3', '2020-07-01', 19, 0, 0),
('i3Z9YvozRXewyinzZGLdLYdjXUJ3', '2020-07-01', 20, 0, 0),
('i3Z9YvozRXewyinzZGLdLYdjXUJ3', '2020-07-01', 21, 0, 0),
('i3Z9YvozRXewyinzZGLdLYdjXUJ3', '2020-07-02', 22, 22, 0),
('i3Z9YvozRXewyinzZGLdLYdjXUJ3', '2020-07-02', 23, 28, 0),
('i3Z9YvozRXewyinzZGLdLYdjXUJ3', '2020-07-01', 24, 6, 0),
('i3Z9YvozRXewyinzZGLdLYdjXUJ3', '2020-07-01', 25, 5, 0),
('i3Z9YvozRXewyinzZGLdLYdjXUJ3', '2020-07-01', 26, 3, 0),
('i3Z9YvozRXewyinzZGLdLYdjXUJ3', '2020-07-01', 27, 0, 0),
('ielCI1jhFid7Xwk5T7q0dsUVGK12', '2020-08-05', 1, 0, 0),
('ielCI1jhFid7Xwk5T7q0dsUVGK12', '2020-08-05', 2, 1, 0),
('ielCI1jhFid7Xwk5T7q0dsUVGK12', '2020-08-05', 3, 1, 0),
('ielCI1jhFid7Xwk5T7q0dsUVGK12', '2020-08-05', 4, 0, 0),
('ielCI1jhFid7Xwk5T7q0dsUVGK12', '2020-08-05', 5, 3, 0),
('ielCI1jhFid7Xwk5T7q0dsUVGK12', '2020-08-05', 6, 0, 0),
('ielCI1jhFid7Xwk5T7q0dsUVGK12', '2020-08-05', 7, 0, 0),
('ielCI1jhFid7Xwk5T7q0dsUVGK12', '2020-08-05', 8, 5, 0),
('ielCI1jhFid7Xwk5T7q0dsUVGK12', '2020-08-05', 9, 4, 0),
('ielCI1jhFid7Xwk5T7q0dsUVGK12', '2020-08-05', 10, 12, 0),
('ielCI1jhFid7Xwk5T7q0dsUVGK12', '2020-08-05', 11, 28, 0),
('ielCI1jhFid7Xwk5T7q0dsUVGK12', '2020-08-05', 13, 0, 0),
('ielCI1jhFid7Xwk5T7q0dsUVGK12', '2020-08-05', 14, 1, 0),
('ielCI1jhFid7Xwk5T7q0dsUVGK12', '2020-08-05', 15, 2, 0),
('ielCI1jhFid7Xwk5T7q0dsUVGK12', '2020-08-05', 16, 5, 0),
('ielCI1jhFid7Xwk5T7q0dsUVGK12', '2020-08-05', 17, 4, 0),
('ielCI1jhFid7Xwk5T7q0dsUVGK12', '2020-08-05', 18, 0, 0),
('ielCI1jhFid7Xwk5T7q0dsUVGK12', '2020-08-05', 19, 0, 0),
('ielCI1jhFid7Xwk5T7q0dsUVGK12', '2020-08-05', 20, 0, 0),
('ielCI1jhFid7Xwk5T7q0dsUVGK12', '2020-08-05', 21, 0, 0),
('ielCI1jhFid7Xwk5T7q0dsUVGK12', '2020-08-05', 22, 0, 0),
('ielCI1jhFid7Xwk5T7q0dsUVGK12', '2020-08-05', 23, 0, 0),
('ielCI1jhFid7Xwk5T7q0dsUVGK12', '2020-08-05', 24, 6, 0),
('ielCI1jhFid7Xwk5T7q0dsUVGK12', '2020-08-05', 25, 5, 0),
('ielCI1jhFid7Xwk5T7q0dsUVGK12', '2020-08-05', 26, 3, 0),
('ielCI1jhFid7Xwk5T7q0dsUVGK12', '2020-08-05', 27, 0, 0),
('jac', '2020-06-21', 1, 0, 0),
('jac', '2020-06-21', 2, 1, 0),
('jac', '2020-06-21', 3, 0, 0),
('jac', '2020-06-21', 4, 0, 0),
('jac', '2020-06-21', 5, 0, 0),
('jac', '2020-06-21', 6, 0, 0),
('jac', '2020-06-21', 7, 0, 0),
('jac', '2020-06-21', 8, 5, 0),
('jac', '2020-06-21', 9, 4, 0),
('jac', '2020-06-21', 10, 12, 0),
('jac', '2020-06-21', 11, 0, 0),
('jac', '2020-06-21', 13, 0, 0),
('jac', '2020-06-21', 14, 0, 0),
('jac', '2020-06-21', 15, 2, 0),
('jac', '2020-06-21', 16, 5, 0),
('jac', '2020-06-21', 17, 4, 0),
('jac', '2020-06-21', 18, 0, 0),
('jac', '2020-06-21', 19, 0, 0),
('jac', '2020-06-21', 20, 0, 0),
('jac', '2020-06-21', 21, 0, 0),
('jac', '2020-06-21', 22, 0, 0),
('jac', '2020-06-21', 23, 0, 0),
('jac', '2020-06-21', 24, 6, 0),
('jac', '2020-06-21', 25, 5, 0),
('jac', '2020-06-21', 26, 3, 0),
('jac', '2020-06-21', 27, 0, 0),
('KuucVlgFT3frBoAY8UDGXjOAPWK2', '2020-07-09', 1, 0, 0),
('KuucVlgFT3frBoAY8UDGXjOAPWK2', '2020-07-09', 2, 1, 0),
('KuucVlgFT3frBoAY8UDGXjOAPWK2', '2020-07-09', 3, 1, 0),
('KuucVlgFT3frBoAY8UDGXjOAPWK2', '2020-07-09', 4, 1, 0),
('KuucVlgFT3frBoAY8UDGXjOAPWK2', '2020-07-09', 5, 0, 0),
('KuucVlgFT3frBoAY8UDGXjOAPWK2', '2020-07-09', 6, 0, 0),
('KuucVlgFT3frBoAY8UDGXjOAPWK2', '2020-07-09', 7, 0, 0),
('KuucVlgFT3frBoAY8UDGXjOAPWK2', '2020-07-09', 8, 5, 0),
('KuucVlgFT3frBoAY8UDGXjOAPWK2', '2020-07-09', 9, 4, 0),
('KuucVlgFT3frBoAY8UDGXjOAPWK2', '2020-07-09', 10, 12, 0),
('KuucVlgFT3frBoAY8UDGXjOAPWK2', '2020-07-09', 11, 0, 0),
('KuucVlgFT3frBoAY8UDGXjOAPWK2', '2020-07-09', 13, 0, 0),
('KuucVlgFT3frBoAY8UDGXjOAPWK2', '2020-07-09', 14, 0, 0),
('KuucVlgFT3frBoAY8UDGXjOAPWK2', '2020-07-09', 15, 2, 0),
('KuucVlgFT3frBoAY8UDGXjOAPWK2', '2020-07-09', 16, 5, 0),
('KuucVlgFT3frBoAY8UDGXjOAPWK2', '2020-07-09', 17, 4, 0),
('KuucVlgFT3frBoAY8UDGXjOAPWK2', '2020-07-09', 18, 0, 0),
('KuucVlgFT3frBoAY8UDGXjOAPWK2', '2020-07-09', 19, 0, 0),
('KuucVlgFT3frBoAY8UDGXjOAPWK2', '2020-07-09', 20, 0, 0),
('KuucVlgFT3frBoAY8UDGXjOAPWK2', '2020-07-09', 21, 0, 0),
('KuucVlgFT3frBoAY8UDGXjOAPWK2', '2020-07-09', 22, 0, 0),
('KuucVlgFT3frBoAY8UDGXjOAPWK2', '2020-07-09', 23, 0, 0),
('KuucVlgFT3frBoAY8UDGXjOAPWK2', '2020-07-09', 24, 6, 0),
('KuucVlgFT3frBoAY8UDGXjOAPWK2', '2020-07-09', 25, 5, 0),
('KuucVlgFT3frBoAY8UDGXjOAPWK2', '2020-07-09', 26, 3, 0),
('KuucVlgFT3frBoAY8UDGXjOAPWK2', '2020-07-09', 27, 0, 0),
('LIRk9WxpDsTbhsFcHFbcSsgZca42', '2020-10-14', 1, 1, 0),
('LIRk9WxpDsTbhsFcHFbcSsgZca42', '2020-10-12', 2, 1, 0),
('LIRk9WxpDsTbhsFcHFbcSsgZca42', '2020-10-12', 3, 0, 0),
('LIRk9WxpDsTbhsFcHFbcSsgZca42', '2020-10-12', 4, 0, 0),
('LIRk9WxpDsTbhsFcHFbcSsgZca42', '2020-10-12', 5, 0, 0),
('LIRk9WxpDsTbhsFcHFbcSsgZca42', '2020-10-12', 6, 0, 0),
('LIRk9WxpDsTbhsFcHFbcSsgZca42', '2020-10-12', 7, 0, 0),
('LIRk9WxpDsTbhsFcHFbcSsgZca42', '2020-10-12', 8, 5, 0),
('LIRk9WxpDsTbhsFcHFbcSsgZca42', '2020-10-12', 9, 4, 0),
('LIRk9WxpDsTbhsFcHFbcSsgZca42', '2020-10-12', 10, 12, 0),
('LIRk9WxpDsTbhsFcHFbcSsgZca42', '2020-10-12', 11, 0, 0),
('LIRk9WxpDsTbhsFcHFbcSsgZca42', '2020-10-12', 13, 0, 0),
('LIRk9WxpDsTbhsFcHFbcSsgZca42', '2020-10-12', 14, 0, 0),
('LIRk9WxpDsTbhsFcHFbcSsgZca42', '2020-10-12', 15, 2, 0),
('LIRk9WxpDsTbhsFcHFbcSsgZca42', '2020-10-12', 16, 5, 0),
('LIRk9WxpDsTbhsFcHFbcSsgZca42', '2020-10-12', 17, 4, 0),
('LIRk9WxpDsTbhsFcHFbcSsgZca42', '2020-10-12', 18, 0, 0),
('LIRk9WxpDsTbhsFcHFbcSsgZca42', '2020-10-12', 19, 0, 0),
('LIRk9WxpDsTbhsFcHFbcSsgZca42', '2020-10-12', 20, 0, 0),
('LIRk9WxpDsTbhsFcHFbcSsgZca42', '2020-10-12', 21, 0, 0),
('LIRk9WxpDsTbhsFcHFbcSsgZca42', '2020-10-12', 22, 0, 0),
('LIRk9WxpDsTbhsFcHFbcSsgZca42', '2020-10-12', 23, 0, 0),
('LIRk9WxpDsTbhsFcHFbcSsgZca42', '2020-10-12', 24, 6, 0),
('LIRk9WxpDsTbhsFcHFbcSsgZca42', '2020-10-12', 25, 5, 0),
('LIRk9WxpDsTbhsFcHFbcSsgZca42', '2020-10-12', 26, 3, 0),
('LIRk9WxpDsTbhsFcHFbcSsgZca42', '2020-10-12', 27, 0, 0),
('M3TvJ6pDJRYk71AYds3llBoHjWG2', '2020-07-02', 1, 3, 0),
('M3TvJ6pDJRYk71AYds3llBoHjWG2', '2020-07-02', 2, 1, 0),
('M3TvJ6pDJRYk71AYds3llBoHjWG2', '2020-07-02', 3, 1, 0),
('M3TvJ6pDJRYk71AYds3llBoHjWG2', '2020-07-02', 4, 1, 0),
('M3TvJ6pDJRYk71AYds3llBoHjWG2', '2020-07-02', 5, 7, 0),
('M3TvJ6pDJRYk71AYds3llBoHjWG2', '2020-07-02', 6, 5, 0),
('M3TvJ6pDJRYk71AYds3llBoHjWG2', '2020-07-02', 7, 5, 0),
('M3TvJ6pDJRYk71AYds3llBoHjWG2', '2020-07-02', 8, 5, 0),
('M3TvJ6pDJRYk71AYds3llBoHjWG2', '2020-07-02', 9, 4, 0),
('M3TvJ6pDJRYk71AYds3llBoHjWG2', '2020-07-02', 10, 12, 0),
('M3TvJ6pDJRYk71AYds3llBoHjWG2', '2020-07-02', 11, 16, 0),
('M3TvJ6pDJRYk71AYds3llBoHjWG2', '2020-07-02', 13, 0, 0),
('M3TvJ6pDJRYk71AYds3llBoHjWG2', '2020-07-02', 14, 0, 0),
('M3TvJ6pDJRYk71AYds3llBoHjWG2', '2020-07-02', 15, 2, 0),
('M3TvJ6pDJRYk71AYds3llBoHjWG2', '2020-07-02', 16, 5, 0),
('M3TvJ6pDJRYk71AYds3llBoHjWG2', '2020-07-02', 17, 4, 0),
('M3TvJ6pDJRYk71AYds3llBoHjWG2', '2020-07-02', 18, 0, 0),
('M3TvJ6pDJRYk71AYds3llBoHjWG2', '2020-07-02', 19, 0, 0),
('M3TvJ6pDJRYk71AYds3llBoHjWG2', '2020-07-02', 20, 0, 0),
('M3TvJ6pDJRYk71AYds3llBoHjWG2', '2020-07-02', 21, 0, 0),
('M3TvJ6pDJRYk71AYds3llBoHjWG2', '2020-07-02', 22, 35, 0),
('M3TvJ6pDJRYk71AYds3llBoHjWG2', '2020-07-02', 23, 0, 0),
('M3TvJ6pDJRYk71AYds3llBoHjWG2', '2020-07-02', 24, 6, 0),
('M3TvJ6pDJRYk71AYds3llBoHjWG2', '2020-07-02', 25, 5, 0),
('M3TvJ6pDJRYk71AYds3llBoHjWG2', '2020-07-02', 26, 3, 0),
('M3TvJ6pDJRYk71AYds3llBoHjWG2', '2020-07-02', 27, 0, 0),
('qOQkOu6kwcQIGQ8GdiYpPCNSn6l1', '2020-07-02', 1, 0, 0),
('qOQkOu6kwcQIGQ8GdiYpPCNSn6l1', '2020-07-02', 2, 1, 0),
('qOQkOu6kwcQIGQ8GdiYpPCNSn6l1', '2020-07-02', 3, 0, 0),
('qOQkOu6kwcQIGQ8GdiYpPCNSn6l1', '2020-07-02', 4, 0, 0),
('qOQkOu6kwcQIGQ8GdiYpPCNSn6l1', '2020-07-02', 5, 0, 0),
('qOQkOu6kwcQIGQ8GdiYpPCNSn6l1', '2020-07-02', 6, 0, 0),
('qOQkOu6kwcQIGQ8GdiYpPCNSn6l1', '2020-07-02', 7, 0, 0),
('qOQkOu6kwcQIGQ8GdiYpPCNSn6l1', '2020-07-02', 8, 5, 0),
('qOQkOu6kwcQIGQ8GdiYpPCNSn6l1', '2020-07-02', 9, 4, 0),
('qOQkOu6kwcQIGQ8GdiYpPCNSn6l1', '2020-07-02', 10, 12, 0),
('qOQkOu6kwcQIGQ8GdiYpPCNSn6l1', '2020-07-02', 11, 0, 0),
('qOQkOu6kwcQIGQ8GdiYpPCNSn6l1', '2020-07-02', 13, 0, 0),
('qOQkOu6kwcQIGQ8GdiYpPCNSn6l1', '2020-07-02', 14, 0, 0),
('qOQkOu6kwcQIGQ8GdiYpPCNSn6l1', '2020-07-02', 15, 2, 0),
('qOQkOu6kwcQIGQ8GdiYpPCNSn6l1', '2020-07-02', 16, 5, 0),
('qOQkOu6kwcQIGQ8GdiYpPCNSn6l1', '2020-07-02', 17, 4, 0),
('qOQkOu6kwcQIGQ8GdiYpPCNSn6l1', '2020-07-02', 18, 0, 0),
('qOQkOu6kwcQIGQ8GdiYpPCNSn6l1', '2020-07-02', 19, 0, 0),
('qOQkOu6kwcQIGQ8GdiYpPCNSn6l1', '2020-07-02', 20, 0, 0),
('qOQkOu6kwcQIGQ8GdiYpPCNSn6l1', '2020-07-02', 21, 0, 0),
('qOQkOu6kwcQIGQ8GdiYpPCNSn6l1', '2020-07-02', 22, 0, 0),
('qOQkOu6kwcQIGQ8GdiYpPCNSn6l1', '2020-07-02', 23, 0, 0),
('qOQkOu6kwcQIGQ8GdiYpPCNSn6l1', '2020-07-02', 24, 6, 0),
('qOQkOu6kwcQIGQ8GdiYpPCNSn6l1', '2020-07-02', 25, 5, 0),
('qOQkOu6kwcQIGQ8GdiYpPCNSn6l1', '2020-07-02', 26, 3, 0),
('qOQkOu6kwcQIGQ8GdiYpPCNSn6l1', '2020-07-02', 27, 0, 0),
('qwlMwdfpSlYHO4ayO65YruvsioW2', '2020-10-01', 1, 4, 0),
('qwlMwdfpSlYHO4ayO65YruvsioW2', '2020-10-01', 2, 1, 0),
('qwlMwdfpSlYHO4ayO65YruvsioW2', '2020-10-12', 3, 1, 0),
('qwlMwdfpSlYHO4ayO65YruvsioW2', '2020-10-01', 4, 0, 0),
('qwlMwdfpSlYHO4ayO65YruvsioW2', '2020-11-23', 5, 2, 0),
('qwlMwdfpSlYHO4ayO65YruvsioW2', '2020-10-01', 6, 0, 0),
('qwlMwdfpSlYHO4ayO65YruvsioW2', '2020-11-23', 7, 0, 0),
('qwlMwdfpSlYHO4ayO65YruvsioW2', '2020-10-01', 8, 5, 0),
('qwlMwdfpSlYHO4ayO65YruvsioW2', '2020-10-01', 9, 4, 0),
('qwlMwdfpSlYHO4ayO65YruvsioW2', '2020-10-01', 10, 12, 0),
('qwlMwdfpSlYHO4ayO65YruvsioW2', '2020-11-16', 11, 8, 0),
('qwlMwdfpSlYHO4ayO65YruvsioW2', '2020-10-01', 13, 0, 0),
('qwlMwdfpSlYHO4ayO65YruvsioW2', '2020-10-01', 14, 0, 0),
('qwlMwdfpSlYHO4ayO65YruvsioW2', '2020-10-01', 15, 2, 0),
('qwlMwdfpSlYHO4ayO65YruvsioW2', '2020-10-01', 16, 5, 0),
('qwlMwdfpSlYHO4ayO65YruvsioW2', '2020-10-01', 17, 4, 0),
('qwlMwdfpSlYHO4ayO65YruvsioW2', '2020-10-01', 18, 0, 0),
('qwlMwdfpSlYHO4ayO65YruvsioW2', '2020-10-01', 19, 0, 0),
('qwlMwdfpSlYHO4ayO65YruvsioW2', '2020-10-01', 20, 0, 0),
('qwlMwdfpSlYHO4ayO65YruvsioW2', '2020-10-01', 21, 0, 0),
('qwlMwdfpSlYHO4ayO65YruvsioW2', '2020-10-12', 22, 8, 0),
('qwlMwdfpSlYHO4ayO65YruvsioW2', '2020-10-01', 23, 0, 0),
('qwlMwdfpSlYHO4ayO65YruvsioW2', '2020-10-01', 24, 6, 0),
('qwlMwdfpSlYHO4ayO65YruvsioW2', '2020-10-01', 25, 5, 0),
('qwlMwdfpSlYHO4ayO65YruvsioW2', '2020-10-01', 26, 3, 0),
('qwlMwdfpSlYHO4ayO65YruvsioW2', '2020-10-01', 27, 0, 0),
('R1Rzicm3iSR4EWqJ8AweoADEEPU2', '2020-12-01', 1, 1, 0),
('R1Rzicm3iSR4EWqJ8AweoADEEPU2', '2020-12-01', 2, 1, 0),
('R1Rzicm3iSR4EWqJ8AweoADEEPU2', '2020-12-01', 3, 1, 0),
('R1Rzicm3iSR4EWqJ8AweoADEEPU2', '2020-12-01', 4, 0, 0),
('R1Rzicm3iSR4EWqJ8AweoADEEPU2', '2020-12-01', 5, 0, 0),
('R1Rzicm3iSR4EWqJ8AweoADEEPU2', '2020-12-01', 6, 0, 0),
('R1Rzicm3iSR4EWqJ8AweoADEEPU2', '2020-12-01', 7, 0, 0),
('R1Rzicm3iSR4EWqJ8AweoADEEPU2', '2020-12-01', 8, 2, 0),
('R1Rzicm3iSR4EWqJ8AweoADEEPU2', '2020-12-01', 9, 2, 0),
('R1Rzicm3iSR4EWqJ8AweoADEEPU2', '2020-12-01', 10, 4, 0),
('R1Rzicm3iSR4EWqJ8AweoADEEPU2', '2020-12-01', 11, 0, 0),
('R1Rzicm3iSR4EWqJ8AweoADEEPU2', '2020-12-01', 13, 0, 0),
('R1Rzicm3iSR4EWqJ8AweoADEEPU2', '2020-12-01', 14, 0, 0),
('R1Rzicm3iSR4EWqJ8AweoADEEPU2', '2020-12-01', 15, 1, 0),
('R1Rzicm3iSR4EWqJ8AweoADEEPU2', '2020-12-01', 16, 3, 0),
('R1Rzicm3iSR4EWqJ8AweoADEEPU2', '2020-12-01', 17, 2, 0),
('R1Rzicm3iSR4EWqJ8AweoADEEPU2', '2020-12-01', 18, 0, 0),
('R1Rzicm3iSR4EWqJ8AweoADEEPU2', '2020-12-01', 19, 0, 0),
('R1Rzicm3iSR4EWqJ8AweoADEEPU2', '2020-12-01', 20, 0, 0),
('R1Rzicm3iSR4EWqJ8AweoADEEPU2', '2020-12-01', 21, 0, 0),
('R1Rzicm3iSR4EWqJ8AweoADEEPU2', '2020-12-01', 22, 0, 0),
('R1Rzicm3iSR4EWqJ8AweoADEEPU2', '2020-12-01', 23, 0, 0),
('R1Rzicm3iSR4EWqJ8AweoADEEPU2', '2020-12-01', 24, 3, 0),
('R1Rzicm3iSR4EWqJ8AweoADEEPU2', '2020-12-01', 25, 2, 0),
('R1Rzicm3iSR4EWqJ8AweoADEEPU2', '2020-12-01', 26, 2, 0),
('R1Rzicm3iSR4EWqJ8AweoADEEPU2', '2020-12-01', 27, 0, 0),
('r5nzd3WDpDV9ZFBWewZj6pWRA2g1', '2020-07-03', 1, 4, 0),
('r5nzd3WDpDV9ZFBWewZj6pWRA2g1', '2020-07-03', 2, 1, 0),
('r5nzd3WDpDV9ZFBWewZj6pWRA2g1', '2020-07-03', 3, 1, 0),
('r5nzd3WDpDV9ZFBWewZj6pWRA2g1', '2020-12-07', 4, 1, 0),
('r5nzd3WDpDV9ZFBWewZj6pWRA2g1', '2020-12-06', 5, 0, 0),
('r5nzd3WDpDV9ZFBWewZj6pWRA2g1', '2020-12-06', 6, 0, 0),
('r5nzd3WDpDV9ZFBWewZj6pWRA2g1', '2020-07-06', 7, 4, 0),
('r5nzd3WDpDV9ZFBWewZj6pWRA2g1', '2020-07-03', 8, 5, 0),
('r5nzd3WDpDV9ZFBWewZj6pWRA2g1', '2020-07-03', 9, 4, 0),
('r5nzd3WDpDV9ZFBWewZj6pWRA2g1', '2020-07-03', 10, 12, 0),
('r5nzd3WDpDV9ZFBWewZj6pWRA2g1', '2020-07-06', 11, 8, 0),
('r5nzd3WDpDV9ZFBWewZj6pWRA2g1', '2020-12-06', 13, 2, 0),
('r5nzd3WDpDV9ZFBWewZj6pWRA2g1', '2020-07-03', 14, 0, 0),
('r5nzd3WDpDV9ZFBWewZj6pWRA2g1', '2020-07-03', 15, 2, 0),
('r5nzd3WDpDV9ZFBWewZj6pWRA2g1', '2020-07-03', 16, 5, 0),
('r5nzd3WDpDV9ZFBWewZj6pWRA2g1', '2020-07-03', 17, 4, 0),
('r5nzd3WDpDV9ZFBWewZj6pWRA2g1', '2020-07-06', 18, 21, 0),
('r5nzd3WDpDV9ZFBWewZj6pWRA2g1', '2020-07-06', 19, 13, 0),
('r5nzd3WDpDV9ZFBWewZj6pWRA2g1', '2020-07-03', 20, 0, 0),
('r5nzd3WDpDV9ZFBWewZj6pWRA2g1', '2020-07-03', 21, 0, 0),
('r5nzd3WDpDV9ZFBWewZj6pWRA2g1', '2020-07-03', 22, 36, 0),
('r5nzd3WDpDV9ZFBWewZj6pWRA2g1', '2020-07-03', 23, 19, 0),
('r5nzd3WDpDV9ZFBWewZj6pWRA2g1', '2020-07-03', 24, 6, 0),
('r5nzd3WDpDV9ZFBWewZj6pWRA2g1', '2020-07-03', 25, 5, 0),
('r5nzd3WDpDV9ZFBWewZj6pWRA2g1', '2020-07-03', 26, 3, 0),
('r5nzd3WDpDV9ZFBWewZj6pWRA2g1', '2020-12-06', 27, 0, 0),
('rAyRVlNoyqOa7wGhdSv4czARqOb2', '2020-06-30', 1, 1, 0),
('rAyRVlNoyqOa7wGhdSv4czARqOb2', '2020-06-30', 2, 1, 0),
('rAyRVlNoyqOa7wGhdSv4czARqOb2', '2020-06-30', 3, 1, 0),
('rAyRVlNoyqOa7wGhdSv4czARqOb2', '2020-06-30', 4, 0, 0),
('rAyRVlNoyqOa7wGhdSv4czARqOb2', '2020-06-30', 5, 7, 0),
('rAyRVlNoyqOa7wGhdSv4czARqOb2', '2020-06-30', 6, 7, 0),
('rAyRVlNoyqOa7wGhdSv4czARqOb2', '2020-06-30', 7, 7, 0),
('rAyRVlNoyqOa7wGhdSv4czARqOb2', '2020-06-30', 8, 5, 0),
('rAyRVlNoyqOa7wGhdSv4czARqOb2', '2020-06-30', 9, 4, 0),
('rAyRVlNoyqOa7wGhdSv4czARqOb2', '2020-06-30', 10, 12, 0),
('rAyRVlNoyqOa7wGhdSv4czARqOb2', '2020-06-30', 11, 28, 0),
('rAyRVlNoyqOa7wGhdSv4czARqOb2', '2020-06-30', 13, 7, 0),
('rAyRVlNoyqOa7wGhdSv4czARqOb2', '2020-06-30', 14, 7, 0),
('rAyRVlNoyqOa7wGhdSv4czARqOb2', '2020-06-30', 15, 2, 0),
('rAyRVlNoyqOa7wGhdSv4czARqOb2', '2020-06-30', 16, 5, 0),
('rAyRVlNoyqOa7wGhdSv4czARqOb2', '2020-06-30', 17, 4, 0),
('rAyRVlNoyqOa7wGhdSv4czARqOb2', '2020-06-30', 18, 28, 0),
('rAyRVlNoyqOa7wGhdSv4czARqOb2', '2020-06-30', 19, 14, 0),
('rAyRVlNoyqOa7wGhdSv4czARqOb2', '2020-06-30', 20, 0, 0),
('rAyRVlNoyqOa7wGhdSv4czARqOb2', '2020-06-30', 21, 0, 0),
('rAyRVlNoyqOa7wGhdSv4czARqOb2', '2020-06-30', 22, 42, 0),
('rAyRVlNoyqOa7wGhdSv4czARqOb2', '2020-06-30', 23, 28, 0),
('rAyRVlNoyqOa7wGhdSv4czARqOb2', '2020-06-30', 24, 6, 0),
('rAyRVlNoyqOa7wGhdSv4czARqOb2', '2020-06-30', 25, 5, 0),
('rAyRVlNoyqOa7wGhdSv4czARqOb2', '2020-06-30', 26, 3, 0),
('rAyRVlNoyqOa7wGhdSv4czARqOb2', '2020-06-30', 27, 0, 0),
('S3GsuN6sgrNSq24j7OMzgsSiY5h1', '2020-06-27', 1, 0, 0),
('S3GsuN6sgrNSq24j7OMzgsSiY5h1', '2020-06-27', 2, 1, 0),
('S3GsuN6sgrNSq24j7OMzgsSiY5h1', '2020-06-27', 3, 0, 0),
('S3GsuN6sgrNSq24j7OMzgsSiY5h1', '2020-06-27', 4, 0, 0),
('S3GsuN6sgrNSq24j7OMzgsSiY5h1', '2020-06-27', 5, 0, 0),
('S3GsuN6sgrNSq24j7OMzgsSiY5h1', '2020-06-27', 6, 0, 0),
('S3GsuN6sgrNSq24j7OMzgsSiY5h1', '2020-06-27', 7, 0, 0),
('S3GsuN6sgrNSq24j7OMzgsSiY5h1', '2020-06-27', 8, 5, 0),
('S3GsuN6sgrNSq24j7OMzgsSiY5h1', '2020-06-27', 9, 4, 0),
('S3GsuN6sgrNSq24j7OMzgsSiY5h1', '2020-06-27', 10, 12, 0),
('S3GsuN6sgrNSq24j7OMzgsSiY5h1', '2020-06-27', 11, 0, 0),
('S3GsuN6sgrNSq24j7OMzgsSiY5h1', '2020-06-27', 13, 0, 0),
('S3GsuN6sgrNSq24j7OMzgsSiY5h1', '2020-06-27', 14, 0, 0),
('S3GsuN6sgrNSq24j7OMzgsSiY5h1', '2020-06-27', 15, 2, 0),
('S3GsuN6sgrNSq24j7OMzgsSiY5h1', '2020-06-27', 16, 5, 0),
('S3GsuN6sgrNSq24j7OMzgsSiY5h1', '2020-06-27', 17, 4, 0),
('S3GsuN6sgrNSq24j7OMzgsSiY5h1', '2020-06-27', 18, 0, 0),
('S3GsuN6sgrNSq24j7OMzgsSiY5h1', '2020-06-27', 19, 0, 0),
('S3GsuN6sgrNSq24j7OMzgsSiY5h1', '2020-06-27', 20, 0, 0),
('S3GsuN6sgrNSq24j7OMzgsSiY5h1', '2020-06-27', 21, 0, 0),
('S3GsuN6sgrNSq24j7OMzgsSiY5h1', '2020-06-27', 22, 0, 0),
('S3GsuN6sgrNSq24j7OMzgsSiY5h1', '2020-06-27', 23, 0, 0),
('S3GsuN6sgrNSq24j7OMzgsSiY5h1', '2020-06-27', 24, 6, 0),
('S3GsuN6sgrNSq24j7OMzgsSiY5h1', '2020-06-27', 25, 5, 0),
('S3GsuN6sgrNSq24j7OMzgsSiY5h1', '2020-06-27', 26, 3, 0),
('S3GsuN6sgrNSq24j7OMzgsSiY5h1', '2020-06-27', 27, 0, 0),
('SSGMwIZ3xKOVkrOJmoDAJEe9o0W2', '2020-07-02', 1, 0, 0),
('SSGMwIZ3xKOVkrOJmoDAJEe9o0W2', '2020-06-28', 2, 1, 0),
('SSGMwIZ3xKOVkrOJmoDAJEe9o0W2', '2020-06-28', 3, 0, 0),
('SSGMwIZ3xKOVkrOJmoDAJEe9o0W2', '2020-07-02', 4, 0, 0),
('SSGMwIZ3xKOVkrOJmoDAJEe9o0W2', '2020-07-02', 5, 5, 0),
('SSGMwIZ3xKOVkrOJmoDAJEe9o0W2', '2020-07-02', 6, 6, 0),
('SSGMwIZ3xKOVkrOJmoDAJEe9o0W2', '2020-07-02', 7, 5, 0),
('SSGMwIZ3xKOVkrOJmoDAJEe9o0W2', '2020-06-28', 8, 5, 0),
('SSGMwIZ3xKOVkrOJmoDAJEe9o0W2', '2020-06-28', 9, 4, 0),
('SSGMwIZ3xKOVkrOJmoDAJEe9o0W2', '2020-06-28', 10, 12, 0),
('SSGMwIZ3xKOVkrOJmoDAJEe9o0W2', '2020-07-02', 11, 22, 0),
('SSGMwIZ3xKOVkrOJmoDAJEe9o0W2', '2020-07-01', 13, 6, 0),
('SSGMwIZ3xKOVkrOJmoDAJEe9o0W2', '2020-07-01', 14, 3, 0),
('SSGMwIZ3xKOVkrOJmoDAJEe9o0W2', '2020-06-28', 15, 2, 0),
('SSGMwIZ3xKOVkrOJmoDAJEe9o0W2', '2020-06-28', 16, 5, 0),
('SSGMwIZ3xKOVkrOJmoDAJEe9o0W2', '2020-06-28', 17, 4, 0),
('SSGMwIZ3xKOVkrOJmoDAJEe9o0W2', '2020-07-02', 18, 23, 0),
('SSGMwIZ3xKOVkrOJmoDAJEe9o0W2', '2020-07-02', 19, 8, 0),
('SSGMwIZ3xKOVkrOJmoDAJEe9o0W2', '2020-06-28', 20, 0, 0),
('SSGMwIZ3xKOVkrOJmoDAJEe9o0W2', '2020-06-28', 21, 0, 0),
('SSGMwIZ3xKOVkrOJmoDAJEe9o0W2', '2020-07-02', 22, 41, 0),
('SSGMwIZ3xKOVkrOJmoDAJEe9o0W2', '2020-11-19', 23, 12, 0),
('SSGMwIZ3xKOVkrOJmoDAJEe9o0W2', '2020-06-28', 24, 6, 0),
('SSGMwIZ3xKOVkrOJmoDAJEe9o0W2', '2020-06-28', 25, 5, 0),
('SSGMwIZ3xKOVkrOJmoDAJEe9o0W2', '2020-06-28', 26, 3, 0),
('SSGMwIZ3xKOVkrOJmoDAJEe9o0W2', '2020-11-19', 27, 0, 0),
('UOktAX3U2dXLrl3YTNoX45jw3Ib2', '2020-07-02', 1, 0, 0),
('UOktAX3U2dXLrl3YTNoX45jw3Ib2', '2020-07-02', 2, 1, 0),
('UOktAX3U2dXLrl3YTNoX45jw3Ib2', '2020-07-02', 3, 0, 0),
('UOktAX3U2dXLrl3YTNoX45jw3Ib2', '2020-07-02', 4, 0, 0),
('UOktAX3U2dXLrl3YTNoX45jw3Ib2', '2020-07-02', 5, 0, 0),
('UOktAX3U2dXLrl3YTNoX45jw3Ib2', '2020-07-02', 6, 0, 0),
('UOktAX3U2dXLrl3YTNoX45jw3Ib2', '2020-07-02', 7, 0, 0),
('UOktAX3U2dXLrl3YTNoX45jw3Ib2', '2020-07-02', 8, 5, 0),
('UOktAX3U2dXLrl3YTNoX45jw3Ib2', '2020-07-02', 9, 4, 0),
('UOktAX3U2dXLrl3YTNoX45jw3Ib2', '2020-07-02', 10, 12, 0),
('UOktAX3U2dXLrl3YTNoX45jw3Ib2', '2020-07-02', 11, 0, 0),
('UOktAX3U2dXLrl3YTNoX45jw3Ib2', '2020-07-02', 13, 0, 0),
('UOktAX3U2dXLrl3YTNoX45jw3Ib2', '2020-07-02', 14, 0, 0),
('UOktAX3U2dXLrl3YTNoX45jw3Ib2', '2020-07-02', 15, 2, 0),
('UOktAX3U2dXLrl3YTNoX45jw3Ib2', '2020-07-02', 16, 5, 0),
('UOktAX3U2dXLrl3YTNoX45jw3Ib2', '2020-07-02', 17, 4, 0),
('UOktAX3U2dXLrl3YTNoX45jw3Ib2', '2020-07-02', 18, 0, 0),
('UOktAX3U2dXLrl3YTNoX45jw3Ib2', '2020-07-02', 19, 0, 0),
('UOktAX3U2dXLrl3YTNoX45jw3Ib2', '2020-07-02', 20, 0, 0),
('UOktAX3U2dXLrl3YTNoX45jw3Ib2', '2020-07-02', 21, 0, 0),
('UOktAX3U2dXLrl3YTNoX45jw3Ib2', '2020-07-02', 22, 0, 0),
('UOktAX3U2dXLrl3YTNoX45jw3Ib2', '2020-07-02', 23, 0, 0),
('UOktAX3U2dXLrl3YTNoX45jw3Ib2', '2020-07-02', 24, 6, 0),
('UOktAX3U2dXLrl3YTNoX45jw3Ib2', '2020-07-02', 25, 5, 0),
('UOktAX3U2dXLrl3YTNoX45jw3Ib2', '2020-07-02', 26, 3, 0),
('UOktAX3U2dXLrl3YTNoX45jw3Ib2', '2020-07-02', 27, 0, 0),
('WcnUgxlCFlSs4KH0wmVzstCtFGq1', '2020-07-25', 1, 1, 0),
('WcnUgxlCFlSs4KH0wmVzstCtFGq1', '2020-07-25', 2, 1, 0),
('WcnUgxlCFlSs4KH0wmVzstCtFGq1', '2020-07-25', 3, 0, 0),
('WcnUgxlCFlSs4KH0wmVzstCtFGq1', '2020-07-25', 4, 0, 0),
('WcnUgxlCFlSs4KH0wmVzstCtFGq1', '2020-07-25', 5, 7, 0),
('WcnUgxlCFlSs4KH0wmVzstCtFGq1', '2020-07-25', 6, 0, 0),
('WcnUgxlCFlSs4KH0wmVzstCtFGq1', '2020-07-25', 7, 7, 0),
('WcnUgxlCFlSs4KH0wmVzstCtFGq1', '2020-07-25', 8, 5, 0),
('WcnUgxlCFlSs4KH0wmVzstCtFGq1', '2020-07-25', 9, 4, 0),
('WcnUgxlCFlSs4KH0wmVzstCtFGq1', '2020-07-25', 10, 12, 0),
('WcnUgxlCFlSs4KH0wmVzstCtFGq1', '2020-07-25', 11, 6, 0),
('WcnUgxlCFlSs4KH0wmVzstCtFGq1', '2020-07-25', 13, 0, 0),
('WcnUgxlCFlSs4KH0wmVzstCtFGq1', '2020-07-25', 14, 0, 0),
('WcnUgxlCFlSs4KH0wmVzstCtFGq1', '2020-07-25', 15, 2, 0),
('WcnUgxlCFlSs4KH0wmVzstCtFGq1', '2020-07-25', 16, 5, 0),
('WcnUgxlCFlSs4KH0wmVzstCtFGq1', '2020-07-25', 17, 4, 0),
('WcnUgxlCFlSs4KH0wmVzstCtFGq1', '2020-07-25', 18, 0, 0),
('WcnUgxlCFlSs4KH0wmVzstCtFGq1', '2020-07-25', 19, 0, 0),
('WcnUgxlCFlSs4KH0wmVzstCtFGq1', '2020-07-25', 20, 0, 0),
('WcnUgxlCFlSs4KH0wmVzstCtFGq1', '2020-07-25', 21, 0, 0),
('WcnUgxlCFlSs4KH0wmVzstCtFGq1', '2020-07-25', 22, 0, 0),
('WcnUgxlCFlSs4KH0wmVzstCtFGq1', '2020-07-25', 23, 0, 0),
('WcnUgxlCFlSs4KH0wmVzstCtFGq1', '2020-07-25', 24, 6, 0),
('WcnUgxlCFlSs4KH0wmVzstCtFGq1', '2020-07-25', 25, 5, 0),
('WcnUgxlCFlSs4KH0wmVzstCtFGq1', '2020-07-25', 26, 3, 0),
('WcnUgxlCFlSs4KH0wmVzstCtFGq1', '2020-07-25', 27, 0, 0),
('xDwOqPCTV3WSdq7atK8bVuVmJfD3', '2020-07-19', 1, 0, 0),
('xDwOqPCTV3WSdq7atK8bVuVmJfD3', '2020-07-19', 2, 1, 0),
('xDwOqPCTV3WSdq7atK8bVuVmJfD3', '2020-07-19', 3, 0, 0),
('xDwOqPCTV3WSdq7atK8bVuVmJfD3', '2020-07-19', 4, 0, 0),
('xDwOqPCTV3WSdq7atK8bVuVmJfD3', '2020-07-19', 5, 3, 0),
('xDwOqPCTV3WSdq7atK8bVuVmJfD3', '2020-07-19', 6, 3, 0),
('xDwOqPCTV3WSdq7atK8bVuVmJfD3', '2020-07-19', 7, 2, 0),
('xDwOqPCTV3WSdq7atK8bVuVmJfD3', '2020-07-19', 8, 5, 0),
('xDwOqPCTV3WSdq7atK8bVuVmJfD3', '2020-07-19', 9, 4, 0),
('xDwOqPCTV3WSdq7atK8bVuVmJfD3', '2020-07-19', 10, 12, 0),
('xDwOqPCTV3WSdq7atK8bVuVmJfD3', '2020-07-19', 11, 0, 0),
('xDwOqPCTV3WSdq7atK8bVuVmJfD3', '2020-07-19', 13, 0, 0),
('xDwOqPCTV3WSdq7atK8bVuVmJfD3', '2020-07-19', 14, 0, 0),
('xDwOqPCTV3WSdq7atK8bVuVmJfD3', '2020-07-19', 15, 2, 0),
('xDwOqPCTV3WSdq7atK8bVuVmJfD3', '2020-07-19', 16, 5, 0),
('xDwOqPCTV3WSdq7atK8bVuVmJfD3', '2020-07-19', 17, 4, 0),
('xDwOqPCTV3WSdq7atK8bVuVmJfD3', '2020-07-19', 18, 0, 0),
('xDwOqPCTV3WSdq7atK8bVuVmJfD3', '2020-07-19', 19, 0, 0),
('xDwOqPCTV3WSdq7atK8bVuVmJfD3', '2020-07-19', 20, 0, 0),
('xDwOqPCTV3WSdq7atK8bVuVmJfD3', '2020-07-19', 21, 0, 0),
('xDwOqPCTV3WSdq7atK8bVuVmJfD3', '2020-07-19', 22, 0, 0),
('xDwOqPCTV3WSdq7atK8bVuVmJfD3', '2020-07-19', 23, 0, 0),
('xDwOqPCTV3WSdq7atK8bVuVmJfD3', '2020-07-19', 24, 6, 0),
('xDwOqPCTV3WSdq7atK8bVuVmJfD3', '2020-07-19', 25, 5, 0),
('xDwOqPCTV3WSdq7atK8bVuVmJfD3', '2020-07-19', 26, 3, 0),
('xDwOqPCTV3WSdq7atK8bVuVmJfD3', '2020-07-19', 27, 0, 0),
('xTkSLi25eQTdvHc8ZKQ2Z9zF31n2', '2020-08-05', 1, 0, 0),
('xTkSLi25eQTdvHc8ZKQ2Z9zF31n2', '2020-08-05', 2, 1, 0),
('xTkSLi25eQTdvHc8ZKQ2Z9zF31n2', '2020-08-05', 3, 0, 0),
('xTkSLi25eQTdvHc8ZKQ2Z9zF31n2', '2020-08-05', 4, 0, 0),
('xTkSLi25eQTdvHc8ZKQ2Z9zF31n2', '2020-08-05', 5, 0, 0),
('xTkSLi25eQTdvHc8ZKQ2Z9zF31n2', '2020-08-05', 6, 0, 0),
('xTkSLi25eQTdvHc8ZKQ2Z9zF31n2', '2020-08-05', 7, 0, 0),
('xTkSLi25eQTdvHc8ZKQ2Z9zF31n2', '2020-08-05', 8, 5, 0),
('xTkSLi25eQTdvHc8ZKQ2Z9zF31n2', '2020-08-05', 9, 4, 0),
('xTkSLi25eQTdvHc8ZKQ2Z9zF31n2', '2020-08-05', 10, 12, 0),
('xTkSLi25eQTdvHc8ZKQ2Z9zF31n2', '2020-08-05', 11, 0, 0),
('xTkSLi25eQTdvHc8ZKQ2Z9zF31n2', '2020-08-05', 13, 0, 0),
('xTkSLi25eQTdvHc8ZKQ2Z9zF31n2', '2020-08-05', 14, 0, 0),
('xTkSLi25eQTdvHc8ZKQ2Z9zF31n2', '2020-08-05', 15, 2, 0),
('xTkSLi25eQTdvHc8ZKQ2Z9zF31n2', '2020-08-05', 16, 5, 0),
('xTkSLi25eQTdvHc8ZKQ2Z9zF31n2', '2020-08-05', 17, 4, 0),
('xTkSLi25eQTdvHc8ZKQ2Z9zF31n2', '2020-08-05', 18, 0, 0),
('xTkSLi25eQTdvHc8ZKQ2Z9zF31n2', '2020-08-05', 19, 0, 0),
('xTkSLi25eQTdvHc8ZKQ2Z9zF31n2', '2020-08-05', 20, 0, 0),
('xTkSLi25eQTdvHc8ZKQ2Z9zF31n2', '2020-08-05', 21, 0, 0),
('xTkSLi25eQTdvHc8ZKQ2Z9zF31n2', '2020-08-05', 22, 0, 0),
('xTkSLi25eQTdvHc8ZKQ2Z9zF31n2', '2020-08-05', 23, 0, 0),
('xTkSLi25eQTdvHc8ZKQ2Z9zF31n2', '2020-08-05', 24, 6, 0),
('xTkSLi25eQTdvHc8ZKQ2Z9zF31n2', '2020-08-05', 25, 5, 0),
('xTkSLi25eQTdvHc8ZKQ2Z9zF31n2', '2020-08-05', 26, 3, 0),
('xTkSLi25eQTdvHc8ZKQ2Z9zF31n2', '2020-08-05', 27, 0, 0),
('Y4xU7AUblHhmTUVo5gHrjEaHsmF2', '2020-07-06', 1, 4, 0),
('Y4xU7AUblHhmTUVo5gHrjEaHsmF2', '2020-07-06', 2, 1, 0),
('Y4xU7AUblHhmTUVo5gHrjEaHsmF2', '2020-07-06', 3, 1, 0),
('Y4xU7AUblHhmTUVo5gHrjEaHsmF2', '2020-07-06', 4, 1, 0),
('Y4xU7AUblHhmTUVo5gHrjEaHsmF2', '2020-07-06', 5, 4, 0),
('Y4xU7AUblHhmTUVo5gHrjEaHsmF2', '2020-07-06', 6, 0, 0),
('Y4xU7AUblHhmTUVo5gHrjEaHsmF2', '2020-07-06', 7, 0, 0),
('Y4xU7AUblHhmTUVo5gHrjEaHsmF2', '2020-07-06', 8, 5, 0),
('Y4xU7AUblHhmTUVo5gHrjEaHsmF2', '2020-07-06', 9, 4, 0),
('Y4xU7AUblHhmTUVo5gHrjEaHsmF2', '2020-07-06', 10, 12, 0),
('Y4xU7AUblHhmTUVo5gHrjEaHsmF2', '2020-07-06', 11, 0, 0),
('Y4xU7AUblHhmTUVo5gHrjEaHsmF2', '2020-07-06', 13, 0, 0),
('Y4xU7AUblHhmTUVo5gHrjEaHsmF2', '2020-07-06', 14, 0, 0),
('Y4xU7AUblHhmTUVo5gHrjEaHsmF2', '2020-07-06', 15, 2, 0),
('Y4xU7AUblHhmTUVo5gHrjEaHsmF2', '2020-07-06', 16, 5, 0),
('Y4xU7AUblHhmTUVo5gHrjEaHsmF2', '2020-07-06', 17, 4, 0),
('Y4xU7AUblHhmTUVo5gHrjEaHsmF2', '2020-07-06', 18, 0, 0),
('Y4xU7AUblHhmTUVo5gHrjEaHsmF2', '2020-07-06', 19, 0, 0),
('Y4xU7AUblHhmTUVo5gHrjEaHsmF2', '2020-07-06', 20, 0, 0),
('Y4xU7AUblHhmTUVo5gHrjEaHsmF2', '2020-07-06', 21, 0, 0),
('Y4xU7AUblHhmTUVo5gHrjEaHsmF2', '2020-07-06', 22, 0, 0),
('Y4xU7AUblHhmTUVo5gHrjEaHsmF2', '2020-07-06', 23, 0, 0),
('Y4xU7AUblHhmTUVo5gHrjEaHsmF2', '2020-07-06', 24, 6, 0),
('Y4xU7AUblHhmTUVo5gHrjEaHsmF2', '2020-07-06', 25, 5, 0),
('Y4xU7AUblHhmTUVo5gHrjEaHsmF2', '2020-07-06', 26, 3, 0),
('Y4xU7AUblHhmTUVo5gHrjEaHsmF2', '2020-07-06', 27, 0, 0),
('yjKr0gG1gZaQdVHcWEygMo5beZn2', '2020-07-05', 1, 3, 0),
('yjKr0gG1gZaQdVHcWEygMo5beZn2', '2020-07-02', 2, 1, 0),
('yjKr0gG1gZaQdVHcWEygMo5beZn2', '2020-07-12', 3, 0, 0),
('yjKr0gG1gZaQdVHcWEygMo5beZn2', '2020-07-12', 4, 1, 0),
('yjKr0gG1gZaQdVHcWEygMo5beZn2', '2020-07-12', 5, 4, 0),
('yjKr0gG1gZaQdVHcWEygMo5beZn2', '2020-07-05', 6, 3, 0),
('yjKr0gG1gZaQdVHcWEygMo5beZn2', '2020-07-12', 7, 4, 0),
('yjKr0gG1gZaQdVHcWEygMo5beZn2', '2020-07-02', 8, 5, 0),
('yjKr0gG1gZaQdVHcWEygMo5beZn2', '2020-07-02', 9, 4, 0),
('yjKr0gG1gZaQdVHcWEygMo5beZn2', '2020-07-02', 10, 12, 0),
('yjKr0gG1gZaQdVHcWEygMo5beZn2', '2020-07-12', 11, 19, 0),
('yjKr0gG1gZaQdVHcWEygMo5beZn2', '2020-07-12', 13, 5, 0),
('yjKr0gG1gZaQdVHcWEygMo5beZn2', '2020-07-05', 14, 2, 0),
('yjKr0gG1gZaQdVHcWEygMo5beZn2', '2020-07-02', 15, 2, 0),
('yjKr0gG1gZaQdVHcWEygMo5beZn2', '2020-07-02', 16, 5, 0),
('yjKr0gG1gZaQdVHcWEygMo5beZn2', '2020-07-02', 17, 4, 0),
('yjKr0gG1gZaQdVHcWEygMo5beZn2', '2020-07-05', 18, 12, 0),
('yjKr0gG1gZaQdVHcWEygMo5beZn2', '2020-07-05', 19, 9, 0),
('yjKr0gG1gZaQdVHcWEygMo5beZn2', '2020-07-02', 20, 0, 0),
('yjKr0gG1gZaQdVHcWEygMo5beZn2', '2020-07-02', 21, 0, 0),
('yjKr0gG1gZaQdVHcWEygMo5beZn2', '2020-07-12', 22, 35, 0),
('yjKr0gG1gZaQdVHcWEygMo5beZn2', '2020-07-12', 23, 15, 0),
('yjKr0gG1gZaQdVHcWEygMo5beZn2', '2020-07-02', 24, 6, 0),
('yjKr0gG1gZaQdVHcWEygMo5beZn2', '2020-07-02', 25, 5, 0),
('yjKr0gG1gZaQdVHcWEygMo5beZn2', '2020-07-02', 26, 3, 0),
('yjKr0gG1gZaQdVHcWEygMo5beZn2', '2020-07-02', 27, 0, 0),
('ZIZVrXyTx8hwfvdTFAkrVCNpdYD2', '2020-06-30', 1, 0, 0),
('ZIZVrXyTx8hwfvdTFAkrVCNpdYD2', '2020-06-30', 2, 1, 0),
('ZIZVrXyTx8hwfvdTFAkrVCNpdYD2', '2020-06-30', 3, 0, 0),
('ZIZVrXyTx8hwfvdTFAkrVCNpdYD2', '2020-06-30', 4, 0, 0),
('ZIZVrXyTx8hwfvdTFAkrVCNpdYD2', '2020-06-30', 5, 0, 0),
('ZIZVrXyTx8hwfvdTFAkrVCNpdYD2', '2020-06-30', 6, 0, 0),
('ZIZVrXyTx8hwfvdTFAkrVCNpdYD2', '2020-06-30', 7, 0, 0),
('ZIZVrXyTx8hwfvdTFAkrVCNpdYD2', '2020-06-30', 8, 5, 0),
('ZIZVrXyTx8hwfvdTFAkrVCNpdYD2', '2020-06-30', 9, 4, 0),
('ZIZVrXyTx8hwfvdTFAkrVCNpdYD2', '2020-06-30', 10, 12, 0),
('ZIZVrXyTx8hwfvdTFAkrVCNpdYD2', '2020-06-30', 11, 0, 0),
('ZIZVrXyTx8hwfvdTFAkrVCNpdYD2', '2020-06-30', 13, 0, 0),
('ZIZVrXyTx8hwfvdTFAkrVCNpdYD2', '2020-06-30', 14, 0, 0),
('ZIZVrXyTx8hwfvdTFAkrVCNpdYD2', '2020-06-30', 15, 2, 0),
('ZIZVrXyTx8hwfvdTFAkrVCNpdYD2', '2020-06-30', 16, 5, 0),
('ZIZVrXyTx8hwfvdTFAkrVCNpdYD2', '2020-06-30', 17, 4, 0),
('ZIZVrXyTx8hwfvdTFAkrVCNpdYD2', '2020-06-30', 18, 0, 0),
('ZIZVrXyTx8hwfvdTFAkrVCNpdYD2', '2020-06-30', 19, 0, 0),
('ZIZVrXyTx8hwfvdTFAkrVCNpdYD2', '2020-06-30', 20, 0, 0),
('ZIZVrXyTx8hwfvdTFAkrVCNpdYD2', '2020-06-30', 21, 0, 0),
('ZIZVrXyTx8hwfvdTFAkrVCNpdYD2', '2020-06-30', 22, 0, 0),
('ZIZVrXyTx8hwfvdTFAkrVCNpdYD2', '2020-06-30', 23, 0, 0),
('ZIZVrXyTx8hwfvdTFAkrVCNpdYD2', '2020-06-30', 24, 6, 0),
('ZIZVrXyTx8hwfvdTFAkrVCNpdYD2', '2020-06-30', 25, 5, 0),
('ZIZVrXyTx8hwfvdTFAkrVCNpdYD2', '2020-06-30', 26, 3, 0),
('ZIZVrXyTx8hwfvdTFAkrVCNpdYD2', '2020-06-30', 27, 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chapter`
--
ALTER TABLE `chapter`
  ADD PRIMARY KEY (`chapter_id`),
  ADD UNIQUE KEY `chapterName_UNIQUE` (`chapter_name`);

--
-- Indexes for table `chapter2`
--
ALTER TABLE `chapter2`
  ADD PRIMARY KEY (`chapter_id`),
  ADD UNIQUE KEY `chapter_name_UNIQUE` (`chapter_name`);

--
-- Indexes for table `feedbacktext`
--
ALTER TABLE `feedbacktext`
  ADD PRIMARY KEY (`under_or_equal_seccess_percent`);

--
-- Indexes for table `goals_or_habits`
--
ALTER TABLE `goals_or_habits`
  ADD PRIMARY KEY (`user_name`);

--
-- Indexes for table `points_max`
--
ALTER TABLE `points_max`
  ADD PRIMARY KEY (`chapter_id`);

--
-- Indexes for table `points_max2`
--
ALTER TABLE `points_max2`
  ADD PRIMARY KEY (`chapter_id`);

--
-- Indexes for table `setting`
--
ALTER TABLE `setting`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_name`),
  ADD KEY `user_name_inx` (`user_name`);

--
-- Indexes for table `user_cups`
--
ALTER TABLE `user_cups`
  ADD PRIMARY KEY (`user_name`,`chapter_id`),
  ADD KEY `user_cups-chapter_idx` (`chapter_id`),
  ADD KEY `user_cups-user_name_idx` (`user_name`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `goals_or_habits`
--
ALTER TABLE `goals_or_habits`
  ADD CONSTRAINT `goals_or_habits__user` FOREIGN KEY (`user_name`) REFERENCES `user` (`user_name`);

--
-- Constraints for table `points_max`
--
ALTER TABLE `points_max`
  ADD CONSTRAINT `distribution_of_points-chapter` FOREIGN KEY (`chapter_id`) REFERENCES `chapter` (`chapter_id`);

--
-- Constraints for table `user_cups`
--
ALTER TABLE `user_cups`
  ADD CONSTRAINT `user_cups-chapter` FOREIGN KEY (`chapter_id`) REFERENCES `chapter` (`chapter_id`),
  ADD CONSTRAINT `user_cups-user` FOREIGN KEY (`user_name`) REFERENCES `user` (`user_name`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

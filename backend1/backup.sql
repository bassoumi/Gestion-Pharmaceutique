-- MySQL dump 10.13  Distrib 8.0.37, for Win64 (x86_64)
--
-- Host: localhost    Database: DBroussource
-- ------------------------------------------------------
-- Server version	8.0.37

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
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add article',7,'add_article'),(26,'Can change article',7,'change_article'),(27,'Can delete article',7,'delete_article'),(28,'Can view article',7,'view_article'),(29,'Can add employe',8,'add_employe'),(30,'Can change employe',8,'change_employe'),(31,'Can delete employe',8,'delete_employe'),(32,'Can view employe',8,'view_employe'),(33,'Can add formation',9,'add_formation'),(34,'Can change formation',9,'change_formation'),(35,'Can delete formation',9,'delete_formation'),(36,'Can view formation',9,'view_formation'),(37,'Can add formation admin',10,'add_formationadmin'),(38,'Can change formation admin',10,'change_formationadmin'),(39,'Can delete formation admin',10,'delete_formationadmin'),(40,'Can view formation admin',10,'view_formationadmin'),(41,'Can add formation interssant',11,'add_formationinterssant'),(42,'Can change formation interssant',11,'change_formationinterssant'),(43,'Can delete formation interssant',11,'delete_formationinterssant'),(44,'Can view formation interssant',11,'view_formationinterssant'),(45,'Can add fournisseur',12,'add_fournisseur'),(46,'Can change fournisseur',12,'change_fournisseur'),(47,'Can delete fournisseur',12,'delete_fournisseur'),(48,'Can view fournisseur',12,'view_fournisseur'),(49,'Can add leave request',13,'add_leaverequest'),(50,'Can change leave request',13,'change_leaverequest'),(51,'Can delete leave request',13,'delete_leaverequest'),(52,'Can view leave request',13,'view_leaverequest'),(53,'Can add leave request admin',14,'add_leaverequestadmin'),(54,'Can change leave request admin',14,'change_leaverequestadmin'),(55,'Can delete leave request admin',14,'delete_leaverequestadmin'),(56,'Can view leave request admin',14,'view_leaverequestadmin'),(57,'Can add commande',15,'add_commande'),(58,'Can change commande',15,'change_commande'),(59,'Can delete commande',15,'delete_commande'),(60,'Can view commande',15,'view_commande'),(61,'Can add admin action demande',16,'add_adminactiondemande'),(62,'Can change admin action demande',16,'change_adminactiondemande'),(63,'Can delete admin action demande',16,'delete_adminactiondemande'),(64,'Can view admin action demande',16,'view_adminactiondemande'),(65,'Can add action demande',17,'add_actiondemande'),(66,'Can change action demande',17,'change_actiondemande'),(67,'Can delete action demande',17,'delete_actiondemande'),(68,'Can view action demande',17,'view_actiondemande'),(69,'Can add ligne commande',18,'add_lignecommande'),(70,'Can change ligne commande',18,'change_lignecommande'),(71,'Can delete ligne commande',18,'delete_lignecommande'),(72,'Can view ligne commande',18,'view_lignecommande'),(73,'Can add profile',19,'add_profile'),(74,'Can change profile',19,'change_profile'),(75,'Can delete profile',19,'delete_profile'),(76,'Can view profile',19,'view_profile'),(77,'Can add blacklisted token',20,'add_blacklistedtoken'),(78,'Can change blacklisted token',20,'change_blacklistedtoken'),(79,'Can delete blacklisted token',20,'delete_blacklistedtoken'),(80,'Can view blacklisted token',20,'view_blacklistedtoken'),(81,'Can add outstanding token',21,'add_outstandingtoken'),(82,'Can change outstanding token',21,'change_outstandingtoken'),(83,'Can delete outstanding token',21,'delete_outstandingtoken'),(84,'Can view outstanding token',21,'view_outstandingtoken'),(85,'Can add livraison ligne',22,'add_livraisonligne'),(86,'Can change livraison ligne',22,'change_livraisonligne'),(87,'Can delete livraison ligne',22,'delete_livraisonligne'),(88,'Can view livraison ligne',22,'view_livraisonligne'),(89,'Can add livraison',23,'add_livraison'),(90,'Can change livraison',23,'change_livraison'),(91,'Can delete livraison',23,'delete_livraison'),(92,'Can view livraison',23,'view_livraison'),(93,'Can add avoir lot',24,'add_avoirlot'),(94,'Can change avoir lot',24,'change_avoirlot'),(95,'Can delete avoir lot',24,'delete_avoirlot'),(96,'Can view avoir lot',24,'view_avoirlot');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$720000$mFranVFvFjSVOeuzIXPvKB$lEU0ZqcrE1oklVWG55FKK4ufrHHWtG9ge4zg7ygoRpQ=',NULL,1,'admin','','','',1,1,'2024-07-09 14:33:32.298556');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(5,'contenttypes','contenttype'),(6,'sessions','session'),(20,'token_blacklist','blacklistedtoken'),(21,'token_blacklist','outstandingtoken'),(17,'users','actiondemande'),(16,'users','adminactiondemande'),(7,'users','article'),(24,'users','avoirlot'),(15,'users','commande'),(8,'users','employe'),(9,'users','formation'),(10,'users','formationadmin'),(11,'users','formationinterssant'),(12,'users','fournisseur'),(13,'users','leaverequest'),(14,'users','leaverequestadmin'),(18,'users','lignecommande'),(23,'users','livraison'),(22,'users','livraisonligne'),(19,'users','profile');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2024-07-09 14:31:00.878570'),(2,'auth','0001_initial','2024-07-09 14:31:01.456746'),(3,'admin','0001_initial','2024-07-09 14:31:01.597290'),(4,'admin','0002_logentry_remove_auto_add','2024-07-09 14:31:01.602559'),(5,'admin','0003_logentry_add_action_flag_choices','2024-07-09 14:31:01.610724'),(6,'contenttypes','0002_remove_content_type_name','2024-07-09 14:31:01.677899'),(7,'auth','0002_alter_permission_name_max_length','2024-07-09 14:31:01.741683'),(8,'auth','0003_alter_user_email_max_length','2024-07-09 14:31:01.762070'),(9,'auth','0004_alter_user_username_opts','2024-07-09 14:31:01.770579'),(10,'auth','0005_alter_user_last_login_null','2024-07-09 14:31:01.821229'),(11,'auth','0006_require_contenttypes_0002','2024-07-09 14:31:01.824321'),(12,'auth','0007_alter_validators_add_error_messages','2024-07-09 14:31:01.830514'),(13,'auth','0008_alter_user_username_max_length','2024-07-09 14:31:01.884709'),(14,'auth','0009_alter_user_last_name_max_length','2024-07-09 14:31:01.940041'),(15,'auth','0010_alter_group_name_max_length','2024-07-09 14:31:01.958106'),(16,'auth','0011_update_proxy_permissions','2024-07-09 14:31:01.965402'),(17,'auth','0012_alter_user_first_name_max_length','2024-07-09 14:31:02.023508'),(18,'sessions','0001_initial','2024-07-09 14:31:02.057102'),(19,'token_blacklist','0001_initial','2024-07-09 14:31:02.202804'),(20,'token_blacklist','0002_outstandingtoken_jti_hex','2024-07-09 14:31:02.226136'),(21,'token_blacklist','0003_auto_20171017_2007','2024-07-09 14:31:02.234703'),(22,'token_blacklist','0004_auto_20171017_2013','2024-07-09 14:31:02.304420'),(23,'token_blacklist','0005_remove_outstandingtoken_jti','2024-07-09 14:31:02.351587'),(24,'token_blacklist','0006_auto_20171017_2113','2024-07-09 14:31:02.374456'),(25,'token_blacklist','0007_auto_20171017_2214','2024-07-09 14:31:02.571751'),(26,'token_blacklist','0008_migrate_to_bigautofield','2024-07-09 14:31:02.789018'),(27,'token_blacklist','0010_fix_migrate_to_bigautofield','2024-07-09 14:31:02.792861'),(28,'token_blacklist','0011_linearizes_history','2024-07-09 14:31:02.801194'),(29,'token_blacklist','0012_alter_outstandingtoken_user','2024-07-09 14:31:02.809897'),(30,'users','0001_initial','2024-07-09 14:31:03.434191'),(31,'users','0002_alter_article_cond_prod','2024-07-09 14:53:27.353903'),(32,'users','0003_rename_ref_fournisseur_commande_cde_four_and_more','2024-07-09 21:19:38.173902'),(33,'users','0004_rename_date_commande_commande_date_com_and_more','2024-07-10 12:30:15.852302'),(34,'users','0005_livraison_livraisonligne','2024-07-16 11:18:43.173393'),(35,'users','0006_rename_arr_liv_livraison_arr_liv_and_more','2024-07-19 19:01:49.850396'),(36,'users','0007_alter_livraisonligne_arr_liv','2024-07-20 10:02:04.862716'),(37,'users','0008_alter_livraison_arr_liv','2024-07-20 10:07:04.932395'),(38,'users','0009_alter_livraisonligne_num_liv','2024-07-20 10:49:56.846322'),(39,'users','0010_alter_livraison_num_liv','2024-07-20 17:33:42.212842'),(40,'users','0011_alter_article_pri_acht_prod_and_more','2024-07-23 09:57:38.165893'),(41,'users','0012_alter_fournisseur_fax_four_and_more','2024-07-23 10:58:36.698854'),(42,'users','0013_alter_fournisseur_fax_four_and_more','2024-07-23 10:59:37.693263'),(43,'users','0014_alter_commande_etat','2024-07-23 11:42:01.727598'),(44,'users','0015_alter_livraison_etat_liv_alter_livraison_num_com','2024-07-23 12:22:44.841212'),(45,'users','0016_remove_article_cond_prod_article_type_prod_and_more','2024-07-24 19:25:02.300822'),(46,'users','0017_rename_cond_prod_article_cond_prod_and_more','2024-07-24 19:50:03.257901'),(47,'users','0018_livraison_cde_four','2024-07-24 20:31:05.130796'),(48,'users','0019_rename_qte_liv_livraisonligne_qte_com','2024-07-25 10:23:12.830100'),(49,'users','0020_livraisonligne_qte_liv','2024-07-25 10:55:49.985673'),(50,'users','0021_remove_livraisonligne_arr_liv','2024-07-25 11:02:55.311967'),(51,'users','0022_alter_livraisonligne_qte_liv','2024-07-25 11:19:02.877599'),(52,'users','0023_avoirlot','2024-07-25 17:00:41.520384'),(53,'users','0024_alter_avoirlot_prix_acht_lot_and_more','2024-07-25 18:11:45.515418'),(54,'users','0025_livraisonligne_arrivage_liv','2024-08-02 15:09:27.548701');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token_blacklist_blacklistedtoken`
--

DROP TABLE IF EXISTS `token_blacklist_blacklistedtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token_blacklist_blacklistedtoken` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `blacklisted_at` datetime(6) NOT NULL,
  `token_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token_id` (`token_id`),
  CONSTRAINT `token_blacklist_blacklistedtoken_token_id_3cc7fe56_fk` FOREIGN KEY (`token_id`) REFERENCES `token_blacklist_outstandingtoken` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token_blacklist_blacklistedtoken`
--

LOCK TABLES `token_blacklist_blacklistedtoken` WRITE;
/*!40000 ALTER TABLE `token_blacklist_blacklistedtoken` DISABLE KEYS */;
INSERT INTO `token_blacklist_blacklistedtoken` VALUES (1,'2024-07-11 11:50:44.012151',7),(2,'2024-07-23 12:23:29.966511',30);
/*!40000 ALTER TABLE `token_blacklist_blacklistedtoken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token_blacklist_outstandingtoken`
--

DROP TABLE IF EXISTS `token_blacklist_outstandingtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token_blacklist_outstandingtoken` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `token` longtext NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `expires_at` datetime(6) NOT NULL,
  `user_id` int DEFAULT NULL,
  `jti` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token_blacklist_outstandingtoken_jti_hex_d9bdf6f7_uniq` (`jti`),
  KEY `token_blacklist_outs_user_id_83bc629a_fk_auth_user` (`user_id`),
  CONSTRAINT `token_blacklist_outs_user_id_83bc629a_fk_auth_user` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token_blacklist_outstandingtoken`
--

LOCK TABLES `token_blacklist_outstandingtoken` WRITE;
/*!40000 ALTER TABLE `token_blacklist_outstandingtoken` DISABLE KEYS */;
INSERT INTO `token_blacklist_outstandingtoken` VALUES (1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMTE0MDQ4MywiaWF0IjoxNzIwNTM1NjgzLCJqdGkiOiI0OWUzNzQzNGVkMmE0ODk2YWEwNmNlOTcxZThmZDc5ZSIsInVzZXJfaWQiOjF9.f5cj7gtO_SuZhctn5bipOmiNeG67VsGeit6_zMPFOvI','2024-07-09 14:34:43.127258','2024-07-16 14:34:43.000000',1,'49e37434ed2a4896aa06ce971e8fd79e'),(2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMTE2NDM5MCwiaWF0IjoxNzIwNTU5NTkwLCJqdGkiOiIzYTUyY2JkMGEzMzA0ZmI4OGU3NTM2ZmNmZWIzMmRjMCIsInVzZXJfaWQiOjF9.hExX077EvlAPVjsrVgzn1xYGJE4rl_0Xbjymj6hUugI','2024-07-09 21:13:10.241628','2024-07-16 21:13:10.000000',1,'3a52cbd0a3304fb88e7536fcfeb32dc0'),(3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMTE2ODAwMywiaWF0IjoxNzIwNTYzMjAzLCJqdGkiOiI2OWQ4N2IxNTAzNzg0ZGNjYWE0YTYxNTlhNzY5ZTY2MyIsInVzZXJfaWQiOjF9.lPTs7nC9iznINr-jtLZnOLJGH9RH1Y-Ougye3F3aNfw','2024-07-09 22:13:23.044024','2024-07-16 22:13:23.000000',1,'69d87b1503784dccaa4a6159a769e663'),(4,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMTIxOTEzOSwiaWF0IjoxNzIwNjE0MzM5LCJqdGkiOiJmZGE1NTRkODhhZjc0OTMxYmRjZmU2YWRhNGE5MzVjZCIsInVzZXJfaWQiOjF9.ickgRnPQ1d3bzXm7hoGbNpDwMPIesoe9XQkNyKjJu_Q','2024-07-10 12:25:39.409315','2024-07-17 12:25:39.000000',1,'fda554d88af74931bdcfe6ada4a935cd'),(5,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMTIyMTAwOSwiaWF0IjoxNzIwNjE2MjA5LCJqdGkiOiI0YTMxOTk1OTZlYjA0NzU5OTA4NGJiMWI5ZTVhM2MzOCIsInVzZXJfaWQiOjF9.Va_I_mZZne5Xo0IpTp2IXIL_1i9qSxiJo-g1F2EFQn0','2024-07-10 12:56:49.558846','2024-07-17 12:56:49.000000',1,'4a3199596eb047599084bb1b9e5a3c38'),(6,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMTIyNTE2MiwiaWF0IjoxNzIwNjIwMzYyLCJqdGkiOiI2NTgwMDExYThkMGQ0NjgzYjI4ZjY2NmZlYjE4YmFkMSIsInVzZXJfaWQiOjF9.KyXqUtAfUgKaP_FpcbA9b9N50wP4H3rl6gqK9OUAfp4','2024-07-10 14:06:02.060971','2024-07-17 14:06:02.000000',1,'6580011a8d0d4683b28f666feb18bad1'),(7,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMTMwMDY0MywiaWF0IjoxNzIwNjk1ODQzLCJqdGkiOiJhZjc3MzZkZjAxMmY0NDAxYmM5NTM3MDgxZmY0MzgxOSIsInVzZXJfaWQiOjF9.t2I5jdmXASpqMcduiQh_2mNOULFPsZtVlZc9vwOU5D8','2024-07-11 11:04:03.165516','2024-07-18 11:04:03.000000',1,'af7736df012f4401bc9537081ff43819'),(8,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMTMwMzQ0OSwiaWF0IjoxNzIwNjk4NjQ5LCJqdGkiOiJhYjQwNjg0NGJlNmE0M2JmOTM2MDI3OTNjNTU0NTQxZSIsInVzZXJfaWQiOjF9.SivJFG1PwXcyBVzh3ZEooK91erII_exVu2vrdaP2b4o','2024-07-11 11:50:49.464625','2024-07-18 11:50:49.000000',1,'ab406844be6a43bf93602793c554541e'),(9,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMTMwNjQ5MywiaWF0IjoxNzIwNzAxNjkzLCJqdGkiOiJkZDljN2ExYTE3OWY0NTBiODIxMDM4ZjdjNjNjZWQ5OSIsInVzZXJfaWQiOjF9.gUy6jxNibw7q4Wm9dnGUVme6Ym-MI7R0JDkl_uJgsdY','2024-07-11 12:41:33.349578','2024-07-18 12:41:33.000000',1,'dd9c7a1a179f450b821038f7c63ced99'),(10,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMTMwNzg1MSwiaWF0IjoxNzIwNzAzMDUxLCJqdGkiOiIzZDZlNDgwYTdlNWU0NGYyODNhMTFhOWEyZDgyMDFlNiIsInVzZXJfaWQiOjF9.lBUSLkMjjM4qkURZ6PL5a0Sisc265WaFvr9eCNl1ayI','2024-07-11 13:04:11.165268','2024-07-18 13:04:11.000000',1,'3d6e480a7e5e44f283a11a9a2d8201e6'),(11,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMTMwODYzNSwiaWF0IjoxNzIwNzAzODM1LCJqdGkiOiIxOTRlNjU4YmEzNDk0NzkyYTcxY2YxZTczZDMxYjYwZSIsInVzZXJfaWQiOjF9.KhxTMobNR16TDGipDVZ_W1NQExt7Rm82rg1dQYallSo','2024-07-11 13:17:15.880271','2024-07-18 13:17:15.000000',1,'194e658ba3494792a71cf1e73d31b60e'),(12,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMTMzMDk2NiwiaWF0IjoxNzIwNzI2MTY2LCJqdGkiOiJhMDM1NWI0YzQ2YWI0YjRmYjE3NmFkNzQzYzk3NmMwNSIsInVzZXJfaWQiOjF9.t6502PPmKJ3TmGHSdeotXRXVktziE8snduTO9CGSiLE','2024-07-11 19:29:26.273747','2024-07-18 19:29:26.000000',1,'a0355b4c46ab4b4fb176ad743c976c05'),(13,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMTczMzMzNCwiaWF0IjoxNzIxMTI4NTM0LCJqdGkiOiI2NGRjNmZkYjdlZTA0MzU4YWE5Y2U2MDQwMWE4MGQyNSIsInVzZXJfaWQiOjF9.8Azm2Qk48uqNoWMJs45WB0XXgnSv65h2ZpItUC7BNOU','2024-07-16 11:15:34.669399','2024-07-23 11:15:34.000000',1,'64dc6fdb7ee04358aa9ce60401a80d25'),(14,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMTkwNzUwOSwiaWF0IjoxNzIxMzAyNzA5LCJqdGkiOiJkODM0ZjY5NTZlZDU0MjQ1ODBiZGMxMTc1YTQ5ZmJhNyIsInVzZXJfaWQiOjF9.99rMOH4yrwgbRy19G0sAfn7zPBDo_jEIhL-mBCk8nsE','2024-07-18 11:38:29.010193','2024-07-25 11:38:29.000000',1,'d834f6956ed5424580bdc1175a49fba7'),(15,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMTkxMTU0NywiaWF0IjoxNzIxMzA2NzQ3LCJqdGkiOiI5ZDg2MDViYmRlNmE0ZDNiYWRkZmRiYzcyNGFjMDlhNyIsInVzZXJfaWQiOjF9.j9tdAMt--uqHY_iL3yVoO4bPOPJe1WIfkzezJ3Q__Jo','2024-07-18 12:45:47.928480','2024-07-25 12:45:47.000000',1,'9d8605bbde6a4d3baddfdbc724ac09a7'),(16,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMTkzNTM2MCwiaWF0IjoxNzIxMzMwNTYwLCJqdGkiOiJiNjIwYjY5ZGQ0MzI0ZTE2YTA4NWYxZGM0MDMwZTEzOCIsInVzZXJfaWQiOjF9.913TVcAkKOWSKfdy_aqj8dhQueOLNlAJI_2hJIcExZE','2024-07-18 19:22:40.017757','2024-07-25 19:22:40.000000',1,'b620b69dd4324e16a085f1dc4030e138'),(17,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjAxODMyMSwiaWF0IjoxNzIxNDEzNTIxLCJqdGkiOiJhMzgxNjU0MzNjZGQ0ZDM1OTRkNTZlMjA2M2Y2MGJhZiIsInVzZXJfaWQiOjF9._24nqVsKzPDM4GOKf_FLJS1beOwujjPvz7akScNxuvs','2024-07-19 18:25:21.537848','2024-07-26 18:25:21.000000',1,'a38165433cdd4d3594d56e2063f60baf'),(18,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjA3MzEwNSwiaWF0IjoxNzIxNDY4MzA1LCJqdGkiOiI1NmU0MjNhYzNhOTg0MGY5OTY2MGZjYjM3NWI4Y2U0YyIsInVzZXJfaWQiOjF9.PTXZiWziz2TZlO-PB0xXMkeZGTj4C2f3shCDSwTDYTs','2024-07-20 09:38:25.195864','2024-07-27 09:38:25.000000',1,'56e423ac3a9840f99660fcb375b8ce4c'),(19,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjA3NjczNywiaWF0IjoxNzIxNDcxOTM3LCJqdGkiOiIzMDQ1ODkyYTNhMWE0N2RmODVkYjA2NThlZmM2ZWUxOSIsInVzZXJfaWQiOjF9.uRuhK82bYdOjyRh1IjaKg2uY_dcmaUpwEf_WtmDLD14','2024-07-20 10:38:57.059416','2024-07-27 10:38:57.000000',1,'3045892a3a1a47df85db0658efc6ee19'),(20,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjEwMTY0OCwiaWF0IjoxNzIxNDk2ODQ4LCJqdGkiOiI0NDg4NTJjZWIwOWE0NDc4YjgyNDJkYzVhZjdjY2IyNiIsInVzZXJfaWQiOjF9.D4pkZEvGchZfRlYilrW-ujeOmAz7dQKSFoOhx7If230','2024-07-20 17:34:08.788514','2024-07-27 17:34:08.000000',1,'448852ceb09a4478b8242dc5af7ccb26'),(21,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjExMTQwNywiaWF0IjoxNzIxNTA2NjA3LCJqdGkiOiIyOGY0MTk5OWFiMGI0MWQzYWZlZGM5MGZiNGFiMWZkNSIsInVzZXJfaWQiOjF9.jLhKNoqVjz_o9jlV9UkrR1ILp0Cibs3fqfIwQskVT5Q','2024-07-20 20:16:47.645718','2024-07-27 20:16:47.000000',1,'28f41999ab0b41d3afedc90fb4ab1fd5'),(22,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjE1OTIwNCwiaWF0IjoxNzIxNTU0NDA0LCJqdGkiOiJmZDMwYjE5NDY1ODY0ODNhOWYzM2U2YzIzNzkzODFmZiIsInVzZXJfaWQiOjF9.do23Ef3v9niR-HXuW8HYCOG-wIDxiUA1dc1LBCRYrP4','2024-07-21 09:33:24.394244','2024-07-28 09:33:24.000000',1,'fd30b1946586483a9f33e6c2379381ff'),(23,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjE2Mjk1NSwiaWF0IjoxNzIxNTU4MTU1LCJqdGkiOiI0OGZkYTU4Y2FkYzY0ZWJhYTYzMGEzZjM1ODcyMWE2NiIsInVzZXJfaWQiOjF9.OklHHteGd3mHZRb4zL9qBG_zD9wNgP_bUEbWKlvekd0','2024-07-21 10:35:55.649248','2024-07-28 10:35:55.000000',1,'48fda58cadc64ebaa630a3f358721a66'),(24,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjE5MTA3OSwiaWF0IjoxNzIxNTg2Mjc5LCJqdGkiOiJkZTVkNDE4NmRlMmM0NjM0YWUwOTIyNGIxZGRmYmEzOCIsInVzZXJfaWQiOjF9.47shE8Et8ZjZXLvQUqxCWx1_ZffaSUtKDLEO6eXKvIo','2024-07-21 18:24:39.007496','2024-07-28 18:24:39.000000',1,'de5d4186de2c4634ae09224b1ddfba38'),(25,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjE5MjA0MCwiaWF0IjoxNzIxNTg3MjQwLCJqdGkiOiI2NDhhYWMzNjBlMDU0YzQ4YmRkZWUzY2ZhYmI0Njk4NCIsInVzZXJfaWQiOjF9.WFftAr4tfkBWC6QPsBz_7FmuEpR1G3THFRes8xKH4FY','2024-07-21 18:40:40.844923','2024-07-28 18:40:40.000000',1,'648aac360e054c48bddee3cfabb46984'),(26,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjI0ODk5MywiaWF0IjoxNzIxNjQ0MTkzLCJqdGkiOiJjMTMzZDVlNmExODU0YTU1YjIyYmE0NWNkY2Y4ODEyOSIsInVzZXJfaWQiOjF9.2rYH_2O2BkFNvy34y4JGze6AAmn9qX2AGi8qgaypSzI','2024-07-22 10:29:53.840052','2024-07-29 10:29:53.000000',1,'c133d5e6a1854a55b22ba45cdcf88129'),(27,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjMzMjI2OSwiaWF0IjoxNzIxNzI3NDY5LCJqdGkiOiI3ZjI4ODdiOWQ5MWQ0YTRmYTI2OTg4NTQ5MWFhZTExNiIsInVzZXJfaWQiOjF9.DkSFILELBm_cuVZd1pNIsE4O_Ovcg5NAAmeuUcrw5Dk','2024-07-23 09:37:49.971942','2024-07-30 09:37:49.000000',1,'7f2887b9d91d4a4fa269885491aae116'),(28,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjMzMjg2OCwiaWF0IjoxNzIxNzI4MDY4LCJqdGkiOiIwYmUyMzgxYjgwODg0ZjQ1OWY5NTkzZGI1NGZiYTFiZCIsInVzZXJfaWQiOjF9.hM4EpujZJF9fBHwisSlxzoucDd1staqeX9LDOoSvRhY','2024-07-23 09:47:48.273733','2024-07-30 09:47:48.000000',1,'0be2381b80884f459f9593db54fba1bd'),(29,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjMzNjUyNSwiaWF0IjoxNzIxNzMxNzI1LCJqdGkiOiI5MjcwN2M0NTE1MDI0OGEyODYxYTNlNzBmZTBlYTA2MSIsInVzZXJfaWQiOjF9.aoBDAzZSLBJM_aLmIKtIbJunX2ePt4WyMFyEUVYgYUU','2024-07-23 10:48:45.799232','2024-07-30 10:48:45.000000',1,'92707c45150248a2861a3e70fe0ea061'),(30,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjM0MDIxNCwiaWF0IjoxNzIxNzM1NDE0LCJqdGkiOiIxYWUyMThiZTM5M2Q0NzlhYmJmNTVhNDA2NDkwNmYzMSIsInVzZXJfaWQiOjF9.9mbRNACJVFGCK6Ty1JvfqBlvesZoty4U1w7xCMGbJwc','2024-07-23 11:50:14.062459','2024-07-30 11:50:14.000000',1,'1ae218be393d479abbf55a4064906f31'),(31,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjM0MjIxOCwiaWF0IjoxNzIxNzM3NDE4LCJqdGkiOiI3MWU0NGE1OGJmZmQ0NTRmYjVmNmEyZGExZGE2NThhOSIsInVzZXJfaWQiOjF9.dzA0ZznaOaAtLVfMat9qm5CIIJlojlY8_-YvI1JplrI','2024-07-23 12:23:38.215326','2024-07-30 12:23:38.000000',1,'71e44a58bffd454fb5f6a2da1da658a9'),(32,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjM0NTg1NSwiaWF0IjoxNzIxNzQxMDU1LCJqdGkiOiI4MjgwYzZhZjVmM2E0MmVhODRlYzU0MTUwYTQ3MGJmOSIsInVzZXJfaWQiOjF9.pld33tFHVAoGTukd7fxAZD_5Ldr9DeCW0uiwKRTZJE0','2024-07-23 13:24:15.278353','2024-07-30 13:24:15.000000',1,'8280c6af5f3a42ea84ec54150a470bf9'),(33,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjM0Njg2NywiaWF0IjoxNzIxNzQyMDY3LCJqdGkiOiJkOTQ4ZTliMTA4MWM0MzA4OGExZjViYzY1OWIyYTk2MSIsInVzZXJfaWQiOjF9.RXBUdLhkka5wyLQ1mdisLKw4azMEoXDPvuVRvnd0qqI','2024-07-23 13:41:07.420772','2024-07-30 13:41:07.000000',1,'d948e9b1081c43088a1f5bc659b2a961'),(34,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjM3OTI1NCwiaWF0IjoxNzIxNzc0NDU0LCJqdGkiOiI0ZWY1Mjk3MjUxOTI0MzlmOGZhOTIyN2VlNGE1MzkwNiIsInVzZXJfaWQiOjF9.3V51yUCA935PYXqlI2O6IGihGk_QN3ghacwPLRBsmco','2024-07-23 22:40:54.839282','2024-07-30 22:40:54.000000',1,'4ef529725192439f8fa9227ee4a53906'),(35,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjQxMTY2MiwiaWF0IjoxNzIxODA2ODYyLCJqdGkiOiI3ZGUzZmFkOWFkYjA0Mjk2OGU0N2VlNGZmYzI4ZTk0ZCIsInVzZXJfaWQiOjF9.01bCRVaH4nUeo3ypxBy8DwqOPJaXvW809eOZN_psuQw','2024-07-24 07:41:02.842050','2024-07-31 07:41:02.000000',1,'7de3fad9adb042968e47ee4ffc28e94d'),(36,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjQxMTk5NCwiaWF0IjoxNzIxODA3MTk0LCJqdGkiOiJkYTc0ZGUwODgzZmI0YTQ2OWNjODlmYTBkMjg3YzlmNiIsInVzZXJfaWQiOjF9.yYjLh1zPg6XBuNQI_7RYoSVcNsBz-EnS67ZpX_N_PlI','2024-07-24 07:46:34.056016','2024-07-31 07:46:34.000000',1,'da74de0883fb4a469cc89fa0d287c9f6'),(37,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjQxODU2MSwiaWF0IjoxNzIxODEzNzYxLCJqdGkiOiIxNjIyZDRjMWE3MDk0YjZjODMxZThiOTRkMGE4OTlkYSIsInVzZXJfaWQiOjF9.qFmVg3XUZ88dqpQDl52xrD4ICc1shZifoVWx-54Lh3E','2024-07-24 09:36:01.598213','2024-07-31 09:36:01.000000',1,'1622d4c1a7094b6c831e8b94d0a899da'),(38,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjQyMDE5MCwiaWF0IjoxNzIxODE1MzkwLCJqdGkiOiI2NzFmZDRjOTVhN2E0YmVmYjUwNDZhYWUxZmJjMDQ2NCIsInVzZXJfaWQiOjF9.AOaHml6P2END3bwOXpUm5P_fhPQfg44FKdRby27MeEY','2024-07-24 10:03:10.417517','2024-07-31 10:03:10.000000',1,'671fd4c95a7a4befb5046aae1fbc0464'),(39,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjQ1MzA4NCwiaWF0IjoxNzIxODQ4Mjg0LCJqdGkiOiJlZjg0ZmQwOWYwNGY0Y2U5ODJiNzZlNWJlMDRjN2JiMSIsInVzZXJfaWQiOjF9.RFvctPDTbQsK_o9sa9x7MwHtbXUg2ZZOoi0liMNVvzA','2024-07-24 19:11:24.973168','2024-07-31 19:11:24.000000',1,'ef84fd09f04f4ce982b76e5be04c7bb1'),(40,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjQ1Njc0MywiaWF0IjoxNzIxODUxOTQzLCJqdGkiOiJlOGM4ZjI5YTU5ODI0ODczYTYyZWY5MTFjY2UwNjE4OCIsInVzZXJfaWQiOjF9._BCTGN_0mwW4AzdauZ0aTJ6RKq7SJ7VxkzsYyVMdai4','2024-07-24 20:12:23.138491','2024-07-31 20:12:23.000000',1,'e8c8f29a59824873a62ef911cce06188'),(41,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjQ2MDM4MiwiaWF0IjoxNzIxODU1NTgyLCJqdGkiOiI2ODRlNDNjNGE3MmE0YmMxYTAyZTlmYTdkMmYzN2FmNiIsInVzZXJfaWQiOjF9.v2l_JcYD7Mm2Le2PRfWqs6u-mRKddFtYYmz8stiuXzk','2024-07-24 21:13:02.406838','2024-07-31 21:13:02.000000',1,'684e43c4a72a4bc1a02e9fa7d2f37af6'),(42,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjUwNzIwNiwiaWF0IjoxNzIxOTAyNDA2LCJqdGkiOiJkYWE3ZDE1MDY1Zjc0ZGU2YjVkODk1M2M3ZDIwZWM3YyIsInVzZXJfaWQiOjF9.3eBiSrNeazNbKeSLupmbjCSV_hdZqqnTbw9lCHKpnvE','2024-07-25 10:13:26.564119','2024-08-01 10:13:26.000000',1,'daa7d15065f74de6b5d8953c7d20ec7c'),(43,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjUxMDg5NCwiaWF0IjoxNzIxOTA2MDk0LCJqdGkiOiI0MWUyY2Q2NGNkOGU0NWUwODBiNDY1YTZmNzA4Y2Y1OSIsInVzZXJfaWQiOjF9.cP4zdWvkRRZxLbHPiu5GcjyovqxBDITz26lVy3urFOA','2024-07-25 11:14:54.425840','2024-08-01 11:14:54.000000',1,'41e2cd64cd8e45e080b465a6f708cf59'),(44,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjUxNDY0MCwiaWF0IjoxNzIxOTA5ODQwLCJqdGkiOiJlNTE0MTZhYWRjNjQ0YjllYjdmMGM3Zjg0MTY4YjZiNiIsInVzZXJfaWQiOjF9.pwez5KQ5tDHdJZsiH_20p1iR7Tp7qFaJAXVv7cr0tNc','2024-07-25 12:17:20.001656','2024-08-01 12:17:20.000000',1,'e51416aadc644b9eb7f0c7f84168b6b6'),(45,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjUzMTU0MCwiaWF0IjoxNzIxOTI2NzQwLCJqdGkiOiIyYWM3MDRkZTE1MjE0NzZiOWM4MTIzZTM1MjQ5OTYzZCIsInVzZXJfaWQiOjF9.2sDSxPhcJWHyH_-eaUi9TpU0JdC5dI7BKYSywCPSyHQ','2024-07-25 16:59:00.536046','2024-08-01 16:59:00.000000',1,'2ac704de1521476b9c8123e35249963d'),(46,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjUzNTIxMywiaWF0IjoxNzIxOTMwNDEzLCJqdGkiOiI0NDc2NTMzMTQ1M2M0MDM5YjBlYzAyZGM1NjVkYTUwYyIsInVzZXJfaWQiOjF9.2lytO9kkmYsBAuA9WbcDyGgOospZ74oxwrHq5KQ5p_4','2024-07-25 18:00:13.715169','2024-08-01 18:00:13.000000',1,'44765331453c4039b0ec02dc565da50c'),(47,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjg2MzcwNCwiaWF0IjoxNzIyMjU4OTA0LCJqdGkiOiI1ZjVkMzM1MzEzODQ0NzUwYTE5YjU2YTA1MWMzNzVmYyIsInVzZXJfaWQiOjF9.OXaRTWvck3l7MW2C2ZVpYMUjyRujlPV8Urbo4gqQo4M','2024-07-29 13:15:04.688213','2024-08-05 13:15:04.000000',1,'5f5d335313844750a19b56a051c375fc'),(48,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjg2ODI1MSwiaWF0IjoxNzIyMjYzNDUxLCJqdGkiOiI3NjI4ZGVhODAyOTY0MTAyOWY1NmUxNTI5OTIzODZjNCIsInVzZXJfaWQiOjF9.Tp848X9uRTOKqawcKVeLZ5ywEnAEGp51ghCzQPBQhrc','2024-07-29 14:30:51.440342','2024-08-05 14:30:51.000000',1,'7628dea8029641029f56e152992386c4'),(49,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMzIxMTA0MCwiaWF0IjoxNzIyNjA2MjQwLCJqdGkiOiI5Y2RmMTdlMDYzM2M0MDRkODVlNzc1NjJjODQ4ZjMzMyIsInVzZXJfaWQiOjF9.UgIjCZ3UDqvIqMB-AFmAhDlae9wx-Jvesfv-TXq4bvs','2024-08-02 13:44:00.763880','2024-08-09 13:44:00.000000',1,'9cdf17e0633c404d85e77562c848f333'),(50,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMzIxMzg2NCwiaWF0IjoxNzIyNjA5MDY0LCJqdGkiOiIyODMxOTcyMjE0ZDE0ZDllYTJhOTk2ZWFmZGNjNzNkYyIsInVzZXJfaWQiOjF9.gms4YTDm8z3lHiEWaaDDoBlbtTpYLlpuAd45HmfjYLE','2024-08-02 14:31:04.072179','2024-08-09 14:31:04.000000',1,'2831972214d14d9ea2a996eafdcc73dc'),(51,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNDE1MjAyOSwiaWF0IjoxNzIzNTQ3MjI5LCJqdGkiOiIyOTliNWFjOWFkNzM0ZmJhOTRmNTg2ZTdlMzQ4ZjgzOCIsInVzZXJfaWQiOjF9.zmlpz58KQ5qBw3mWiExmLT5Ya22_v0LS3pRhjbU64Us','2024-08-13 11:07:09.021702','2024-08-20 11:07:09.000000',1,'299b5ac9ad734fba94f586e7e348f838');
/*!40000 ALTER TABLE `token_blacklist_outstandingtoken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_actiondemande`
--

DROP TABLE IF EXISTS `users_actiondemande`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_actiondemande` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `status` varchar(20) NOT NULL,
  `date_reponse` datetime(6) NOT NULL,
  `title` varchar(100) NOT NULL,
  `user` varchar(100) NOT NULL,
  `demande_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `users_actiondemande_demande_id_87ea8568_fk_users_leaverequest_id` (`demande_id`),
  CONSTRAINT `users_actiondemande_demande_id_87ea8568_fk_users_leaverequest_id` FOREIGN KEY (`demande_id`) REFERENCES `users_leaverequest` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_actiondemande`
--

LOCK TABLES `users_actiondemande` WRITE;
/*!40000 ALTER TABLE `users_actiondemande` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_actiondemande` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_adminactiondemande`
--

DROP TABLE IF EXISTS `users_adminactiondemande`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_adminactiondemande` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `status` varchar(20) NOT NULL,
  `date_reponse` datetime(6) NOT NULL,
  `title` varchar(100) NOT NULL,
  `user` varchar(100) NOT NULL,
  `demande_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `users_adminactiondem_demande_id_e1df7705_fk_users_lea` (`demande_id`),
  CONSTRAINT `users_adminactiondem_demande_id_e1df7705_fk_users_lea` FOREIGN KEY (`demande_id`) REFERENCES `users_leaverequest` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_adminactiondemande`
--

LOCK TABLES `users_adminactiondemande` WRITE;
/*!40000 ALTER TABLE `users_adminactiondemande` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_adminactiondemande` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_article`
--

DROP TABLE IF EXISTS `users_article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_article` (
  `CDE_PROD` varchar(20) NOT NULL,
  `LIB_PROD` varchar(250) NOT NULL,
  `PRI_ACHT_PROD` decimal(12,3) NOT NULL,
  `PRI_VENT_PROD` decimal(12,3) NOT NULL,
  `STOCK_PROD` int NOT NULL,
  `TYPE_PROD` varchar(50) NOT NULL,
  `COND_PROD` int NOT NULL,
  PRIMARY KEY (`CDE_PROD`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_article`
--

LOCK TABLES `users_article` WRITE;
/*!40000 ALTER TABLE `users_article` DISABLE KEYS */;
INSERT INTO `users_article` VALUES ('AR392','Cardiopril',50.000,55.000,120,'Medicament',10),('AR416','Lunavex',80.000,88.000,100,'Medicament',10),('AR449','Osteoflex',10.990,12.089,1300,'Dispositif',10),('AR825','Zytraxinol',10.000,11.000,100,'Medicament',10),('AR84','Cardiopril',50.000,55.000,100,'Medicament',10),('AR858','Flexicor',30.000,33.000,100,'Medicament',10),('AR956','Soludol',70.000,77.000,100,'Medicament',10),('AR967','adelxxuu',452.000,497.200,100,'Dispositif',10);
/*!40000 ALTER TABLE `users_article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_avoirlot`
--

DROP TABLE IF EXISTS `users_avoirlot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_avoirlot` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `NUM_LOT` varchar(30) NOT NULL,
  `CDE_PROD` varchar(20) NOT NULL,
  `DATE_PER` date NOT NULL,
  `QTE_LOT` int NOT NULL,
  `PRIX_ACHT_LOT` decimal(10,4) NOT NULL,
  `PRIX_VENT_LOT` decimal(10,4) NOT NULL,
  `SUSPENDU` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_avoirlot`
--

LOCK TABLES `users_avoirlot` WRITE;
/*!40000 ALTER TABLE `users_avoirlot` DISABLE KEYS */;
INSERT INTO `users_avoirlot` VALUES (1,'1','AR416','2024-07-25',50,80.0000,88.0000,NULL),(2,'1','AR392','2024-07-25',100,50.0000,55.0000,'non'),(3,'10','AR416','2024-07-25',100,80.0000,88.0000,NULL),(4,'3','AR416','2024-07-25',50,80.0000,88.0000,NULL),(5,'2','AR416','2024-07-25',50,80.0000,88.0000,'non'),(6,'3','AR858','2024-08-02',20,30.0000,33.0000,'non'),(7,'1','AR858','2024-08-02',20,30.0000,33.0000,'non'),(8,'2','AR858','2024-08-02',10,30.0000,33.0000,'non'),(9,'1','AR825','2024-08-02',10,10.0000,11.0000,'non'),(10,'1','AR449','2024-08-02',100,10.9900,12.0890,'non'),(11,'2','AR449','2024-08-13',200,10.9900,12.0890,'non'),(12,'2','AR392','2024-08-02',20,50.0000,55.0000,'non');
/*!40000 ALTER TABLE `users_avoirlot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_commande`
--

DROP TABLE IF EXISTS `users_commande`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_commande` (
  `NUM_COM` int NOT NULL AUTO_INCREMENT,
  `DATE_COM` datetime(6) NOT NULL,
  `CDE_FOUR_id` varchar(10) NOT NULL,
  `ETAT` varchar(50) NOT NULL,
  `OBSE` varchar(200) NOT NULL,
  PRIMARY KEY (`NUM_COM`),
  KEY `users_commande_CDE_FOUR_id_f92a8a65_fk_users_fou` (`CDE_FOUR_id`),
  CONSTRAINT `users_commande_CDE_FOUR_id_f92a8a65_fk_users_fou` FOREIGN KEY (`CDE_FOUR_id`) REFERENCES `users_fournisseur` (`CDE_FOUR`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_commande`
--

LOCK TABLES `users_commande` WRITE;
/*!40000 ALTER TABLE `users_commande` DISABLE KEYS */;
INSERT INTO `users_commande` VALUES (28,'2024-08-02 00:00:00.000000','FR2665','expediee','dfvdfv'),(29,'2024-08-13 00:00:00.000000','FR7549','livree','dfvdfv');
/*!40000 ALTER TABLE `users_commande` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_employe`
--

DROP TABLE IF EXISTS `users_employe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_employe` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `adresse` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `job` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `department` varchar(255) NOT NULL,
  `date` datetime(6) NOT NULL,
  `salaire` int NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_employe`
--

LOCK TABLES `users_employe` WRITE;
/*!40000 ALTER TABLE `users_employe` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_employe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_formation`
--

DROP TABLE IF EXISTS `users_formation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_formation` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `description` longtext NOT NULL,
  `date` date NOT NULL,
  `duration` bigint NOT NULL,
  `location` varchar(200) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_formation`
--

LOCK TABLES `users_formation` WRITE;
/*!40000 ALTER TABLE `users_formation` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_formation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_formationadmin`
--

DROP TABLE IF EXISTS `users_formationadmin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_formationadmin` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `description` longtext NOT NULL,
  `date` date NOT NULL,
  `duration` bigint NOT NULL,
  `location` varchar(200) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_formationadmin`
--

LOCK TABLES `users_formationadmin` WRITE;
/*!40000 ALTER TABLE `users_formationadmin` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_formationadmin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_formationinterssant`
--

DROP TABLE IF EXISTS `users_formationinterssant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_formationinterssant` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `name` longtext NOT NULL,
  `submitted_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_formationinterssant`
--

LOCK TABLES `users_formationinterssant` WRITE;
/*!40000 ALTER TABLE `users_formationinterssant` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_formationinterssant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_fournisseur`
--

DROP TABLE IF EXISTS `users_fournisseur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_fournisseur` (
  `CDE_FOUR` varchar(10) NOT NULL,
  `NOM_FOUR` varchar(100) NOT NULL,
  `ADR_FOUR` longtext NOT NULL,
  `TEL_PORT` varchar(30) NOT NULL,
  `TEL_BUR` varchar(15) NOT NULL,
  `FAX_FOUR` varchar(50) NOT NULL,
  `MAIL_FOUR` varchar(50) NOT NULL,
  PRIMARY KEY (`CDE_FOUR`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_fournisseur`
--

LOCK TABLES `users_fournisseur` WRITE;
/*!40000 ALTER TABLE `users_fournisseur` DISABLE KEYS */;
INSERT INTO `users_fournisseur` VALUES ('FR001','Euromedex','Sfax','978456199','5424','00197801','Euromedex@gmail.com'),('FR2665','Missionpharmxx','Rades,Tunise','97845615','71895616','00197856','Missionpharma@gmail.com'),('FR7549','Euromedex','Sfax','978456199','718956100','00197801','Euromedex@gmail.com'),('FR9414','Phoenix Pharma France','France','9784561545','7189561684','0019785655','PhoenixPharmaFrance@gmail.com'),('FR9415','Euromedex','Sfax','978456199','5424','00197801','Euromedex@gmail.com');
/*!40000 ALTER TABLE `users_fournisseur` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_leaverequest`
--

DROP TABLE IF EXISTS `users_leaverequest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_leaverequest` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user` longtext NOT NULL,
  `number_of_days` int NOT NULL,
  `reason` longtext NOT NULL,
  `date_debut` date NOT NULL,
  `title` varchar(255) NOT NULL,
  `submitted_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_leaverequest`
--

LOCK TABLES `users_leaverequest` WRITE;
/*!40000 ALTER TABLE `users_leaverequest` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_leaverequest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_leaverequestadmin`
--

DROP TABLE IF EXISTS `users_leaverequestadmin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_leaverequestadmin` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user` longtext NOT NULL,
  `number_of_days` int NOT NULL,
  `reason` longtext NOT NULL,
  `date_debut` date NOT NULL,
  `title` varchar(255) NOT NULL,
  `submitted_at` datetime(6) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_leaverequestadmin`
--

LOCK TABLES `users_leaverequestadmin` WRITE;
/*!40000 ALTER TABLE `users_leaverequestadmin` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_leaverequestadmin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_lignecommande`
--

DROP TABLE IF EXISTS `users_lignecommande`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_lignecommande` (
  `id` int NOT NULL AUTO_INCREMENT,
  `QTE_COM` int NOT NULL,
  `PRIX_COM` decimal(10,4) NOT NULL,
  `TOT_COM` decimal(10,4) NOT NULL,
  `CDE_PROD_id` varchar(20) NOT NULL,
  `NUM_COM_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `users_lignecommande_CDE_PROD_id_92dc54f9_fk_users_art` (`CDE_PROD_id`),
  KEY `users_lignecommande_NUM_COM_id_d8041ff6_fk_users_com` (`NUM_COM_id`),
  CONSTRAINT `users_lignecommande_CDE_PROD_id_92dc54f9_fk_users_art` FOREIGN KEY (`CDE_PROD_id`) REFERENCES `users_article` (`CDE_PROD`),
  CONSTRAINT `users_lignecommande_NUM_COM_id_d8041ff6_fk_users_com` FOREIGN KEY (`NUM_COM_id`) REFERENCES `users_commande` (`NUM_COM`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_lignecommande`
--

LOCK TABLES `users_lignecommande` WRITE;
/*!40000 ALTER TABLE `users_lignecommande` DISABLE KEYS */;
INSERT INTO `users_lignecommande` VALUES (13,10,108.9000,108.9000,'AR416',11),(14,10,108.9000,108.9000,'AR416',12),(15,10,55.0000,2640.0000,'AR392',13),(44,48,55.0000,2750.0000,'AR392',28),(45,30,88.0000,2640.0000,'AR416',28),(46,0,12.0890,1208.9000,'AR449',28),(47,30,12.0890,604.4500,'AR449',29);
/*!40000 ALTER TABLE `users_lignecommande` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_livraison`
--

DROP TABLE IF EXISTS `users_livraison`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_livraison` (
  `NUM_LIV` int NOT NULL AUTO_INCREMENT,
  `ARR_LIV` date NOT NULL,
  `NUM_COM` varchar(50) DEFAULT NULL,
  `DAT_LIV` date NOT NULL,
  `ETAT_LIV` varchar(50) DEFAULT NULL,
  `CDE_FOUR` varchar(50) NOT NULL,
  PRIMARY KEY (`NUM_LIV`)
) ENGINE=InnoDB AUTO_INCREMENT=425 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_livraison`
--

LOCK TABLES `users_livraison` WRITE;
/*!40000 ALTER TABLE `users_livraison` DISABLE KEYS */;
INSERT INTO `users_livraison` VALUES (420,'2024-08-02','28','2024-08-02','En attente','FR2665'),(421,'2024-08-02','28','2024-08-02','>En cours de traitement','FR2665'),(422,'2024-08-02','28','2024-08-02','>En cours de traitement','FR2665'),(423,'2024-08-02','28','2024-08-02','>En cours de traitement','FR2665'),(424,'2024-08-13','29','2024-08-13','>En cours de traitement','FR7549');
/*!40000 ALTER TABLE `users_livraison` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_livraisonligne`
--

DROP TABLE IF EXISTS `users_livraisonligne`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_livraisonligne` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `CDE_PROD` varchar(20) NOT NULL,
  `NUM_LOT` varchar(30) NOT NULL,
  `PRIX_LIV` decimal(10,3) NOT NULL,
  `DATE_PER` date NOT NULL,
  `QTE_COM` int unsigned NOT NULL,
  `NUM_LIV_id` int NOT NULL,
  `QTE_LIV` int unsigned NOT NULL,
  `ARRIVAGE_LIV` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `users_livraisonligne_NUM_LIV_id_57ac8534_fk` (`NUM_LIV_id`),
  CONSTRAINT `users_livraisonligne_NUM_LIV_id_57ac8534_fk` FOREIGN KEY (`NUM_LIV_id`) REFERENCES `users_livraison` (`NUM_LIV`),
  CONSTRAINT `users_livraisonligne_chk_1` CHECK ((`ARRIVAGE_LIV` >= 0)),
  CONSTRAINT `users_livraisonligne_QTE_COM_50e16e9f_check` CHECK ((`QTE_COM` >= 0)),
  CONSTRAINT `users_livraisonligne_QTE_LIV_42c6189d_check` CHECK ((`QTE_LIV` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_livraisonligne`
--

LOCK TABLES `users_livraisonligne` WRITE;
/*!40000 ALTER TABLE `users_livraisonligne` DISABLE KEYS */;
INSERT INTO `users_livraisonligne` VALUES (1,'AR475','3',3.000,'2024-07-12',4,1,0,0),(2,'AR756','3',3.000,'2024-07-20',4,3,0,0),(3,'AR475','3',3.000,'2024-07-20',4,4,0,0),(4,'AR475','4',4.000,'2024-08-03',5,9,0,0),(5,'AR475','4',4.000,'2024-07-20',5,10,0,0),(6,'AR475','4',4.000,'2024-07-20',5,98,0,0),(7,'AR475','4',4.000,'2024-07-20',5,99,0,0),(8,'AR756','4',4.000,'2024-07-20',5,33,0,0),(9,'AR475','4',4.000,'2024-07-20',5,334,0,0),(10,'AR475','4',4.000,'2024-07-20',5,335,0,0),(11,'AR756','4',4.000,'2024-07-20',5,80,0,0),(12,'AR756','4',4.000,'2024-07-20',5,336,0,0),(13,'AR756','4',4.000,'2024-07-20',5,337,0,0),(14,'AR756','554',4.000,'2024-07-20',5,338,0,0),(15,'AR756','4',4.000,'2024-07-20',5,339,0,0),(16,'AR756','4',4.000,'2024-07-20',5,340,0,0),(17,'AR756','4',4.000,'2024-07-20',5,341,0,0),(18,'AR756','4',4.000,'2024-07-20',5,342,0,0),(19,'AR475','4',4.000,'2024-07-20',5,343,0,0),(20,'AR475','4',4.000,'2024-07-21',8,344,0,0),(21,'AR756','1',45.000,'2024-07-21',90,344,0,0),(22,'AR416','5',227.800,'2024-07-26',2,345,0,0),(23,'AR416','1',118.900,'2024-07-23',1,345,0,0),(109,'AR449','1',549.500,'2024-08-02',100,420,50,0),(110,'AR449','1',109.900,'2024-08-02',50,421,10,0),(111,'AR449','2',439.600,'2024-08-02',40,422,40,0),(112,'AR392','2',100.000,'2024-08-02',50,423,2,30),(113,'AR449','2',219.800,'2024-08-13',50,424,20,2);
/*!40000 ALTER TABLE `users_livraisonligne` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_profile`
--

DROP TABLE IF EXISTS `users_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_profile` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `phone_number` varchar(15) DEFAULT NULL,
  `id_card` varchar(20) DEFAULT NULL,
  `NUM_COMpte` varchar(20) DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `users_profile_user_id_2112e78d_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_profile`
--

LOCK TABLES `users_profile` WRITE;
/*!40000 ALTER TABLE `users_profile` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_profile` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-17 16:54:30

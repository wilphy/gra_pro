/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50544
 Source Host           : localhost:3306
 Source Schema         : gra

 Target Server Type    : MySQL
 Target Server Version : 50544
 File Encoding         : 65001

 Date: 21/07/2018 23:32:15
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `ID` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES (1, 'admin', '827ccb0eea8a706c4c34a16891f84e7b');
INSERT INTO `admin` VALUES (2, 'wey', '01cfcd4f6b8770febfb40cb906715822');

-- ----------------------------
-- Table structure for banner
-- ----------------------------
DROP TABLE IF EXISTS `banner`;
CREATE TABLE `banner`  (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `src` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '图片地址',
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of banner
-- ----------------------------
INSERT INTO `banner` VALUES (3, 'http://localhost:9527/public/img/1.jpg');
INSERT INTO `banner` VALUES (4, 'http://localhost:9527/public/img/2.jpg');
INSERT INTO `banner` VALUES (12, 'http://localhost:9527/public/img/4.jpg	');

-- ----------------------------
-- Table structure for comp_info
-- ----------------------------
DROP TABLE IF EXISTS `comp_info`;
CREATE TABLE `comp_info`  (
  `comp_info_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`comp_info_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of comp_info
-- ----------------------------
INSERT INTO `comp_info` VALUES (1, '百度');
INSERT INTO `comp_info` VALUES (2, '阿里');
INSERT INTO `comp_info` VALUES (3, '腾讯');

-- ----------------------------
-- Table structure for comp_user
-- ----------------------------
DROP TABLE IF EXISTS `comp_user`;
CREATE TABLE `comp_user`  (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `online` bit(1) NOT NULL,
  `intro` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `email` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of comp_user
-- ----------------------------
INSERT INTO `comp_user` VALUES (1, 'aaaaaa', 'aaaaaa', b'1', NULL, NULL);
INSERT INTO `comp_user` VALUES (2, 'bbbbbb', 'bbbbbb', b'0', NULL, NULL);
INSERT INTO `comp_user` VALUES (8, 'cccccc', 'cccccc', b'1', NULL, NULL);

-- ----------------------------
-- Table structure for job
-- ----------------------------
DROP TABLE IF EXISTS `job`;
CREATE TABLE `job`  (
  `job_id` int(11) NOT NULL AUTO_INCREMENT,
  `job_name` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '职位名称',
  `job_comp` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '发布公司',
  `job_desc` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '职位描述',
  `job_req` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '职位要求',
  `email` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '企业邮箱',
  PRIMARY KEY (`job_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of job
-- ----------------------------
INSERT INTO `job` VALUES (1, '游泳教练', '北理珠泳池', '游泳培训', '专业技能', '111@qq.com');
INSERT INTO `job` VALUES (2, '吉他手', '音乐小镇', '驻唱', '帅', '222@qq.com');
INSERT INTO `job` VALUES (3, '厨师', '新东方', '做饭', '好吃', '333@qq.com');
INSERT INTO `job` VALUES (11, '家教', '小微培训中心', '周末对初三学生进行数学培训', '具备良好的教学基础', '444@qq.com');
INSERT INTO `job` VALUES (17, '钢琴培训', '星海培训公司', 'aaaaa', 'bbbbb', '555@qq.com');
INSERT INTO `job` VALUES (22, '1', '1', '1', '1', '149201216@qq.com');
INSERT INTO `job` VALUES (23, '4', '4', '4', '4', '4');
INSERT INTO `job` VALUES (24, '会计', 'apple', '完善公司财务核算体系', '会计从业资格证', 'apple@888.com');

-- ----------------------------
-- Table structure for stu_list
-- ----------------------------
DROP TABLE IF EXISTS `stu_list`;
CREATE TABLE `stu_list`  (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `realname` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `email` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `intro` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '简介',
  `school` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `spareTime` int(11) NOT NULL COMMENT '每周空闲时间',
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of stu_list
-- ----------------------------
INSERT INTO `stu_list` VALUES (1, '张小三', '233@qq.com', '我是一个程序员', '北大', 4);
INSERT INTO `stu_list` VALUES (2, '李小四', '666@qq.com', '我是经理', '清华', 2);
INSERT INTO `stu_list` VALUES (3, '马小广', 'alibaba@163.com', '我是CEO', '青鸟', 1);
INSERT INTO `stu_list` VALUES (4, '小微', '9527@qq.com', '我是游泳教练', '广体', 2);
INSERT INTO `stu_list` VALUES (5, '小飞', '321@123.com', '帅', '北里', 3);
INSERT INTO `stu_list` VALUES (6, '小伟', '456@654.com', '有钱', '北师', 3);
INSERT INTO `stu_list` VALUES (7, '222', '222', '222', '222', 2);

-- ----------------------------
-- Table structure for stu_user
-- ----------------------------
DROP TABLE IF EXISTS `stu_user`;
CREATE TABLE `stu_user`  (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `password` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `online` bit(1) NULL DEFAULT NULL COMMENT '是否在线',
  `email` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '邮箱地址',
  `intro` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '个人简介',
  `realname` varchar(8) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '真实姓名',
  `school` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '学校',
  `spareTime` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '每周空闲天数',
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of stu_user
-- ----------------------------
INSERT INTO `stu_user` VALUES (1, 'wey', '111', b'0', '149201216@qq.com', '我是一个吉他手', '魏', NULL, NULL);
INSERT INTO `stu_user` VALUES (9, '111111', '111111', b'1', '233@123.com', NULL, ' ', NULL, NULL);
INSERT INTO `stu_user` VALUES (10, '222222', '222222', b'0', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `stu_user` VALUES (14, '121212', '121212', b'0', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `stu_user` VALUES (15, '111112', '111112', b'0', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `stu_user` VALUES (16, 'aaaaaa', 'aaaaaa', b'1', NULL, NULL, NULL, NULL, NULL);

SET FOREIGN_KEY_CHECKS = 1;

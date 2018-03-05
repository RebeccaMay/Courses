var express = require('express');
var router = express.Router();
var ctrlCourses = require('../controllers/courses');
var ctrlOthers = require('../controllers/others');

/* Courses pages*/
router.get('/', ctrlCourses.homelist);
router.get('/course', ctrlCourses.courseInfo);
router.get('/course/hw/new', ctrlCourses.addHw);

router.get('/about', ctrlOthers.about);

module.exports = router;

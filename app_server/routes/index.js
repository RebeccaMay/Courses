var express = require('express');
var router = express.Router();
var ctrlCourses = require('../controllers/courses');
var ctrlOthers = require('../controllers/others');

/* Courses pages*/
router.get('/', ctrlCourses.homelist);
router.get('/course/:courseId', ctrlCourses.courseInfo);
router.get('/course/:courseId/hw/new', ctrlCourses.addHw);
router.post('/course/:courseId/hw/new', ctrlCourses.doAddHw);

router.get('/course/:courseId/assignment/:assignmentid/delete', ctrlCourses.deleteAssignment);

router.get('/about', ctrlOthers.about);

module.exports = router;

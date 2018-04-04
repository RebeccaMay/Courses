var express = require('express');
var router = express.Router();
var ctrlCourses = require('../controllers/courses');
var ctrlAssignments = require('../controllers/assignments');


// courses
router.get('/courses', ctrlCourses.coursesList);
router.get('/courses/:courseId', ctrlCourses.courseInfo);


// asssignments
router.post('/courses/:courseId/assignments', ctrlAssignments.assignmentsCreate);
router.get('/courses/:courseId/assignments', ctrlAssignments.assignmentsReadAll);
//router.get('/courses/:courseId/assignments/unsubmitted', ctrlAssignments.assignmentsReadUnsubmitted);
router.put('/courses/:courseId/assignments/:assignmentid', ctrlAssignments.assignmentsUpdateOne);
router.delete('/courses/:courseId/assignments/:assignmentid', ctrlAssignments.assignmentsDeleteOne);

module.exports = router;
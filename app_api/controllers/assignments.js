var mongoose = require('mongoose');
var Cour = mongoose.model('Course');

var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.assignmentsCreate = function (req, res) {
	sendJsonResponse(res, 200, {"status" : "success"});		
};

module.exports.assignmentsReadOne = function (req, res) {
	if (req.params && req.params.courseId) {
		Cour
			.findById(req.params.courseId)
			.select('courseName assignments')
			.exec(function(err, course) {
				var response, assignment;
				if (!course) {
					sendJsonResponse(res, 404, {
						"message": "course Id not found"
					});
					return;
				} else if (err) {
					sendJsonResponse(res, 404, err);
					return;
				}
				if (course.assignments && course.assignments.length > 0) {
					assignment = course.assignments.id(req.params.assignmentid);
					//5aaf5963a1110fca8b7afa80
					if (!assignment) {
						sendJsonResponse(res, 404, {
							"message": "assignmentid not found"
						});
					} else {
						response = {
							course : {
								name : course.courseName,
								id : req.params.courseId
							},
							assignment : assignment
						};
						sendJsonResponse(res, 200, response);
					}
				} else {
					sendJsonResponse(res, 404, {
						"message": "No assignments found"
					});
				}
				sendJsonResponse(res, 200, course);
			});
	} else {
		sendJsonResponse(res, 404, {
			"message": "No courseId in request"
		});
	}		
};

module.exports.assignmentsUpdateOne = function (req, res) {
	sendJsonResponse(res, 200, {"status" : "success"});		
};

module.exports.assignmentsDeleteOne = function (req, res) {
	sendJsonResponse(res, 200, {"status" : "success"});		
};
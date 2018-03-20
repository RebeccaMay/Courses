var mongoose = require('mongoose');
var Cour = mongoose.model('Course');

var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

var doAddAssignment = function(req, res, course) {
	if (!course) {
		sendJsonResponse(res, 404, {
			"message": "courseId not found"
		});
	} else {
		course.assignments.push({
			hwName: req.body.hwName,
			hwDescription: req.body.hwDescription,
			dueDate: req.body.dueDate,
			points: req.body.points,
			hwStatus: req.body.hwStatus
		});
		course.save(function(err, course) {
			var thisAssignment;
			if (err) {
				sendJsonResponse(res, 400, err);
			} else {
				thisAssignment = course.assignments[course.assignments.length - 1];
				sendJsonResponse(res, 201, thisAssignment);
			}
		});
	}
};


module.exports.assignmentsCreate = function (req, res) {
	var courseId = req.params.courseId;
		if (courseId) {
			Cour
				.findById(courseId)
				.select('assignments')
				.exec(
					function(err, course) {
						if (err) {
							sendJsonResponse(res, 400, err);
						} else {
							doAddAssignment(req, res, course);
						}
					}
				);
		} else {
			sendJsonResponse(res, 404, {
				"message": "Not found, courseId required"
			});
		}	
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
	if (!req.params.courseId || !req.params.assingmentid) {
		sendJsonResponse(res, 404, {
			"message": "Not found, courseId and assignmentid are both required"
		});
		return;
	}
	Cour
		.findById(req.params.courseId)
		.select('assignments')
		.exec(
		function(err, course) {
			var thisAssignment;
			if (!course) {
				sendJsonResponse(res, 404, {
					"message": "courseId not found"
				});
				return;
			} else if (err) {
				sendJsonResponse(res, 400, err);
				return;
			}
			if (course.assignments && course.assignments.length > 0) {
				thisAssignment = course.assignments.id(req.params.assignmentid);
				if (!thisAssignment) {
					sendJsonResponse(res, 404, {
						"message": "assignment not found"
					});
				} else {
					thisAssignment.hwName = req.body.hwName;
					thisAssignment.hwDescription = req.body.hwDescription;
					thisAssignment.dueDate = req.body.dueDate;
					thisAssignment.points = req.body.points;
					thisAssignment.hwStatus = req.body.hwStatus;
					course.save(function(err, course) {
						if (err) {
							sendJsonResponse(res, 404, err);
						} else {
							sendJsonResponse(res, 200, thisAssignment);
						}
					});
				}
			} else {
				sendJsonResponse(res, 404, {
					"message": "No assignment to update"
				});
			}
		}
	);
};	

module.exports.assignmentsDeleteOne = function (req, res) {
	if (!req.params.courseId || !req.params.assignmentid) {
		sendJsonResponse(res, 404, {
			"message": "Not found, courseId and assignmentid are both required"
		});
		return;
	}
	Cour
		.findById(req.params.courseId)
		.select('assignments')
		.exec(
		function(err, course) {
			if (!course) {
				sendJsonResponse(res, 404, {
					"message": "courseId not found"
				});
				return;
			} else if (err) {
				sendJsonResponse(res, 400, err);
				return;
			}
			if (course.assignments && course.assignments.length > 0) {
				if (!course.assignments.id(req.params.assignmentid)) {
					sendJsonResponse(res, 404, {
						"message": "assignmentid not found"
					});
				} else {
					course.reviews.id(req.params.assignmentid).remove();
					course.save(function(err) {
						if (err) {
							sendJsonResponse(res, 404, err);
						} else {
							sendJsonResponse(res, 204, null);
						}
					});
				}
			} else {
				sendJsonResponse(res, 404, {
					"message": "No assignment to delete"
				});
			}
		}
	);
};	

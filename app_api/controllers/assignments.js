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
				console.log(err);
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

module.exports.assignmentsReadAll = function (req, res) {
	if (req.params && req.params.courseId) {
		var assignments = [];
		Cour
			.findById(req.params.courseId)
			.select('assignments')
			.exec(function(err, result) {
				var allAssign = result.assignments;
				sendJsonResponse(res, 200, allAssign);
			});
			return;
	} else {
		sendJsonResponse(res, 404, {
			"message": "No courseId in request"
		});
	}		
};

/* module.exports.assignmentsReadUnsubmitted = function(req, res) {
	if (req.params && req.params.courseId) {
		var assignments = [];
		Cour
			.findById(req.params.courseId)
			//.select('assignments')
			.exec(function(err, result) {
				console.log("results: " + result);
				assignments = result.assignments;
			});
			console.log("assignments: " + assignments);
			var unsubmitted = [];
 			for (var i = 0; i < assignments.length; i++){
				if (assignments[i].hwStatus == "Haven't Started" || assignments[i].hwStatus == "In Progress"){
					unsubmitted.push(assignments[i]);
				}
			}
			console.log("unsubmitted " + unsubmitted); 
			sendJsonResponse(res, 200, result.assignments);
			return;
	} else {
		sendJsonResponse(res, 404, {
			"message": "No courseId in request"
		});
	}
}; */

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
				console.log(err);
				console.log(course);
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
						course.assignments.id(req.params.assignmentid).remove();
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

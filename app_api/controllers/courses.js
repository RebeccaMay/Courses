var mongoose = require('mongoose');
var Cour = mongoose.model('Course');

var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.coursesList = function (req, res) {
	sendJsonResponse(res, 200, {"status" : "success"});		
};

module.exports.coursesReadOne = function(req, res) {
	if (req.params && req.params.courseId) {
		Cour
			.findById(req.params.courseId)
			.exec(function(err, course) {
				if (!course) {
					sendJsonResponse(res, 404, {
						"message": "courseId not found"
					});
					return;
				} else if (err) {
					sendJsonResponse(res, 404, err);
					return;
				}
			sendJsonResponse(res, 200, course);
			});
	} else {
		sendJsonResponse(res, 404, {
			"message": "No courseId in request"
		});
	}
};
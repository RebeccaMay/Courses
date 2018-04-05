var mongoose = require('mongoose');
var Cour = mongoose.model('Course');

var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.coursesList = function(req, res) {
	Cour
		.find({}, function(err, courses){
			if (err){
				sendJsonResponse(res, 404, err);
				return;
			}
			else {
				sendJsonResponse(res, 200, courses);
			}
		});
};


module.exports.courseInfoAPI = function(req, res) {
	if (req.params && req.params.courseId) {
		Cour
			.findById(req.params.courseId)
			.exec(function(err, course) {
				if (!course) {
					sendJsonResponse(res, 400, {
						"message": "courseId not found"
					});
					return;
				} else if (err) {
					console.log(err)
					sendJsonResponse(res, 401, err);
					return;
				}
			sendJsonResponse(res, 200, course);
			});
	} else {
		sendJsonResponse(res, 402, {
			"message": "No courseId in request"
		});
	}
};
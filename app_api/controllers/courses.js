var mongoose = require('mongoose');
var Cour = mongoose.model('Course');

var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.coursesCreate = function (req, res) {
	sendJsonResponse(res, 200, {"status" : "success"});		
};

module.exports.coursesList = function (req, res) {
	sendJsonResponse(res, 200, {"status" : "success"});		
};

module.exports.coursesReadOne = function (req, res) {
	sendJsonResponse(res, 200, {"status" : "success"});		
};

module.exports.coursesUpdateOne = function (req, res) {
	sendJsonResponse(res, 200, {"status" : "success"});		
};

module.exports.coursesDeleteOne = function (req, res) {
	sendJsonResponse(res, 200, {"status" : "success"});		
};
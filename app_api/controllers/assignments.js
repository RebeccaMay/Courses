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
	sendJsonResponse(res, 200, {"status" : "success"});		
};

module.exports.assignmentsUpdateOne = function (req, res) {
	sendJsonResponse(res, 200, {"status" : "success"});		
};

module.exports.assignmentsDeleteOne = function (req, res) {
	sendJsonResponse(res, 200, {"status" : "success"});		
};
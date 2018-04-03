var request = require('request');
var apiOptions = {
	server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
	apiOptions.server = "https://stormy-refuge-78946.herokuapp.com/";
}

var renderHomepage = function(req, res, responseBody){
	console.log("homepage: " + responseBody);
	var message;
	if (!(responseBody instanceof Array)){
		message = "API lookup error";
		responseBody = [];
	}
	else{
		if (!responseBody.length){
			message = "No courses found";
		}
	}
	res.render('courses-list', {
		title: 'Course Organizer - all your assignments in one place',
		pageHeader: {
			title: 'Course Organizer',
			strapline: 'All your assignments in one place!'
		},
		courselist : responseBody,
		message : message
	});
};

module.exports.homelist = function(req, res){
	var requestOptions, path;
	path = '/api/courses';
	requestOptions = {
		url : apiOptions.server + path,
		method : "GET",
		json : {},
		qs : {}
	};
	request(
		requestOptions,
		function(err, response, body){
			renderHomepage(req, res, body);
		}
	);
};

var renderDetailPage = function (req, res, courseDetail){
	console.log(courseDetail);
	res.render('course-info', {
		title: courseDetail.courseName + "course info",
		pageHeader: {title: courseDetail.courseId},
 		courseInfo: {
			courseId: courseDetail.courseId,
			courseName: courseDetail.courseName,
			professor: courseDetail.professor,
			times: courseDetail.courseTime[0].times,
			credits: courseDetail.courseTime[0].credits
		},
 		assignments: courseDetail.assignments
	});
};

module.exports.courseInfo = function(req, res){
	var requestOptions, path;
	path = '/api/courses/' + req.params.courseId;
	requestOptions = {
		url : apiOptions.server + path,
		method : "GET",
		json : {},
		qs: {}
	};
	request(
		requestOptions,
		function(err, response, body){
			renderDetailPage(req, res, body);
		}
	);
};

module.exports.addHw = function(req, res){
	res.render('course-hw-form', {
		title: 'Add Assignment',
		pageHeader: {title: 'Add Assignment'},
		courseId: 'CSCI-446'
		});
};
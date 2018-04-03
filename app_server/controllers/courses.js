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

var _showError = function (req, res, status){
	var title, content;
	if (status === 404){
		title = "404, page not found";
		content = "oh dear. Looks like we can't find this page. Sorry.";
	}
	else {
		title = status + ", something's gone wrong";
		content = "Something, somewhere, has gone just a little bit wrong.";
	}
	res.status(status);
	res.render('generic-text', {
		title: title,
		mes: content
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
			if (response.statusCode === 200){
				renderDetailPage(req, res, body);
			}
			else {
				_showError(req, res, response.statusCode);
			}
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
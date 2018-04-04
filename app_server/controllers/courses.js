var request = require('request');
var apiOptions = {
	server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
	apiOptions.server = "https://stormy-refuge-78946.herokuapp.com/";
}

var renderHomepage = function(req, res, responseBody){
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
	res.render('course-info', {
		title: courseDetail.courseName + "course info",
		pageHeader: {title: courseDetail.courseId},
 		courseInfo: {
			courseId: courseDetail.courseId,
			courseName: courseDetail.courseName,
			professor: courseDetail.professor,
			times: courseDetail.courseTime[0].times,
			credits: courseDetail.courseTime[0].credits,
			_id: courseDetail._id
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

var getCourseInfo = function (req, res, callback){
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
				callback(req, res, body);
			}
			else {
				_showError(req, res, response.statusCode);
			}
		}
	);	
};

module.exports.courseInfo = function(req, res){
	getCourseInfo(req, res, function(req, res, responseData){
		renderDetailPage(req, res, responseData);
	});
};

var renderHwForm = function (req, res, courseDetail){
	res.render('course-hw-form', {
		title: 'Add Assignment',
		pageHeader: {title: 'Add Assignment'},
		courseId: courseDetail.courseId,
		error: req.query.err
	});	
};

module.exports.addHw = function(req, res){
	getCourseInfo(req, res, function(req, res, responseData){
		renderHwForm(req, res, responseData);
	});
};

module.exports.doAddHw = function(req, res){
	var requestOptions, path, courseId, postdata;
	courseId = req.params.courseId;
	path = "/api/courses/" + courseId + '/assignments';
	postdata = {
		hwName : req.body.name,
		hwDescription : req.body.description,
		dueDate : req.body.due,
		points : parseInt(req.body.points),
		hwStatus : req.body.status
	};
	requestOptions = {
		url : apiOptions.server + path,
		method : "POST",
		json : postdata
	};
	if (!postdata.hwName || !postdata.hwDescription || !postdata.dueDate || !postdata.points){
		res.redirect('/course/' + courseId + '/hw/new?err=val1');
	}
	else if (postdata.points < 0 || postdata.points > 100) {
		res.redirect('/course/' + courseId + '/hw/new?err=val2');
	}
	else {
		request(
			requestOptions,
			function(err, response, body){
				if (response.statusCode === 201){
					res.redirect('/course/' + courseId);
				}
				else if (response.statusCode === 400 && body.name && body.name === "ValidationError"){
					res.redirect('/course/' + courseId + '/hw/new?err=val');
				}
				else {
					console.log(body);
					_showError(req, res, response.statusCode);
				}
			}
		);
	}
};

module.exports.deleteAssignment = function(req, res){
	var requestOptions, path;
	path = "/api/courses/" + req.params.courseId + '/assignments/' + req.params.assignmentid;
	requestOptions = {
		url : apiOptions.server + path,
		method : "DELETE",
		json : {},
		qs : {}
	};
	request(
		requestOptions,
		function(err, response, body){
			res.redirect('/course/' + req.params.courseId);
		}
	);	
};

module.exports.courseInfoUnsubmitted = function(req, res){
	getCourseInfo(req, res, function(req, res, responseData){
		unsubmitted = [];
		assignments = responseData.assignments;
		for (var i = 0; i < assignments.length; i++){
			if (assignments[i].hwStatus != "Submitted"){
				unsubmitted.push(assignments[i]);
			}
		}
		responseData.assignments = unsubmitted;
		renderDetailPage(req, res, responseData);
	});	
};





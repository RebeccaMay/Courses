var request = require('request');
var apiOptions = {
	server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
	apiOptions.server = "https://stormy-refuge-78946.herokuapp.com/";
}

var renderHomepage = function(req, res, responseBody){
	res.render('courses-list', {
		title: 'Course Organizer - all your assignments in one place',
		pageHeader: {
			title: 'Course Organizer',
			strapline: 'All your assignments in one place!'
		},
		courselist: responseBody
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

module.exports.courseInfo = function(req, res){
	res.render('course-info', {
		title: 'MATH-335 Course Info',
		pageHeader: {title: 'MATH-335'},
		courseInfo: {
			courseId: 'MATH-335',
			courseName: 'Introduction to Statistics',
			professor: 'Ashlyn Munson',
			times: 'MWF 9am, Alderson 162',
			credits: '3'
		},
		assignments: [{
			hwName: 'HW1',
			hwDescription: 'Chapter 1',
			dueDate: 'Jan 17, 2018',
			points: '20',
			hwStatus: 'Graded'
		},{
			hwName: 'HW2',
			hwDescription: 'Chapter 2',
			dueDate: 'Jan 24, 2018',
			points: '18',
			hwStatus: 'Completed'
		}
		]
	});
};

module.exports.addHw = function(req, res){
	res.render('course-hw-form', {
		title: 'Add Assignment',
		pageHeader: {title: 'Add Assignment'},
		courseId: 'CSCI-446'
		});
};
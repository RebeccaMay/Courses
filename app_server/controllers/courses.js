module.exports.homelist = function(req, res){
	res.render('courses-list', {
		title: 'Course Organizer - all your assignments in one place',
		pageHeader: {
			title: 'Course Organizer',
			strapline: 'All your assignments in one place!'
		},
		courselist: [{
			courseId: 'MATH-335',
			professor: 'Ashlyn Munson',
			courseName: 'Introduction to Statistics'
		},{
			courseId: 'CSCI-445',
			professor: 'Cyndi Rader',
			courseName: 'Web Applications'
		}]
	});
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
	res.render('course-hw-form', {title: 'Add Assignment'});
};
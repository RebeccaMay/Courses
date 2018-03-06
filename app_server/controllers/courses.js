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
	res.render('course-info', {title: 'My Courses'});
};

module.exports.addHw = function(req, res){
	res.render('course-hw-form', {title: 'Add Assignment'});
};
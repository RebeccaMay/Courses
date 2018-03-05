module.exports.homelist = function(req, res){
	res.render('courses-list', {title: 'Course Organizer'});
};

module.exports.courseInfo = function(req, res){
	res.render('course-info', {title: 'My Courses'});
};

module.exports.addHw = function(req, res){
	res.render('course-hw-form', {title: 'Add Assignment'});
};
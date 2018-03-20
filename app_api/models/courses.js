var mongoose = require('mongoose');

var hwSchema = new mongoose.Schema({
	hwName: {type: String, required: true},
	hwDescription: String,
	dueDate: {type: String, required: true},
	points: {type: Number, min: 0, max: 100},
	hwStatus: String
});

var courseTimeSchema = new mongoose.Schema({
	times: String,
	credits: Number
});

var courseSchema = new mongoose.Schema({ 
	courseId: {type: String, required: true},
	professor: String,
	courseName: {type: String, required: true},
	courseTime: [courseTimeSchema],
	assignments: [hwSchema]
});

mongoose.model('Course', courseSchema);
const mongoose = require('mongoose');
const { Schema } = mongoose;

const CourseSchema = new Schema(
	{
		title: {
			type: String,
			trim: true,
			required: [true, 'Please add a course title'],
		},
		description: {
			type: String,
			required: [true, 'Please add a description'],
		},
		weeks: {
			type: String,
			required: [true, 'Please add number of weeks'],
		},
		tuition: {
			type: Number,
			required: [true, 'Please add a tuition cost'],
		},
		minimumSkill: {
			type: String,
			required: [true, 'Please add a minimum skill'],
			enum: ['beginner', 'intermediate', 'advanced'],
		},
		scholarshipAvailable: {
			type: Boolean,
			default: false,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		bootcamp: {
			type: Schema.Types.ObjectId,
			ref: 'Bootcamp',
			required: true,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
			transform: (doc, ret) => {
				ret.id = ret._id;
				delete ret._id;
				// delete ret.__v;
				ret.updatedAt = moment(ret.updatedAt).format('YYYY-MM-DD HH:mm:ss');
				ret.createdAt = moment(ret.createdAt).format('YYYY-MM-DD HH:mm:ss');
			},
		},
	},
);


const updateDate = function(next) {
	next();
};
CourseSchema.pre('save', updateDate)
	.pre('update', updateDate)
	.pre('updateMany', updateDate)
	.pre('findOneAndUpdate', updateDate)
	.pre('findByIdAndUpdate', updateDate);
const Course = mongoose.models.Course || mongoose.model('Course', CourseSchema);

module.exports = Course;

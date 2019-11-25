const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const moment = require('moment');

const BlogSchema = new mongoose.Schema(
	{},
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

BlogSchema.plugin(uniqueValidator, { message: "'{VALUE}' of '{PATH}' to be unique." });

const updateDate = function(next) {
	next();
};
BlogSchema.pre('save', updateDate)
	.pre('update', updateDate)
	.pre('updateMany', updateDate)
	.pre('findOneAndUpdate', updateDate)
	.pre('findByIdAndUpdate', updateDate);

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
module.exports = Blog;

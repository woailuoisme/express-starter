const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');
const moment = require('moment');

const ReviewSchema = new Schema(
	{
		title: {
			type: String,
			trim: true,
			required: [true, 'Please add a title for the review'],
			maxlength: 100,
		},
		text: {
			type: String,
			required: [true, 'Please add some text'],
		},
		rating: {
			type: Number,
			min: 1,
			max: 10,
			required: [true, 'Please add a rating between 1 and 10'],
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
				ret.updatedAt = moment(ret.updatedAt).format('YYYY-MM-DD HH:mm:ss.SSS ZZ');
				ret.createdAt = moment(ret.createdAt).format('YYYY-MM-DD HH:mm:ss.SSS ZZ');
			},
		},
	},
);

const Review = mongoose.models.Review || mongoose.model('Review', ReviewSchema);

module.exports = Review;

const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');
const dayjs = require("dayjs");

const BootcampSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		name: {
			type: String,
			trim: true,
			required: true,
			index: true,
			maxlength: 50,
		},
		photo: {
			type: String,
			default: 'no-photo.jpg',
		},
		slug: String,
		description: {
			type: String,
			trim: true,
			required: [true, 'Please add a description'],
			maxlength: [200, 'description can not be more than 200 characters'],
		},
		website: {
			type: String,
			validate: {
				validator: v => validator.isURL(v),
				message: props => `${props.value} is not a valid url!`,
			},
		},
		phone: {
			type: String,
			maxlength: [20, 'Phone number can not be longer than 20 characters'],
		},
		email: {
			type: String,
			validate: {
				validator: v => validator.isEmail(v),
				message: props => `${props.value} is not a valid email!`,
			},
		},
		address: {
			type: String,
			required: [true, 'Please add an address'],
		},
		careers: {
			// Array of strings
			type: [String],
			required: true,
			enum: [
				'Web Development',
				'Mobile Development',
				'UI/UX',
				'Data Science',
				'Business',
				'Other',
			],
		},
		housing: {
			type: Boolean,
			default: false,
		},
		jobAssistance: {
			type: Boolean,
			default: false,
		},
		jobGuarantee: {
			type: Boolean,
			default: false,
		},
		acceptGi: {
			type: Boolean,
			default: false,
		},
		averageRating: {
			type: Number,
			min: [1, 'Rating must be at least 1'],
			max: [10, 'Rating must can not be more than 10'],
		},
		averageCost: Number,
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
			transform: (doc, ret) => {
				ret.id = ret._id;
				delete ret._id;
				// delete ret.__v;
				ret.updatedAt = dayjs(ret.updatedAt)
					.format('YYYY-MM-DD HH:mm:ss.SSS');
				ret.createdAt = dayjs(ret.createdAt)
					.format('YYYY-MM-DD HH:mm:ss.SSS');
			},
		},
		toObject: { virtuals: true },
	},
);

BootcampSchema.plugin(uniqueValidator, { message: "'{PATH}' value '{VALUE}' to be unique." });

BootcampSchema.pre('save', function(next) {
	if (!this.isModified('name')) next();
	this.slug = slugify(this.name, { lower: true });
	next();
});

// Cascade delete courses when a bootcamp is deleted
BootcampSchema.pre('remove', async function(next) {
	console.log(`Courses being removed from bootcamp ${this._id}`);
	await this.model('Course').deleteMany({ bootcamp: this._id });
	next();
});

// Reverse populate with virtuals
BootcampSchema.virtual('courses', {
	ref: 'Course',
	localField: '_id',
	foreignField: 'bootcamp',
	justOne: false,
});
BootcampSchema.method.re = async function() {
	return { name: this.name, photo: this.photo };
};

const Bootcamp = mongoose.models.Bootcamp || mongoose.model('Bootcamp', BootcampSchema);

module.exports = Bootcamp;

const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const moment = require('moment');
const { JWT_EXPIRE, JWT_SECRET } = require('../common/config');

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: [true, 'Please add an email'],
			unique: true,
			validate: {
				validator: v => validator.isEmail(v),
				message: props => `${props.value} is not a valid email!`,
			},
		},
		role: {
			type: String,
			enum: ['user', 'publisher', 'admin'],
			default: 'user',
		},
		password: {
			type: String,
			required: [true, 'Please add a password'],
			minlength: 6,
			select: false, // 查询结果不显示
		},
		resetPasswordToken: String,
		resetPasswordExpire: Date,
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

UserSchema.virtual('bootcamps', {
	ref: 'Bootcamp',
	localField: '_id',
	foreignField: 'user',
	justOne: false,
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
	if (!this.isModified('password')) {
		next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
	return jwt.sign({ id: this._id }, JWT_SECRET, {
		expiresIn: JWT_EXPIRE,
	});
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
	// eslint-disable-next-line no-return-await
	return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password token
UserSchema.methods.getResetPasswordToken = function() {
	// Generate token
	const resetToken = crypto.randomBytes(20).toString('hex');

	// Hash token and set to resetPasswordToken field
	this.resetPasswordToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex');

	// Set expire
	this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
	return resetToken;
};

const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;

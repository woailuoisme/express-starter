const mongoose = require('mongoose');
const User = require('../../server/models/user');
const userOne = {
	_id: mongoose.Schema.Types.ObjectId,
	name: 'woailuo',
	email: 'jhbwyl@126.com',
	password: '123456',
};

const user = User.create(userOne);
const userOneId = user._id;
const userOneToken = user.getSignedJwtToken();

module.exports = { userOneId, userOneToken };

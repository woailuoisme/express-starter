const faker = require('faker');
const User = require('../models/user');
// const logger = require('../utils/logger');
// faker.locale = 'zh_CN';
const user = {
	name: faker.name.findName(),
	email: faker.internet.email(),
	website: faker.internet.url(),
	address: faker.address.streetAddress() + faker.address.city() + faker.address.country(),
	bio: faker.lorem.sentences(),
	image: faker.image.avatar(),
};
// logger.info(User);od
// console.log(User);
// console.log(Fake.address.streetAddress());
// console.log(User);

const factory = (model, count = 1) => {
	const models = [];
	for (let i = 0; i < 10; i++) {
		models.push(model);
	}
	return models;
};

// const improtUser = (m = {});

console.log(factory(User, 10).length);

module.exports = User;

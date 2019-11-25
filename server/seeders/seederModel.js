const faker = require('faker');
// const logger = require('../utils/logger');
faker.locale = 'zh_CN';
const User = {
	name: faker.name.findName(),
	email: faker.internet.email(),
	website: faker.internet.url(),
	address: faker.address.streetAddress() + faker.address.city() + faker.address.country(),
	bio: faker.lorem.sentences(),
	image: faker.image.avatar(),
};
// logger.info(User);
console.log(User);
// console.log(Fake.address.streetAddress());
console.log(User);
module.exports = User;

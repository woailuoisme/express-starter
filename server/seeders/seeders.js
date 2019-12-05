const faker = require('faker');
const mongoose = require('mongoose');
// const logger = require('../utils/logger');
// faker.locale = 'zh_CN';
const userSeeder = {
	name: faker.name.findName(),
	email: faker.internet.email(),
	website: faker.internet.url(),
	address: faker.address.streetAddress() + faker.address.city() + faker.address.country(),
	bio: faker.lorem.sentences(),
	imgae: faker.lorem.paragraphs(),
	image: faker.image.avatar,
};

// logger.info(User);od
// console.log(User);
// console.log(Fake.address.streetAddress());
// console.log(User);

const make = (seeder = {}, count = 1) => {
	if (!seeder) {
		console.log(`Please use correct sedeer`);
		return;
	}
	const seeders = [];
	for (let i = 0; i < count; i++) {
		seeders.push(seeder);
	}
	return seeders;
};

const create = async (Model, seeder = {}, count = 1) => {
	if (Model.prototype instanceof mongoose.Model) {
		console.log(`Model must be use mongoose.model() function`);
		return;
	}
	let models;
	try {
		models = await Model.saveMany(make(seeder, count));
	} catch (error) {
		console.log(error);
		return;
	}
	return models;
};

console.log(make(userSeeder);


// console.log(User.constructor());
// console.log(typeof User);
// console.log(User.prototype.toString());
// console.log(User.prototype.constructor);
// console.log(User.prototype.constructor.toString());
// console.log(User.prototype.prototype);
// console.log(Object.prototype.toString.call(User));
// console.log(User.prototype.constructor().role);
// console.log(User.prototype instanceof mongoose.Model);
// console.log(User.constructor.name);
// console.log(User._doc);
// console.log(User.prototype.toString.call());

module.exports = { userSeeder, make, create };

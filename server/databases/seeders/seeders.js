const faker = require('faker');
const mongoose = require('mongoose');

// const logger = require('../utils/logger');
// faker.locale = 'zh_CN';
const Seeder = require('./base.seeder');

class UserSeeder extends Seeder {
	model;

	constructor({ model }) {
		super(model);
	}

	static define() {
		return {
			name: faker.name.findName(),
			email: faker.internet.email(),
			website: faker.internet.url(),
			address: faker.address.streetAddress() + faker.address.city() + faker.address.country(),
			bio: faker.lorem.sentences(1),
			image: faker.image.avatar(),
		};
	}
}

console.log(UserSeeder.define());
console.log(UserSeeder.make());
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

// module.exports = { userSeeder, make, create };

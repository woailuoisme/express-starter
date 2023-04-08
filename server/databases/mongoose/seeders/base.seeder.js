const faker = require('faker');
const mongoose = require('mongoose');
// const logger = require('../utils/logger');
// faker.locale = 'zh_CN';

class Seeder {
  constructor(model) {
    if (!(model.prototype instanceof mongoose.Model)) {
      return new Error('model must be instance of mongoose.Model');
    }
    this.model = model;
  }

  static define() {
    return {};
  }

  static make(count = 1) {
    if (!this.define()) {
      console.log(`Please use correct sedeer`);
      return;
    }
    if (count === 1) return this.define();

    const seeders = [];
    for (let i = 0; i < count; i++) {
      seeders.push(this.define());
    }
    return seeders;
  }

  static async create(count = 1) {
    try {
      const models = await this.model.saveMany(this.make(count));
      return models;
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = Seeder;
// console.log(UserSeeder.define());
// console.log(UserSeeder.make());
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

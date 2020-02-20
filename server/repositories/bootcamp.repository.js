const Repository = require('./repository');
const Bootcamp = require('../models/bootcamp');
class BootcampRepository extends Repository {
	constructor(model) {
		super(model);
		this.model = Bootcamp;
	}
}

const bootcampRepository = new BootcampRepository().findById();
module.exports = BootcampRepository

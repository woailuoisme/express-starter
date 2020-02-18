
class Repository {
	model;

	constructor({ model }) {
		this.model = model;
	}

	find(conditions = {}) {
		return this.model.find(conditions);
	}

	create(docs) {
		return this.model.create(docs);
	}

	findById(id) {
		return this.model.findById(id);
	}

	findByIdAndUpdate(id, update = {}) {
		return this.model.findByIdAndUpdate(id, update, {
			new: true,
			runValidators: true,
			context: 'query', // mongoose-unique-validator docs
		});
	}

	findByIdAndDelete(id) {
		return this.model.findByIdAndDelete(id);
	}
}

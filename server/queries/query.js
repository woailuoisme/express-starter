class Query {
	constructor(model, queryString) {
		this.model = model;
		this.query = this.model.find();
	}

	lastest() {
		this.query.sort('-createdAt');
		return this;
	}
}

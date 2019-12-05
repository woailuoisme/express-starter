const dbMigrate = () => {};

const dbFresh = () => {};

const dbReFresh = () => {
	dbFresh();
	dbMigrate();
};

module.exports = {
	dbMigrate,
	dbFresh,
	dbReFresh,
};

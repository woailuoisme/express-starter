const util = require('util');
const moment = require('moment');
const exec = util.promisify(require('child_process').exec);
const path = require('path');
const { MONGO_URI } = require('../common/config');
const dbName = 'devcamper';
const collectionName = 'users';
const outputFilePath = path.join(__dirname, '../../temp', `${collectionName}.json`);
const outputDirPath = path.join(__dirname, `../../temp/`);
const cmdExport = `mongoexport --uri=${MONGO_URI} --collection=${collectionName} --jsonArray --pretty --out=${outputFilePath}`;
const cmdDump = `mongodump --uri=${MONGO_URI}  --out=${outputDirPath}`;
const cmdDumpGzip = `mongodump --uri=${MONGO_URI} --archive=${outputDirPath}${dbName}_${moment().format(
	'YYYY-MM-DD',
)}.gz --gzip `;
const cmdImport = `mongoimport --uri=${MONGO_URI} --collection=${collectionName} --file=${outputFilePath}`;
console.log(cmdExport);
console.log(cmdDump);
console.log(cmdDumpGzip);
console.log(cmdImport);

async function dumpCollection(cmd) {
	try {
		const { stdout, stderr } = await exec(cmd);
		console.log('stdout:', stdout);
		console.error('stderr:', stderr);
	} catch (e) {
		console.log(e);
	}
}

(async () => {
	try {
		await dumpCollection(cmdDumpGzip);
		// await dumpCollection(cmdExport);
	} catch (e) {
		console.log(e);
	}
})();
dumpCollection(cmdDump).catch(e => console.log(e));

const yargs = require('yargs');
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const generate = require('./server/common/generators/generate');
const serve = yargs
	.command(
		'$0',
		'the default command',
		() => {},
		argv => {
			console.log('this command will be run by default');
		},
	)
	.command(
		'make [type] [modelName]',
		'crud generator generate template type,example:model,controller,etc...',
		yargs => {
			yargs.positional('type', {
				describe: 'choose a type ',
				choices: ['model', 'controller', 'router', 'all'],
			});
			yargs.positional('modelName', {
				describe: 'name fo model ',
				type: 'string',
			});
			yargs.usage('Usage: $0 [type] [modelName]');
			yargs.example('$0 make model blog', 'generate a blog.js model file');
			yargs.demandOption(['type', 'modelName']);
			yargs.alias('h', 'help');
		},
		args => {
			if (args.type && args.modelName) {
				generate(args.modelName, args.type);
			} else {
				console.log('please input correct string... '.red.bold);
			}
		},
	)
	.command('get <username|email> [password]', 'fetch a user by username or email.')
	.option('verbose', {
		alias: 'v',
		type: 'boolean',
		description: 'Run with verbose logging',
	})
	.help()
	.wrap(140).argv;

console.log(serve);

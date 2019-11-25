const yargs = require('yargs');
const generate = require('./server/generators/generate');

const cmd = yargs
	.command('make', 'generate templates,example:model,controller,router and etc', {
		controller: {
			description: 'generate controller template',
			alias: 'c',
			type: 'boolean',
		},
		router: {
			description: 'generate router template',
			alias: 'r',
			type: 'boolean',
		},
	})
	.option('model', {
		alias: 'm',
		description: 'generate model template',
		type: 'boolean',
	})
	.option('type', {
		alias: 't',
		describe: 'choose a type ',
		choices: ['model', 'controller', 'router', 'all'],
	})
	.help()
	.alias('help', 'h').argv;
const operate = cmd._[0];
const model = cmd._[1];
const type = cmd.type || cmd.t;

if (operate !== 'make') {
	console.log('please input correct params: make '.red.bold);
	process.exit(1);
}

if (cmd.controller || cmd.c || cmd.model || cmd.m) {
}

if (model && type) {
	generate(model, type);
} else {
	console.log('please input correct string... '.red.bold);
	console.log('example: node cmd  make blog --type=controller or node cmd  make blog -t=controller '.red.bold);
}

if (cmd._[1]) console.log(cmd);

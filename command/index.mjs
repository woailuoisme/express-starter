import {Argument, Command} from 'commander';
import {resolve} from 'path';
import {createRequire} from "module";
import {$} from 'execa';

const $$ = $({stdio: 'inherit'});
const require = createRequire(import.meta.url);
const pkg = require("../package.json");
const {version} = pkg;
const program = new Command();
const log = console.log

const ymlPath = resolve(process.cwd(), `../docker-compose.yml`)

program
  .name('Custom docker command line')
  .description('Custom docker command line utilities for myself')
  .version(version);

program.command('build_base')
  .description('docker php base image build')
  .addArgument(new Argument('<version>', 'php version',).choices(['8.2', '7.4']))
  .action(async (str) => {
    const path = resolve(process.cwd(), `../php-fpm/base/${str}.Dockerfile`)
    const contextPath = resolve(process.cwd(), `../php-fpm`)
    log(path)
    const result = await $$`docker build -t sd/php-fpm-base:${str} -f=${path} ${contextPath}`;
  });

program.command('build')
  .description('docker php image build')
  .addArgument(new Argument('<stage>', 'build stage,values for: production,development ',).choices(['production', 'development']))
  .action(async (str) => {
    const path = resolve(process.cwd(), `../php-fpm/Dockerfile`)
    const contextPath = resolve(process.cwd(), `../php-fpm`)
    log(path)
    await $$`docker build -t sd/php-fpm-${str}:latest -f=${path} ${contextPath} --target=${str}`;
  });

program.command('up')
  .description('docker-compose up services')
  .action(async () => await $$`docker-compose up -d -f=${ymlPath} app nginx mysql redis php-worker`);

program.command('down')
  .description('docker-compose down')
  .action(async () => await $$`docker-compose down -f=${ymlPath}`);

program.command('up-ops')
  .description('docker-compose up ops services')
  .action(async (str) => await $$`docker-compose -d dozzle portainer  -f=${ymlPath} && docker-compose ps -f=${ymlPath}`);

program.command('cert')
  .description('generate website cert')
  .action(async (str) => await $$`docker-compose --rm up cert  -f=${ymlPath} `);

program.command('clear')
  .description('clear')
  .action(async (str) => await $$``);


program.parse(process.argv);




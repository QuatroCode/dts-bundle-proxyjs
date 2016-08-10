import * as yargs from 'yargs';
import * as Contracts from './contracts';

export default yargs
    .help('help', 'Show help.')
    .version(() => {
        return `Current version: ${require('../package.json').version}.`;
    })
    .option('config', {
        alias: 'c',
        describe: 'Path to config file.',
        type: 'string'
    })
    .option('default', {
        alias: 'd',
        describe: 'Bundled require default export.',
        type: 'string'
    })
    .option('outDir', {
        alias: 'g',
        describe: 'Where generate JS files.',
        type: 'string'
    })
    .option('requireFile', {
        alias: 'r',
        describe: 'Bundled JS main file.',
        type: 'string'
    })
    .argv as Contracts.Arguments;
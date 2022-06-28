import yargs from 'yargs';

import { Program } from './program.js';
import { Log } from './log.js';

let commandOptions = {
    'env' : {
        type : 'string',
        desc: 'environment name. available options: [ dev, jmusic, music ]',
        default: 'dev'
    },
    'source' : {
        type : 'string',
        desc: 'where the information will be retrieved. available options: [ jpop, drama, games, vocaloid ]'
    }
};

let requiredOptions = [ 'env', 'source' ];

let argv = (yargs)(process.argv.slice(2))
    .usage('usage: ./musicdb.exe <command> [options]')
    .command({
        command: 'download [options]',
        desc: 'use to download media information from youtube',
        builder: (yargs) => { yargs
            .options(commandOptions)
            .demandOption(requiredOptions, "example: ./musicdb.exe download --env=env --source='jpop'")
        },
        handler: async (argv) => {
            await (new Program(argv.env).runDownload(argv.source));
            Log.info('main : download command completed...');
        }
    })
    .demandCommand()
    .help()
    .wrap(150)
    .argv;
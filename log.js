import log4js from 'log4js';
import { Config } from './config.js';

class Log {

    constructor() {

        log4js.configure({
            appenders: {
                console: { type: 'stdout', layout: { type: 'coloured' } },
                data: { type: 'file', filename: 'logs/data.txt', encoding: 'UTF-8' },
                warns: { type: 'file', filename: 'logs/warns.txt', encoding: 'UTF-8' },
                errors: { type: 'file', filename: 'logs/errors.txt', encoding: 'UTF-8' },
                datafilter: { type: 'logLevelFilter', appender: 'data', level: 'debug', maxLevel: 'info' },
                warnsfilter: { type: 'logLevelFilter', appender: 'warns', level: 'warn', maxLevel: 'warn' },
                errorsfilter: { type: 'logLevelFilter', appender: 'errors', level: 'error', maxLevel: 'fatal' }
            },
            categories: {
                default: { appenders: [ 'console', 'datafilter', 'warnsfilter', 'errorsfilter' ], level: Config.logLevel }
            }
        });

        this.logger = log4js.getLogger('animedb');
    }

    static get instance() {
        if (!Log._instance) {
            Log._instance = new Log();
        }
        return Log._instance;
    }

    static info(text) {
        Log.instance.logger.info(text);
    }
    
    static warn(text) {
        Log.instance.logger.warn(text);
    }

    static error(text) {
        Log.instance.logger.error(text);
    }
    
    static fatal(text) {
        Log.instance.logger.fatal(text);
    }

    static debug(text) {
        Log.instance.logger.debug(text);
    }
    
    static trace(text) {
        Log.instance.logger.trace(text);
    }
}

export { Log };
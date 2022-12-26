import fs from 'fs';
import path from 'path';

class Config {

    constructor() {}

    static get instance() {
        if (!Config._instance) {
            Config._instance = new Config();
        }
        return Config._instance;
    }

    static init(environment) {
        Config.instance.configFile = `config/musicdb.${environment}.json`;
        Config.instance.config = Config.parse(Config.configFile);
    }

    static get configFile() {
        return Config.instance.configFile;
    }
    
    static get config() {
        return Config.instance.config;
    }

    static get logLevel() {
        return Config.config.log.level;
    }

    static get databasePath() {
        return Config.config.database.path;
    }

    static get commandDownload() {
        return Config.config.command.download;
    }

    static get commandTags() {
        return Config.config.command.tags;
    }

    static get commandFilename() {
        return Config.config.command.filename;
    }
    
    static getSource(source) {
        return Config.config.sources[source];
    }

    static parse(config) {
        return JSON.parse(fs.readFileSync(path.resolve(config)));
    }
}

export { Config };
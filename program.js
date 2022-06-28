import { Log } from './log.js';
import { Config } from './config.js';
import { Database } from './database.js';

import { MusicDB } from './facade/musicdb.js';

class Program {

    constructor(environment) {
        this.database = new Database();
        Config.init(environment);
    }

    async runDownload(source) {
        try {
            Log.info(`program : download command : [ ${source}, ${Config.configFile} ]`);

            await this.database.init();

            let facade = new MusicDB(this.database);

            let criteria = { 
                download : Config.commandDownload,
                source : Config.getSource(source)
            };

            await facade.processDownload(criteria);
            
        } catch (error) {
            Log.fatal(error.message);
            Log.fatal(error.stack);
        }
    }
}

export { Program };
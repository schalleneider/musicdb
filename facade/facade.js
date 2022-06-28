import { Log } from '../log.js';

class Facade {

    constructor(database) {
        this.database = database;
    }
    
    async processDownload(criteria) {
        Log.warn('facade : download command is not supported : see --help for more information');
    }
}

export { Facade };
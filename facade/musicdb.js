import path from 'path';
import { execSync } from 'child_process';
import NodeID3 from 'node-id3';

import { Facade } from './facade.js';

import { Log } from '../log.js';
import { Common } from '../common.js';

class MusicDB extends Facade {

    constructor(database) {
        super(database);
    }

    async processDownload(criteria) {

        let processResults = { success: 0, errors: 0 };
        
        const youtubedl = path.join(path.resolve(criteria.download.binPath), "youtube-dl.exe");
        
        let downloads = await this.database.getDownloads(criteria);

        for (let downloadsIndex = 0; downloadsIndex < downloads.length; downloadsIndex++) {
            
            const currentDownload = downloads[downloadsIndex];

            const currentDownloadFileName = Common.parseDownloadFileName(criteria.source.table, currentDownload);

            Log.info(`musicdb : processing download : [ ${currentDownloadFileName} - ${currentDownload.Address} ]`);

            try {

                const outputPath = path.join(path.resolve(criteria.download.outputPath), `${currentDownloadFileName}.%(ext)s`);
                const address = currentDownload.Address;
                const args = `-f "${criteria.download.mediaFormat}" -ciw -o "${outputPath}" --extract-audio --audio-quality ${criteria.download.audioQuality} --audio-format ${criteria.download.audioFormat} "${address}"`;
            
                execSync(`${youtubedl} ${args}`, { stdio: 'inherit' });

                await this.database.saveDownload(criteria, currentDownload.Id);

                processResults.success++

            } catch (error) {
                Log.error(`[ ${currentDownloadFileName} - ${currentDownload.Address} ] : ${error.message}`);
                processResults.errors++;
            }
            
            await Common.sleep(criteria.delay);
        }

        Log.info(`musicdb : download process completed : [ success: ${processResults.success}, errors: ${processResults.errors} ]`);
    }
}

export { MusicDB };
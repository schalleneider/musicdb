import fs from 'fs';
import path from 'path';
import glob from 'glob';
import { execSync } from 'child_process';

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
        
        let downloads = await this.database.getSourceMedia(criteria, criteria.download.status);

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

                processResults.success++;

            } catch (error) {
                Log.error(`[ ${currentDownloadFileName} - ${currentDownload.Address} ] : ${error.message}`);
                processResults.errors++;
            }
            
            await Common.sleep(criteria.download.delay);
        }

        Log.info(`musicdb : download process completed : [ success: ${processResults.success}, errors: ${processResults.errors} ]`);
    }

    async processTags(criteria) {

        let processResults = { success: 0, errors: 0 };
        
        const tageditor = path.join(path.resolve(criteria.tags.binPath), "tageditor.exe");
        
        let media = await this.database.getSourceMedia(criteria, criteria.tags.status);
      
        for (let mediaIndex = 0; mediaIndex < media.length; mediaIndex++) {
            
            const currentMedia = media[mediaIndex];
            const currentMediaFileName = Common.parseDownloadFileName(criteria.source.table, currentMedia)

            Log.info(`musicdb : processing tags : [ ${currentMediaFileName} ]`);

            try {

                const currentMediaFile = path.join(path.resolve(criteria.tags.outputPath), `${currentMediaFileName}.${criteria.tags.audioFormat}`);
                
                if (fs.existsSync(currentMediaFile)) {
                    const args = `-s title="${currentMedia.Title}" artist="${currentMedia.Artist}" album="${currentMedia.Album}" track="${currentMedia.Id}" --max-padding 100000 -f "${currentMediaFile}"`;
                    execSync(`${tageditor} ${args}`, { stdio: 'inherit' });
                } else {
                    throw new Error(`[ ${currentMediaFile} ] file not found`);
                }

                processResults.success++;

            } catch (error) {
                Log.error(`[ ${currentMediaFileName} ] : ${error.message}`);
                processResults.errors++;
            }
            
            await Common.sleep(criteria.tags.delay);
        }

        Log.info(`musicdb : tags process completed : [ success: ${processResults.success}, errors: ${processResults.errors} ]`);
    }

    async processFilename(criteria) {

        let processResults = { success: 0, errors: 0 };
        
        let media = await this.database.getSourceMedia(criteria, criteria.filename.status);
      
        for (let mediaIndex = 0; mediaIndex < media.length; mediaIndex++) {
            
            const currentMedia = media[mediaIndex];
            const currentMediaFileName = Common.parseDownloadFileName(criteria.source.table, currentMedia)
            const currentMediaKey = Common.parseMediaKey(criteria.source.table, currentMedia);

            Log.info(`musicdb : processing filename : [ ${currentMediaFileName} ]`);

            try {

                const pattern = `${criteria.filename.searchPath}/**/*${currentMediaKey}*.*`;
                
                let foundFiles = glob.sync(pattern);
                
                if (foundFiles != null && foundFiles.length == 1) {
                    const newName = path.join(path.resolve(criteria.filename.searchPath), `${currentMediaFileName}${path.extname(foundFiles[0])}`)
                    fs.renameSync(path.resolve(foundFiles[0]), newName);
                } 
                else if (foundFiles.length > 1) {
                    throw new Error(`[ ${currentMediaKey} ] multiple files found for given key`);
                }
                else {
                    throw new Error(`[ ${currentMediaKey} ] file not found for given key`);
                }

                await this.database.saveDownload(criteria, currentMedia.Id);

                processResults.success++;

            } catch (error) {
                Log.error(`[ ${currentMediaFileName} ] : ${error.message}`);
                processResults.errors++;
            }
            
            await Common.sleep(criteria.filename.delay);
        }

        Log.info(`musicdb : filename process completed : [ success: ${processResults.success}, errors: ${processResults.errors} ]`);
    }
}

export { MusicDB };
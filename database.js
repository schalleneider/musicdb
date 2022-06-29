import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

import { Log } from './log.js';
import { Config } from './config.js';

class Database {

    async init() {
        this.database = await open({
            filename: Config.databasePath,
            driver: sqlite3.Database
        });
        Log.info(`database : connection opened : [ ${Config.databasePath} ]`);
    }

    async begin() {
        await this.database.run("begin transaction");
    }

    async commit() {
        await this.database.run("commit");
    }

    async rollback() {
        await this.database.run("rollback");
    }

    async select(config) {
        return await this.database.get(config.query, config.params)
    }

    async selectAll(config) {
        return await this.database.all(config.query, config.params)
    }

    async exec(config) {
        return await this.database.run(config.query, config.params)
    }

    async getDownloads(criteria) {
        try {

            const result = await this.selectAll({
                query: `SELECT * FROM ${criteria.source.table} WHERE Status = '${criteria.source.readiness}' ORDER BY Id ASC ${criteria.source.limit}`
            });

            if (result.length > 0) {
                return result;
            }

        } catch (error) {
            Log.error(`database : error retrieving ${criteria.source.table} : [ ${JSON.stringify(criteria)} ]`);
            Log.error(error.message);
            Log.error(error.stack);
        }

        return [];
    }

    async getDownloadedMedia(criteria) {
        try {

            const result = await this.selectAll({
                query: `SELECT * FROM ${criteria.source.table} WHERE Status = 'DONE' ORDER BY Id ASC ${criteria.source.limit}`
            });

            if (result.length > 0) {
                return result;
            }

        } catch (error) {
            Log.error(`database : error retrieving ${criteria.source.table} : [ ${JSON.stringify(criteria)} ]`);
            Log.error(error.message);
            Log.error(error.stack);
        }

        return [];
    }

    async saveDownload(criteria, downloadId) {

        let execResults = { added: 0, updated: 0, deleted: 0, errors: 0 };

        await this.begin();

        try {
            
            await this.exec({
                query: `UPDATE ${criteria.source.table} SET Status = ? WHERE Id = ?`,
                params: [
                    "DONE",
                    downloadId
                ]
            });
            execResults.updated++;
            
        } catch (error) {
            Log.error(`database : error updating ${criteria.source.table} : [ ${downloadId} ]`);
            Log.error(error.message);
            Log.error(error.stack);
            execResults.errors++;
        }

        await this.commit();

        Log.info(`database : ${criteria.source.table} updated : [ added: ${execResults.added}, updated: ${execResults.updated}, deleted: ${execResults.deleted}, errors: ${execResults.errors} ]`);
    }
}

export { Database };
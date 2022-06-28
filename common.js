
class Common {

    static sleep(miliseconds) {
        return new Promise((resolve) => {
            setTimeout(resolve, miliseconds);
        });
    }

    static parseDownloadFileName(source, download) {
        const fileName = `'${String(source).toUpperCase()}-${String(download.Id).padStart(4, '0')}'_'${download.Artist}'_'${download.Title}'_'${download.Album}'`;
        return fileName.replace(/[^a-z0-9\s\!\#\$\%\&\'\(\)\+\,\-\.\=\@\[\]\^\_\`\{\}\~]+/gi, ' ');
    }
}

export { Common }
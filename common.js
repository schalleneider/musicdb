
class Common {

    static sleep(miliseconds) {
        return new Promise((resolve) => {
            setTimeout(resolve, miliseconds);
        });
    }

    static parseDownloadFileName(source, media) {
        const fileName = `'${Common.parseMediaKey(source, media)}'_'${media.Artist}'_'${media.Title}'_'${media.Album}'`;
        return fileName.replace(/[^a-z0-9\s\!\#\$\%\&\'\(\)\+\,\-\.\=\@\[\]\^\_\`\{\}\~]+/gi, ' ');
    }

    static parseMediaKey(source, media) {
        return `${String(source).toUpperCase()}-${String(media.Id).padStart(4, '0')}`;
    }
}

export { Common }
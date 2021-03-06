import * as fs from 'fs';
import * as path from 'path';
import * as Contracts from './contracts';
import * as Helpers from './helpers';
import * as mkdirp from 'mkdirp';
import * as clc from 'cli-color';

const HEADER_COMMENT = '/* Generated by main-file-generator */';

export default class Generator {
    constructor(private config: Contracts.Config) { }

    public async Generate() {
        let fullPath = path.join(process.cwd(), this.config.baseDir, this.config.out);
        console.log(clc.cyanBright('Bundled dts file:'), fullPath);
        this.readDtsFile(fullPath).catch((err) => {
            console.error(err);
        });
    }

    private async readDtsFile(fullPath: string) {
        return new Promise((resolve, reject) => {
            fs.readFile(fullPath, 'utf8', (err, data) => {
                if (!err) {
                    let content = data.toString();
                    let declareModulePattern = new RegExp(`declare module '${this.config.name}\/(.*)'`, "g");
                    let matches = Helpers.getMatches(content, declareModulePattern) as Array<string>;
                    this.writeFiles(matches);
                } else {
                    reject(err);
                }
            });
        });
    }

    private writeFiles(matches: Array<string>) {
        console.info(clc.yellow('Generating files:'));
        matches.forEach((match: string) => {
            let cleanedMatch = this.cleanModule(match);
            let fullFilePath = path.join(process.cwd(), this.config.proxyjs.outDir, `${match}.js`);
            // Make sure that all folders are created.
            mkdirp.sync(path.dirname(fullFilePath));

            // Get `require` relative path.
            let requireFileFullPath = path.join(process.cwd(), this.config.proxyjs.requireFile);
            let requireFileRelativePath = this.getRelativePath(fullFilePath, requireFileFullPath);

            console.log(fullFilePath);
            //Write to file
            let stream = fs.createWriteStream(fullFilePath, { 'flags': 'w' });
            let moduleName = Helpers.kebabCaseToPascalCase(cleanedMatch);
            stream.write(
                [
                    HEADER_COMMENT,
                    this.generateLine(requireFileRelativePath, moduleName)
                ].join('\r\n'));
            stream.end();
        });
        console.info(clc.green('Done generating files.'));
    }

    private generateLine(requirePath: string, moduleName: string) {
        if (this.config.proxyjs.default === moduleName) {
            moduleName = 'default';
        }
        let exporterPrefix = "module.exports";
        if (this.config.proxyjs.exportAsDefault === undefined || this.config.proxyjs.exportAsDefault != null && this.config.proxyjs.exportAsDefault) {
            exporterPrefix += ".default";
        }
        return `${exporterPrefix} = require('${requirePath}').${moduleName};`;
    }

    private cleanModule(string: string) {
        let parts = string.split('/');
        return (parts.length > 0) ? parts[parts.length - 1] : '';
    }

    private getRelativePath(fromDir: string, toFilePath: string) {
        let filePath = path.relative(path.dirname(fromDir), toFilePath);
        if (path.sep !== "/") {
            filePath = filePath.split(path.sep).join('/');
        }

        if (filePath.indexOf('../') !== 0) {
            filePath = './' + filePath;
        }

        return filePath;
    }
}
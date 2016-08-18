#!/usr/bin/env node
import * as Contracts from './contracts';
import * as fs from 'fs';
import * as path from 'path';
import Generator from './generator';
import Arguments from './arguments';
import * as clc from 'cli-color';

const DEFAULT_CONFIG_NAME = 'dts-bundle.json';

class Cli {
    constructor(argv: Contracts.Arguments) {
        let configFileName = argv.config || DEFAULT_CONFIG_NAME;
        this.main(configFileName, argv);
    }

    private async main(configFileName: string, argv: Contracts.Arguments) {
        let fullPath = path.join(process.cwd(), configFileName);
        let configExists = await this.checkConfigIsExist(fullPath);

        if (configExists) {
            let config = await this.readConfigFile(configFileName).catch((err) => {
                this.throwError(`[Error] Config file ${DEFAULT_CONFIG_NAME} is not valid.`);
            }) as Contracts.Config;

            console.info(clc.cyanBright('Using config:'), fullPath);

            try {
                let generator = new Generator(this.getConfig(config, argv));
                await generator.Generate();
            } catch (e) {
                this.throwError(`[Failed] ${e}`);
            }
        } else {
            this.throwError(`[Error] Config file ${DEFAULT_CONFIG_NAME} was not found.`);
        }

    }

    private getConfig(config: Contracts.Config, args: Contracts.Arguments) {
        if (args.default != null) config.proxyjs.default = args.default;
        if (args.outDir != null) config.proxyjs.outDir = args.outDir;
        if (args.requireFile != null) config.proxyjs.requireFile = args.requireFile;
        if (args.exportAsDefault != null) config.proxyjs.exportAsDefault = args.exportAsDefault;
        if (config.baseDir == null) config.baseDir = '';
        if (config.proxyjs.outDir == null) {
            this.throwError('[Error] In proxyjs config `outDir` is undefined.');
        }
        if (config.proxyjs.requireFile == null) {
            this.throwError('[Error] In proxyjs config `requireFile` is undefined.');
        }
        return config;
    }

    private throwError(text: string) {
        console.error(clc.redBright(text));
        process.exit(1);
    }

    private async checkConfigIsExist(fullPath: string) {
        return new Promise<boolean>((resolve, reject) => {
            let fullPath = path.join(process.cwd(), DEFAULT_CONFIG_NAME);
            fs.access(fullPath, fs.F_OK, async (err) => {
                if (!err) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    }

    private async readConfigFile(fullPath: string) {
        return new Promise<Contracts.Config>((resolve, reject) => {
            fs.readFile(fullPath, 'utf8', (err, data) => {
                if (!err) {
                    let configData: Contracts.Config;
                    try {
                        configData = JSON.parse(data);
                        resolve(configData);
                    } catch (e) {
                        reject(e);
                    }
                } else {
                    reject(err);
                }
            });
        });
    }
}

new Cli(Arguments); 
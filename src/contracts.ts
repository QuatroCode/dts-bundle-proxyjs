export interface Config {
    name: string;
    baseDir: string;
    out: string;
    proxyjs: {
        default: string;
        generateDir: string;
        requireFile: string;
    }
}

export interface Arguments {
    [arg: string]: string | boolean;
    config: string;
    help: boolean;
    version: boolean;
    default: string;
    generatedir: string;
    requirefile: string;
}
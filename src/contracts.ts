export interface Config {
    name: string;
    baseDir: string;
    out: string;
    proxyjs: {
        default: string;
        outDir: string;
        requireFile: string;
        exportAsDefault: boolean;
    }
}

export interface Arguments {
    [arg: string]: string | boolean;
    config: string;
    help: boolean;
    version: boolean;
    default: string;
    outDir: string;
    requireFile: string;
    exportAsDefault: boolean;
}
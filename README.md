# dts-bundle-proxyjs
[![NPM version](http://img.shields.io/npm/v/dts-bundle-proxyjs.svg)](https://www.npmjs.com/package/dts-bundle-proxyjs) 
[![dependencies Status](https://david-dm.org/quatrocode/dts-bundle-proxyjs/status.svg)](https://david-dm.org/quatrocode/dts-bundle-proxyjs) 
[![devDependencies Status](https://david-dm.org/quatrocode/dts-bundle-proxyjs/dev-status.svg)](https://david-dm.org/quatrocode/dts-bundle-proxyjs?type=dev)

Generate js proxy files from dts-bundle file

## Get started
## Usage

1) Install from npm:
```cmd
$ npm install dts-bundle-proxyjs
```
2) Run `dts-bundle`.

3) After `d.ts` file bundled, run `dts-bundle-proxyjs`.

## Features
- Creates JS proxy from bundled dts.

## Usage
```sh
$ dts-bundle-proxyjs --help
```

### Examples
_Using config:_
Default config is `dts-bundle.js`.
```sh
$ dts-bundle-proxy -c dts-bundle.json
```

## Config

### Example JSON
```json
{
    "name": "example-lib",
    "main": "./dist/index.d.ts",
    "out": "./dist/example-lib.d.ts",
    "removeSource": true,
    "proxyjs": {
      "default": "Hello",
      "generateDir": "./dist",
      "requireFile": "./dist/build.js",
      "exportAsDefault": true
    }
}
```

### Explanation
`proxyjs` part:

| Argument        | Type   | Default | Description                                    |
|-----------------|--------|---------|------------------------------------------------|
| default         | string | none    | Parts that must be included.                   |
| generateDir `*` | string | none    | Parts that will be generated js files.         |
| requireFile `*` | string | none    | Bundled js file from where proxy will be made. |
| exportAsDefault | bool   | true    | Generated js files exported as default.        |

`*` - Required.

## License
Released under the [PGL-3.0 license](LICENSE).

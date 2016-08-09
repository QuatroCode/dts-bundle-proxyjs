# dts-bundle-proxyjs
Generate js proxy files from dts-bundle file

## Get started
```sh
$ npm install dts-bundle -g
```
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
      "requireFile": "./dist/build.js"
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

`*` - Required.

## License
Released under the [PGL-3.0 license](LICENSE).
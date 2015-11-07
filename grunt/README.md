# Grunt assetflow

https://github.com/verbling/assetflow

Assetflow provides hashed assets (`assets` task) as well as ability to replace placeholders with links
to processed assets in files (`assetReplace` task).

There is also a `assetsBundle` task to generate a a bundle js file suited for transferring to the client.
It does not appear to be useful for Django in any way.

## Hashes
`assetflow` uses MD5 hashes. Lenght is configurable via `truncateHash` option.


## Install

    npm install


## Usage
    rm -rf build/*
    ./node_modules/.bin/gulp assets


## Ouput

    cat build/manifest.json
    {
        "sass/fonts.scss": {
            "mtime": "2015-11-07T15:21:00.000Z",
            "absPath": "src/sass/fonts-a5a4ba6a.scss",
            "relPath": "sass/fonts-a5a4ba6a.scss",
            "hash": "a5a4ba6af602461016637a5a55181387",
            "gzipHash": "58e3b6c75db315dbbae6c3a1c4a17b85"
        },
        "__conf__": {
            "cdnurl": ""
        },
    }


## Other similar projects
* [grunt-assets-manifest] (https://github.com/stigmat4j/grunt-assets-manifest)

# Gulp Pipeline

## Flow
Tasks (`rev`, `rev-all` & `hash`) follow the same flow:
* Look for SCSS files in `sass`
* Convert to CSS
* write CSS to files with hashes of their contents in the file name
* Write a manifest to the output directory

The manifest file is a simple map of non-hashed names to hashed names.

Note: gulp-hash uses SHA1, gulp-rev and gulp-rev-all use MD5

## Install
    npm install

## Usage
    rm -rf dist/* && \
    ./node_modules/gulp/bin/gulp.js hash && \
    ./node_modules/gulp/bin/gulp.js rev && \
    ./node_modules/gulp/bin/gulp.js rev-all

## Output

    cat assets.json
    {
        "fonts.css":"fonts-da39a3ee.css",
        "main.css":"main-7141b06c.css"
    }

    cat rev-manifest.json
    {
        "fonts.css": "fonts-d41d8cd98f.css",
        "main.css": "main-1f6819c179.css"
    }


## Hashing Projects
* [gulp-hash](https://github.com/Dragory/gulp-hash) (SHA1)
* [gulp-rev](https://github.com/sindresorhus/gulp-rev) (MD5)
* [gulp-rev-all](https://github.com/smysnk/gulp-rev-all)

### Ignored
These projects all do hashing to some degree but don't use a manifest file.
* [gulp-hash-creator](https://github.com/wahaha2012/gulp-hash-creator)
* [gulp-hash-filename](https://github.com/intervalia/gulp-hash-filename)
* [gulp-hash-src](https://github.com/nmrugg/gulp-hash-src)
* [gulp-hashsum](https://github.com/remko/gulp-hashsum/)
* [gulp-rev-append](https://github.com/bustardcelly/gulp-rev-append)
* [gulp-static-hash](https://github.com/anhulife/gulp-static-hash)

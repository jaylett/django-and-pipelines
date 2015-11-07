# Gulp Pipeline

## Flow
This takes a couple of SCSS files, converts to CSS and renames them with the hash of their contents before writing them out to `dist`. A manifest is then written to current directory.

The manifest file is a simple map of non-hashed names to hashed names.

## Install
    npm install

## Usage
    ./node_modules/gulp/bin/gulp.js

## Output
    {
        "fonts.css":"fonts-da39a3ee.css",
        "main.css":"main-7141b06c.css"
    }


## Hashing Projects
* [gulp-hash-creator](https://github.com/wahaha2012/gulp-hash-creator)
* [gulp-hash-filename](https://github.com/intervalia/gulp-hash-filename)
* [gulp-hash-src](https://github.com/nmrugg/gulp-hash-src)
* [gulp-hash](https://github.com/Dragory/gulp-hash)
* [gulp-hashsum](https://github.com/remko/gulp-hashsum/)
* [gulp-rev-all](https://github.com/smysnk/gulp-rev-all)
* [gulp-rev-append](https://github.com/bustardcelly/gulp-rev-append)
* [gulp-rev](https://github.com/sindresorhus/gulp-rev)
* [gulp-static-hash](https://github.com/anhulife/gulp-static-hash)

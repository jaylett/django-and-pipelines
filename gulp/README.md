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

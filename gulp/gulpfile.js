var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var rimraf = require('rimraf');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

// manifest builders
var hash = require('gulp-hash');
var rev = require('gulp-rev');
var RevAll = require("gulp-rev-all");

// Output dirs
distHash = 'dist/hash';
distRev = 'dist/rev';
distRevAll = 'dist/revAll';

/*
 * HASH
 */
gulp.task('hashClean', function(cb) {
    return rimraf(distHash, cb);
});
gulp.task('hashCss', function() {
    return gulp.src('sass/*.scss')
        .pipe(sass())  // build CSS files
        .pipe(concat('all.css'))  // combine the CSS files
        .pipe(minifyCss({'compatibility': 'ie8'}))  // minify CSS
        .pipe(hash())  // hash the filenames
        .pipe(gulp.dest(distHash))  // write the files
        .pipe(hash.manifest('assets.json', true)) // Switch to the manifest file
        .pipe(gulp.dest(distHash));  // write the manifest file
});
gulp.task('hashJs', function() {
    return gulp.src('js/**/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(hash())
        .pipe(gulp.dest(distHash))
        .pipe(hash.manifest('assets.json', true))
        .pipe(gulp.dest(distHash));
});
gulp.task('hash', ['hashClean', 'hashCss', 'hashJs']);


/*
 * REV
 */
gulp.task('revClean', function(cb) {
    return rimraf(distRev, cb);
});
gulp.task('revCss', function() {
    return gulp.src('sass/*.scss')
        .pipe(sass())  // build CSS files
        .pipe(concat('all.css'))  // combine the CSS files
        .pipe(minifyCss({'compatibility': 'ie8'}))  // minify CSS
        .pipe(rev())  // hash the filenames
        .pipe(gulp.dest(distRev))  // write the files
        .pipe(rev.manifest()) // Switch to the manifest file
        .pipe(gulp.dest(distRev));  // write the manifest file
});
gulp.task('revJs', function() {
    return gulp.src('js/**/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(rev())  // hash the filenames
        .pipe(gulp.dest(distRev))
        .pipe(rev.manifest()) // Switch to the manifest file
        .pipe(gulp.dest(distRev));
});
gulp.task('rev', ['revClean', 'revCss', 'revJs']);


/*
 * REV-ALL
 */
gulp.task('revAllClean', function(cb) {
    return rimraf(distRevAll, cb);
});
gulp.task('revAllCss', function() {
    var revAll = new RevAll({
        fileNameManifest: 'rev-all-manifest.json'
    });

    return gulp.src('sass/*.scss')
        .pipe(sass())  // build CSS files
        .pipe(concat('all.css'))  // combine the CSS files
        .pipe(minifyCss({'compatibility': 'ie8'}))  // minify CSS
        .pipe(revAll.revision()) // hash the filenames
        .pipe(gulp.dest(distRevAll))  // write the files
        .pipe(revAll.manifestFile())
        .pipe(gulp.dest(distRevAll));  // write the manifest file
});
gulp.task('revAllJs', function() {
    var revAll = new RevAll({
        fileNameManifest: 'rev-all-manifest.json'
    });

    return gulp.src('js/**/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(revAll.revision()) // hash the filenames
        .pipe(gulp.dest(distRevAll))
        .pipe(revAll.manifestFile())
        .pipe(gulp.dest(distRevAll));
});
gulp.task('revAll', ['revAllClean', 'revAllCss', 'revJs']);

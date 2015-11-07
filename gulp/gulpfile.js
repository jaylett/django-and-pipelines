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

gulp.task('clean', function(cb) {
    return rimraf('./dist', cb);
});


/*
 * HASH
 */
gulp.task('hashCss', function() {
    var dist = 'dist/hash';
    return gulp.src('sass/*.scss')
        .pipe(sass())  // build CSS files
        .pipe(concat('all.css'))  // combine the CSS files
        .pipe(minifyCss({'compatibility': 'ie8'}))  // minify CSS
        .pipe(hash())  // hash the filenames
        .pipe(gulp.dest(dist))  // write the files
        .pipe(hash.manifest('assets.json', true)) // Switch to the manifest file
        .pipe(gulp.dest(dist));  // write the manifest file
});
gulp.task('hashJs', function() {
    var dist = 'dist/hash';
    return gulp.src('js/**/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(hash())
        .pipe(gulp.dest(dist))
        .pipe(hash.manifest('assets.json', true))
        .pipe(gulp.dest(dist));
});
gulp.task('hash', ['clean', 'hashCss', 'hashJs']);


/*
 * REV
 */
gulp.task('revCss', function() {
    var dist = 'dist/rev';
    return gulp.src('sass/*.scss')
       .pipe(sass())  // build CSS files
       .pipe(rev())  // hash the filenames
       .pipe(gulp.dest(dist))  // write the files
       .pipe(rev.manifest()) // Switch to the manifest file
       .pipe(gulp.dest(dist));  // write the manifest file
});
gulp.task('rev', ['clean', 'revCss']);


/*
 * REV-ALL
 */
gulp.task('revAllCss', function() {
    var dist = 'dist/rev-all';
    var revAll = new RevAll({
        fileNameManifest: 'rev-all-manifest.json'
    });

    return gulp.src('sass/*.scss')
       .pipe(sass())  // build CSS files
       .pipe(revAll.revision()) // hash the filenames
       .pipe(gulp.dest(dist))  // write the files
       .pipe(revAll.manifestFile())
       .pipe(gulp.dest(dist));  // write the manifest file
});
gulp.task('revAll', ['clean', 'revAllCss']);

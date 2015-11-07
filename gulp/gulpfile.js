var gulp = require('gulp');
var sass = require('gulp-sass');

// manifest builders
var hash = require('gulp-hash');
var rev = require('gulp-rev');

gulp.task('hash', function() {
    var dist = 'dist/hash';
    return gulp.src('sass/*.scss')
       .pipe(sass())  // build CSS files
       .pipe(hash())  // hash the filenames
       .pipe(gulp.dest(dist))  // write the files
       .pipe(hash.manifest('assets.json')) // Switch to the manifest file
       .pipe(gulp.dest(dist));  // write the manifest file
});


gulp.task('rev', function() {
    var dist = 'dist/rev';
    return gulp.src('sass/*.scss')
       .pipe(sass())  // build CSS files
       .pipe(rev())  // hash the filenames
       .pipe(gulp.dest(dist))  // write the files
       .pipe(rev.manifest()) // Switch to the manifest file
       .pipe(gulp.dest(dist));  // write the manifest file
});

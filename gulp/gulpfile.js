var gulp = require('gulp');
var hash = require('gulp-hash');
var sass = require('gulp-sass');

gulp.task('default', function() {
    return gulp.src('sass/*.scss')
       .pipe(sass())  // build CSS files
       .pipe(hash())  // hash the filenames
       .pipe(gulp.dest('dist'))  // write the files
       .pipe(hash.manifest('assets.json')) // Switch to the manifest file
       .pipe(gulp.dest('.'));  // write the manifest file
});

var gulp = require('gulp');
var RevAll = require("gulp-rev-all");
var sass = require('gulp-sass');

gulp.task('default', function() {
    var revAll = new RevAll();

    return gulp.src('sass/*.scss')
      .pipe(sass())  // build CSS files
      .pipe(revAll.revision())
      .pipe(gulp.dest('dist'))  // write the files
      .pipe(revAll.manifestFile())
      .pipe(gulp.dest('.'));  // write the manifest file
});

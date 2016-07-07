var gulp = require('gulp');
var sass = require('gulp-sass');
var nano = require('gulp-cssnano');

gulp.task('sass', sassTask);

 function sassTask() {
  return gulp
    .src('src/app/styles/main.scss')
    .pipe(sass())
    .pipe(nano())
    .pipe(gulp.dest('dist'))
}

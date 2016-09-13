var gulp = require('gulp');
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rs = require('run-sequence');

var sass            = require('gulp-sass');
var rename          = require('gulp-rename');
var sourcemaps      = require('gulp-sourcemaps');
var autoprefixer    = require('gulp-autoprefixer');
var plumber         = require('gulp-plumber');
var cssnano         = require('gulp-cssnano');

var gutil           = require('gulp-util');

var onError = function (err) {
    gutil.beep();
    console.log(err);
};

gulp.task('default', function() {
    gulp.src('src/peripheral.js')
    .pipe(uglify())
    .pipe(concat('peripheral.min.js'))
    .pipe(gulp.dest('./dist/'));
});

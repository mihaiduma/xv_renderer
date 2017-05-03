var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var ngannotate = require('browserify-ngannotate');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var jQuery = require('jquery');

gulp.task('bundle', function(){
   return browserify({
    entries: "./src/main.js",
    debug: true,
    transform: [
      babelify.configure({
        presets: ['es2015', 'es2016', 'stage-3'],
        sourceMaps: true
      }),
      ngannotate
    ],
    paths: "./src/**/*.js"
  }).bundle()
    .pipe(plumber())
    .pipe(source('main.js'))
    .pipe(gulp.dest('./dist/'))
    .pipe(buffer())
    .pipe(rename({ suffix: ".min" }))
    .pipe(uglify())
   .pipe(gulp.dest('./dist/'))
});

gulp.task('html', function(){
   return gulp.src('./src/**/*.html')
   .pipe(gulp.dest('./dist/'));
});

gulp.task('resources', function(){
   return gulp.src([
       './src/images/*.png'
   ])
   .pipe(gulp.dest('./dist/images'));
});

gulp.task('build', ['bundle', 'html', 'resources']);
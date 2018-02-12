'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync').create();
var runSequence = require('run-sequence');
var rename = require('gulp-rename');
var del = require('del');
var minify = require('gulp-csso');
var posthtml = require('gulp-posthtml');
var include = require('posthtml-include');
var svgstore = require('gulp-svgstore');
var imagemin = require('gulp-imagemin');
var webp = require('gulp-webp');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');

gulp.task('clean', function () {
  return del('build');
});

gulp.task('copy', function () {
  return gulp.src([
    'source/fonts/**/*.{woff,woff2}',
    'source/img/*.{png,jpg,svg}',
    'source/js/*.min.js'
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'));
});

/* Run after 'copy' task in order to minify images in build folder
and don't change originals */
gulp.task('imagemin', function () {
  return gulp.src('build/img/**/*.{png,jpg,svg}')
    .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.jpegtran({progressive: true}),
    imagemin.svgo()
  ]))
    .pipe(gulp.dest('build/img'));
});

//Run after 'imagemin' task
gulp.task('sprite', function () {
  return gulp.src('build/img/s-icon-*.svg')
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
});

gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"));
});

gulp.task('html', function () {
  return gulp.src('source/*.html')
    .pipe(posthtml([
      include()
    ]))
    .pipe(htmlmin({
      collapseWhitespace: true,
      collapseInlineTagWhitespace: true
    }))
    .pipe(gulp.dest('build'))
    .pipe(server.stream());
});

gulp.task('style', function() {
  gulp.src('source/less/style.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream())
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'));
});

gulp.task('js', function () {
  gulp.src('source/js/main.js')
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(server.stream())
});

gulp.task('build', function (done) {
  runSequence('clean', 'copy', 'imagemin', 'sprite', 'webp', 'html', 'style', 'js', done);
});

gulp.task('serve', function() {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/less/**/*.less', ['style']);
  gulp.watch('source/*.html', ['html']);
  gulp.watch('source/js/main.js', ['js']);
});

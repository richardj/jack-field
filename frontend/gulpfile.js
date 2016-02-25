'use strict';

var gulp          = require('gulp');
var sass          = require('gulp-sass');
var concat        = require('gulp-concat');
var rename        = require('gulp-rename');
var sourcemaps    = require('gulp-sourcemaps');
var autoprefixer  = require('gulp-autoprefixer');
var order         = require('gulp-order');
var uglify        = require('gulp-uglify');
var minifycss     = require('gulp-minify-css');
var notify        = require('gulp-notify');


var sassSrc     = './src/sass';
var scriptSrc   = './src/scripts';
var templateSrc = './src/views';
var cssDest     = '../public/css';
var jsDest      = '../public/scripts/';

gulp.task('sass', function() {
  return gulp.src(sassSrc + '/base.scss')
    .pipe(sass({ style: 'expanded'}))
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('../public/styles/'))
    .pipe(notify({ message: 'Styles task complete' }));
});


/*
 * Library scripts
 */

gulp.task('libscripts', function() {
  gulp.src([
    './bower_components/angular/angular.min.js',
    './bower_components/angular-cookies/angular-cookies.min.js',
    './bower_components/angular-route/angular-route.min.js',
    './bower_components/moment/min/moment.min.js',
    './bower_components/ng-dialog/js/ngDialog.min.js'
    ])
    .pipe(gulp.dest('./dist/libs'))
    //.pipe(gulp.src('./dist/libs/*.js'))
    .pipe(order([
      'angular.min.js',
      'angular-cookies.min.js',
      'angular-route.min.js',
      'moment.min.js',
      'ngDialog.min.js'
    ]))
    .pipe(concat('libs.js'))
    //.pipe(uglify())
    .pipe(gulp.dest('../public/scripts'));
});

gulp.task('scripts', function() {
  return gulp.src(scriptSrc + '/**/*.js')
    .pipe(order([
      'general.js',
      'scripts.js',
      'controllers/projects.js',
      'controllers/tasks.js'
    ]))
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/scripts/'))
    .pipe(rename('all.min.js'))
    //.pipe(uglify())
    .pipe(gulp.dest(jsDest))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('templates', function() {
  return gulp.src(templateSrc + '/partials/**/*.html')
  .pipe(gulp.dest('../public/templates/partials'))
  .pipe(notify({ message: 'Templates task complete' }));
});

gulp.task('watch', function() {
  // Watch the scripts files
  gulp.watch(scriptSrc + '/**/*.js', ['scripts']);

  // Watch the Sass files
  gulp.watch(sassSrc + '/**/*.scss', ['sass']);

  // Watch the view templates
  gulp.watch(templateSrc + '/**/*.html', ['templates']);
});

gulp.task('default', ['watch']);



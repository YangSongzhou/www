'use strict';
var gulp = require('gulp');
var debug = require('gulp-debug');
var excludeGitignore = require('gulp-exclude-gitignore');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var istanbul = require('gulp-istanbul');
var nsp = require('gulp-nsp');
var plumber = require('gulp-plumber');

var handleErr = function (err) {
  console.log(err.message);
  process.exit(1);
};

gulp.task('static', function () {
  return gulp.src(['**/*.js', '!public/**/*.js', '!coverage/**/*.js'])
    .pipe(excludeGitignore())
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
    .pipe(jscs())
    .on('error', handleErr);
});

gulp.task('nsp', function (cb) {
  nsp('package.json', cb);
});

gulp.task('pre-test', function () {
  return gulp.src('app/**/*.js')
    .pipe(istanbul({includeUntested: true}))
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function (cb) {
  var mochaErr;

  console.log(process.cwd());
  gulp.src('test/**/*.js')
    .pipe(debug({title: 'test', minimal: false}))
    .pipe(plumber())
    .pipe(mocha({reporter: 'spec'}))
    .on('error', function (err) {
      mochaErr = err;
    })
    .pipe(istanbul.writeReports())
    .on('end', function () {
      cb(mochaErr);
    });
});

gulp.task('prepublish', ['nsp']);
gulp.task('default', ['static', 'test']);

var path = require('path'),
  namespace = require('gulp-namespace'),
  gulp = require('gulp'),
  requireDir = require('require-dir'),
  taskListing = require('gulp-task-listing');
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload');

namespace(gulp);

gulp.task('help', taskListing);

gulp.namespace('front', function() {
  process.chdir(path.join(__dirname, 'public'));
  requireDir('./public/gulp');
});

gulp.task('develop', function () {
  livereload.listen();
  nodemon({
    script: path.join(__dirname, 'app.js'),
    ext: 'js',
    watch: __dirname,
    "ignore": [
        ".git",
        "node_modules/**/node_modules",
        "public"
      ]
  }).on('restart', function () {
    setTimeout(function () {
      livereload.changed(__dirname);
    }, 500);
  });
});

gulp.task('default', [
  'develop',
  'front:serve'
]);

// shiming
gulp.task('style', ['front:style']);
gulp.task('inject', ['front:inject']);


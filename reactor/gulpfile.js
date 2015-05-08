var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    open = require('gulp-open'),
    webserver = require('gulp-webserver'),
    livereload = require('gulp-livereload'),
    runSequence  = require('run-sequence'),
    mainBowerFiles = require('main-bower-files'),
    del = require('del');


/////////////////////////////////////////////////
//	BUILD files into build/
/////////////////////////////////////////////////
gulp.task('bower-files', function() {
    return gulp.src(mainBowerFiles())
        .pipe(gulp.dest('build/assets/lib'))
});

gulp.task('scripts', function() {
  return gulp.src('src/scripts/*.js')
    .pipe(jshint())
    //.pipe(jshint.reporter('default', { verbose: true }))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('build/assets/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('styles', function() {
  return gulp.src('src/styles/*')
    .pipe(gulp.dest('build/assets/styles'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('images', function() {
  return gulp.src('src/images/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('build/assets/img'))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('html', function() {
	return gulp.src('src/html/index.html')
	//.pipe( includeSources() )
	.pipe(gulp.dest('build'))
    .pipe(notify({ message: 'Html task complete' }));
});

/////////////////////////////////////////////////
//	Webserver
/////////////////////////////////////////////////
gulp.task('webserver', function() {
  gulp.src('build')
    .pipe(webserver({
      livereload: true,
      //directoryListing: true,
      open: true
    }));
});

gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('src/styles/*.css', ['styles']);
  gulp.watch('bower_components*', ['bower-files']);
  gulp.watch('src/scripts/*.js', ['scripts']);
  gulp.watch('src/images/*', ['images']);
  gulp.watch('src/html/*', ['html']);

  // Create LiveReload server
  livereload.listen();

  // Watch any files in build/, reload on change
  gulp.watch(['build/**']).on('change', livereload.changed);
});


/////////////////////////////////////////////////
//	Build commands
/////////////////////////////////////////////////

// scripts that need to be called
var build_cmds = ['scripts', 'images', 'html', 'styles', 'bower-files'];

gulp.task('build', function(cb) {
    runSequence('clean', build_cmds, cb);
});

gulp.task('clean', function(cb) {
    del(['build'], cb)
});

gulp.task('run', function(cb) {
  runSequence('clean', 
  	['scripts', 'images', 'html', 'styles', 'bower-files'],  // all the build tasks
  	'webserver', 
  	'watch', 
  	cb);
});

gulp.task('default', ['clean'], function() {
  gulp.start('run');
});
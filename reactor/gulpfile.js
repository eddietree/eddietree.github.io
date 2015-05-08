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
    mainBowerFiles = require('main-bower-files'),
    del = require('del');


gulp.task('bower-files', function() {
    return gulp.src(mainBowerFiles())
        .pipe(gulp.dest('dist/assets/lib'))
});

gulp.task('scripts', function() {
  return gulp.src('src/scripts/*.js')
    .pipe(jshint())
    //.pipe(jshint.reporter('default', { verbose: true }))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('styles', function() {
  return gulp.src('src/styles/*')
    .pipe(gulp.dest('dist/assets/styles'))
    .pipe(notify({ message: 'Styles task complete' }));
});


gulp.task('images', function() {
  return gulp.src('src/images/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/assets/img'))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('html', function() {
	return gulp.src('src/html/index.html')
	//.pipe( includeSources() )
	.pipe(gulp.dest('dist'))
    .pipe(notify({ message: 'Html task complete' }));
});

gulp.task('clean', function(cb) {
    del(['dist'], cb)
});

function DoYoThang()
{
  gulp.start('scripts', 'images', 'html', 'styles', 'bower-files');
};

gulp.task('default', ['clean'], function() {
  
  //gulp.start('scripts', 'images', 'html', 'styles', 'bower-files');
  DoYoThang();
});

gulp.task('webserver', function() {
  gulp.src('dist')
    .pipe(webserver({
      livereload: true,
      //directoryListing: true,
      open: true
    }));

    // open file
  	//gulp.src('dist/*.html')
  	//.pipe(open('', {app: 'chrome', url: 'http://localhost:3000'}));
});

gulp.task('watch', function() {

  DoYoThang();

  gulp.start( 'webserver');


  // Watch .scss files
  gulp.watch('src/styles/*.css', ['styles']);
  gulp.watch('bower_components*', ['bower-files']);
  gulp.watch('src/scripts/*.js', ['scripts']);
  gulp.watch('src/images/*', ['images']);
  gulp.watch('src/html/*', ['html']);

  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', livereload.changed);
});


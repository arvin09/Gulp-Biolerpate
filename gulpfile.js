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
    livereload = require('gulp-livereload'),
    watch = require('gulp-watch'),
    del = require('del');
    

gulp.task('styles',function(){
   return sass('src/styles/main.scss',{style : 'expanded'})
   .pipe(autoprefixer('last 2 version'))
   .pipe(gulp.dest('dist/assets/css'))
   .pipe(rename({suffix: '.min'}))
   .pipe(minifycss())
   .pipe(gulp.dest('dist/assets/css'))
   .pipe(notify({ message: 'Styles task complete' })); 
});

gulp.task('scripts', function() {
  return gulp.src('src/scripts/**/*.js')
    .pipe(concat('gmb.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('images',function(){
  return gulp.src('src/images/**/*')
  .pipe(imagemin({optimizationLevel: 5, progressive: true, interlaced: true}))
  .pipe(gulp.dest('dist/assets/images'))
  .pipe(notify({message:'images task complete'}));
});

gulp.task('clean',function(){
  del(['dist/assets/css','dist/assets/js','dist/assets/images']);
});

// Watch
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('src/styles/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('src/scripts/**/*.js', ['scripts']);

  // Watch image files
  gulp.watch('src/images/**/*', ['images']);

  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', livereload.changed);

});

gulp.task('default', ['clean'], function() {
    // gulp.start('styles', 'scripts', 'images');
    gulp.start('scripts');
});
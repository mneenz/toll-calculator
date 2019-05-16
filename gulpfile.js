// Include gulp
var gulp    = require('gulp');

// Include Our Plugins
var jshint      = require('gulp-jshint');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var rename      = require('gulp-rename');
var sass        = require('gulp-sass');

// Lint Task
gulp.task('lint', function() {
    return gulp.src(['assets/js/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(['assets/js/*.js'])
        .pipe(concat('/js/scripts.js'))
        .pipe(gulp.dest('assets/dist'))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('assets/dist/js'));
});


// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('assets/js/*.js', ['lint', 'scripts']);
    gulp.watch('assets/css/sass/*.scss', ['sass']);
});

// Include css
gulp.task('sass', function () {
    return gulp.src('./assets/css/sass/style.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .on('error', function (err) {
            console.log(err.toString());
            this.emit('end');
        })
        .pipe(gulp.dest('./assets/dist/css'))

});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);
gulp.task('dev', ['lint', 'sass', 'scripts', 'watch']);

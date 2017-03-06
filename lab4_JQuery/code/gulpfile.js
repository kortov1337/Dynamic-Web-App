const gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
     gulpSequence = require('gulp-sequence'),
    autoprefixer = require('gulp-autoprefixer'),
     cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat');
    babel = require('gulp-babel'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    webpack = require("webpack-stream");



gulp.task('css', () =>
    gulp.src('app/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(concat('main.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css/'))
);


gulp.task('script', () => {
    return gulp.src('./app/js/main.js')
        .pipe(webpack({
            module: {
                loaders: [{
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015']
                    }
                }]
            },
            output: {
                libraryTarget: "var",
                library: "BooksModule"
            }
        }))
        .pipe(rename('index.js'))
        .pipe(gulp.dest('./app/js'));
});

gulp.task('scripts', () => {
    return gulp.src('./app/js/*.js')
        .pipe(gulp.dest('./dist/js'));
})

gulp.task('fonts', () => {
    return gulp.src('./app/fonts/*')
        .pipe(gulp.dest('./dist/fonts'));
})

gulp.task('img', () =>
    gulp.src('./app/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'))
);

gulp.task('html', () => {
    return gulp.src('./app/*.html')
        .pipe(gulp.dest('./dist'));
})

gulp.task('watch', () => {
    gulp.watch('./app/js/*.js', ['script','scripts']);
});

//gulp.task('default', gulpSequence('build', 'watch'));
//gulp.task('default', ['script','watch']);
gulp.task('default', ['script', 'css','scripts','img','html','fonts', 'watch']);


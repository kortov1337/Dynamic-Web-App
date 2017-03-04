const gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
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
    return gulp.src('./app/scripts/main.js')
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
        .pipe(gulp.dest('./app/scripts'));
});

gulp.task('scripts', () => {
    return gulp.src('./app/scripts/*.js')
        .pipe(gulp.dest('./dist/scripts'));
})

gulp.task('img', () =>
    gulp.src('./app/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img'))
);

gulp.task('html', () => {
    return gulp.src('./app/*.html')
        .pipe(gulp.dest('./dist'));
})

gulp.task('watch', () => {
    gulp.watch('./app/scripts/*.js', ['script']);
});

gulp.task('default', ['script', 'css','scripts','img','html','watch']);


const gulp = require('gulp'),
    babel = require('gulp-babel'),
    rename = require('gulp-rename'),
    webpack = require("webpack-stream");

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

gulp.task('watch', () => {
    gulp.watch('./app/scripts/*.js', ['script']);
});

gulp.task('default', ['script', 'watch']);
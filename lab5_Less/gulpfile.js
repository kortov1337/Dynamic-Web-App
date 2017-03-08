const gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    gulpSequence = require('gulp-sequence'),
     cleanCSS = require('gulp-clean-css'),
     browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin');

gulp.task('less', () => {
return gulp.src('./app/less/style.less')
  .pipe(less())
  .pipe(gulp.dest('./app/css_tmp'));
});

gulp.task('css', () =>
    gulp.src('app/css_tmp/*.css')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(concat('style.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css/'))
);

gulp.task('scripts', () => {
    return gulp.src('./app/js/*.js')
        .pipe(gulp.dest('./dist/js'));
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

gulp.task('build', gulpSequence('less',[
    'html',
    'img',
    'scripts',
    'css'
]));

gulp.task('serve', () => {
    browserSync.init({
        server: './dist/',
        port: 4000
    });

    browserSync.watch('./dist/').on('change', browserSync.reload);
});

gulp.task('default', gulpSequence('build',['serve']));



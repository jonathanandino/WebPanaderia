'use strict'

const browserSync = require('browser-sync');
const imagemin = require('gulp-imagemin');
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    cleanCss = require('gulp-clean-css'),
    flatmap = require('gulp-flatmap'),
    htmlmin = require('gulp-htmlmin');

gulp.task('sass', function(){
    gulp.src('./css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
})
gulp.task('sass:watch', function(){
    var files= ['./*.html', './css/*.css', './img/*.{png, jpg, gif', './js/*.js']
    browserSync.init(files, {
        server:{
            baseDir: './'
        }
    });
});

gulp.task('default', ['browser-sync'], function(){
    gulp.start('sass:watch');
})

gulp.task('clean', function (){
    return del(['dist']);
});

gulp.task('copyfonts', function(){
    gulp.src('./node_modules/open-iconic/font/fonts/*.{ttf,woff,eof,svg,eot,otf}*')
        .pipe(gulp.dest('./dist/fonts'));
})

gulp.task('imagemin', function(){
    return gulp.src('./img/*.{png, jpg, jpeg, gif')
    .pipe(imagemin({optiimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('usemin', function(){
    return gulp.src('./*.html')
    .pipe(flatmap(function(stream, file){
        return stream
            .pipe(usemin({
                css: [rev()],
                html: [function(){ return htmlmin({collapseWhitespace: true})}],
                js: [uglify(), rev()],
                inlinejs: [uglify()],
                inlinecss: [cleanCss(), 'concat']

            }));
    }))
    .pipe(gulp.dest('dist/'));

});

gulp.task('build', ['clean'], function(){
    gulp.start('copyfonts','imagemin', 'usemin');
})
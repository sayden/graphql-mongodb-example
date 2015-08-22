'use strict';

/* Modules */
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var babel = require('gulp-babel');
var nodemon = require('gulp-nodemon');
var fs = require("fs");
var browserify = require("browserify");
var babelify = require("babelify");

/* Gulp variables */
var config = {
    appFolder: '.',
    entryFile: 'index.js',
    watch: ['js/**/*.es6'],
  appFile: './js/App.es6'
};

gulp.task('default',['babelify'], function(){
    nodemon({
        script:config.entryFile,
        ext:'js html es6 jsx',
        env: { 'NODE_ENV': 'development' }
    });
});

gulp.task('babelify', function(){
  browserify("./js/App.es6", { debug: true })
    .transform(babelify.configure({stage:0}))
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(fs.createWriteStream("bundle.js"));
});


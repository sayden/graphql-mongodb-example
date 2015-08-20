'use strict';

/* Modules */
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var babel = require('gulp-babel');
var nodemon = require('gulp-nodemon');

/* Gulp variables */
var config = {
    appFolder: '.',
    entryFile: 'index.js'
};

gulp.task('default', function(){
    nodemon({
        script:config.entryFile,
        ext:'js html es6',
        env: { 'NODE_ENV': 'development' }
    });
});


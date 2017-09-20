'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});
var gulpTypings = require("gulp-typings");
var reporter = require('gulp-protractor-cucumber-html-report');

var path = require('path');
var browserSync = require('browser-sync');
var behavePro = require('behavepro');
var argv = require('yargs').argv;
var replace = require('gulp-replace');
var fs = require('fs-extra');
var ts = require('gulp-typescript');
var protractor = require("gulp-protractor");
var protractordef = require("protractor");
var exec = require('child_process').exec;
var request = require('request');
var del = require('del');

module.exports = function (options) {

    gulp.task('webdriver-update', protractor.webdriver_update);

    gulp.task('webdriver-standalone', protractor.webdriver_standalone);

    gulp.task('transpile', function () {
        return gulp.src('apps/*NonAngularApplication*/**/*.ts')
            .pipe(replace('userIntendedUrl', argv.url ? argv.url : argv.url))
            .pipe(
                ts({
                    "target": "es5",
                    "noEmitOnError": true,
                    "skipLibCheck": true
                })
            )
            .pipe(gulp.dest(options.tmp))
            .pipe($.wait(2000));
    });


    gulp.task('copytestdata-e2e', function (done) {
        return gulp.src('apps/*NonAngularApplication*/**/*.{pdf,jpg,jpeg,png,json}')
            .pipe(gulp.dest('.tmp/'));
    });

    function runProtractor(done) {

        var args = [];
        var configFile = 'protractor.conf.js';

        if (argv.suite == 'triage') {
            configFile = 'protractor.conf.triage.js';
        }

        if (argv.e2eTags) {
            args.push('--cucumberOpts.tags');
            args.push(argv.e2eTags);
        }

        if (argv.e2eAndTags) {
            args.push('--cucumberOpts.tags');
            args.push(argv.e2eAndTags);
        }

        gulp.src('')
            .pipe(protractor.protractor({
                configFile: configFile,
                args: args
            }))
            .on('error', function (err) {
                // Make sure failed tests cause gulp to exit non-zero
                throw err;
            })
            .on('end', function () {
                // Close browser sync server
                browserSync.exit();
                done();
            });
    }


    gulp.task('clean', function (done) {
        $.del([options.tmp + '*', 'reports*', 'typings'], done);
    });

    gulp.task('Generate-TestResult', function (options) {
        var resultFile = 'cucumber-test-results.json';
        var reportLocation = 'reports/';


        gulp.src(path.join(process.cwd(), '.tmp', resultFile))
            .pipe(replace('][', ','))
            // .pipe(gulp.dest(path.join(process.cwd(), '.tmp', resultFile)))
            .pipe(reporter({
                dest: reportLocation
            }));

    });

    gulp.task('protractor', ['transpile', 'copytestdata-e2e', 'webdriver-update'], runProtractor);

}

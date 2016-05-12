/*!
 * Mine
 *
 * Released under the GPL-3.0 License.
 *
 * Copyright (c) 2016
 */

'use strict';

// node_modules
var chalk = require('chalk');
var gulp = require('gulp');

// local modules
var pkg = require('./package.json');

// tasks
gulp.task('default', function() {
    console.log(chalk.red(pkg.title + ' | ' + pkg.description));
});

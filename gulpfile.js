'use strict';

var autoprefixer = require('autoprefixer-stylus');
var browserify = require('browserify');
var budo = require('budo');
var buffer = require('vinyl-buffer');
var del = require('del');
var ghPages = require('gulp-gh-pages');
var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var stylus = require('gulp-stylus');
var uglify = require('gulp-uglify');

var PATHS = {
    stylus: './src/simple-color-picker.styl',
    scripts: './src/*.{ts,js}',

    build: './build/',
    build_css: './build/*.css',

    example: './example/',
    example_script_src: './example/example.js',
    example_script_dest: './example/example-build.js',
    example_script_dest_name: 'example-build.js',
    example_styles_dest: './example/*.css'
};

gulp.task('clean', function(cb) {
    del.sync([PATHS.build, PATHS.example_script_dest, PATHS.example_styles_dest], { force: true });
    cb();
});

gulp.task('styles', function() {
    return gulp.src(PATHS.stylus)
        .pipe(stylus({
            use: [autoprefixer('iOS >= 7', 'last 1 Chrome version')]
        }))
        .pipe(gulp.dest(PATHS.build))
});

gulp.task('scripts', function() {
    return gulp.src(PATHS.scripts)
        .pipe(gulp.dest(PATHS.build));
});

gulp.task('example:styles', gulp.series('styles', function() {
    return gulp.src(PATHS.build_css)
        .pipe(gulp.dest(PATHS.example));
}));

gulp.task('example:scripts', gulp.series('scripts', function() {
    var b = browserify({
        entries: PATHS.example_script_src
    });

    return b.bundle()
        .pipe(source(PATHS.example_script_dest_name))
        .pipe(buffer())
        .pipe(uglify()).on('error', gutil.log)
        .pipe(gulp.dest(PATHS.example));
}));
  
gulp.task('example:watch', function(cb) {
    gulp.watch(PATHS.stylus, gulp.series('example:styles'));
    gulp.watch(PATHS.scripts, gulp.series('example:scripts'));

    budo({
        dir: 'example',
        live: true,
        open: true
    }).on('exit', cb)
});

gulp.task('build', gulp.series('clean', 'styles', 'scripts'));

gulp.task('example', gulp.series('build', 'example:styles', 'example:scripts'));

gulp.task('deploy', gulp.series('example', function() {
    return gulp.src(PATHS.example + '/**/*')
        .pipe(ghPages());
}));

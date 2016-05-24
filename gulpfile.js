var gulp        = require("gulp"),
    istanbul    = require("gulp-istanbul"),
    mocha       = require("gulp-mocha");

gulp.task("istanbul:hook", function() {
    // all js files except specs, modules, and shims for code coverage report
    return gulp.src([
        'src/**/*.js',
        '!src/**/main.js'])
        // Covering files
        .pipe(istanbul({
            includeUntested: true
        }))
        // Force `require` to return covered files
        .pipe(istanbul.hookRequire());
});

gulp.task("test", ["istanbul:hook"], function() {
    return gulp.src('tests/**/*.spec.js')
        .pipe(mocha({ui: 'bdd'}))
        .pipe(istanbul.writeReports());
});
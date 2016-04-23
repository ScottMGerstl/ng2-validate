var gulp        = require("gulp"),
    tsc         = require("gulp-typescript"),
    istanbul    = require("gulp-istanbul"),
    mocha       = require("gulp-mocha");

var tsTestProject = tsc.createProject("tsconfig.json");

gulp.task("build-test", function() {
    return gulp.src([
            "test/**/*.ts",
            "typings/main.d.ts/"
        ])
        .pipe(gulp.dest('.'))
        .js.pipe(gulp.dest("test/"));
});

gulp.task("istanbul:hook", function() {
    return gulp.src(['test/**/*.js'])
        // Covering files
        .pipe(istanbul())
        // Force `require` to return covered files
        .pipe(istanbul.hookRequire());
});

gulp.task("test", ["istanbul:hook"], function() {
    return gulp.src('test/**/*.spec.js')
        .pipe(mocha({ui: 'bdd'}))
        .pipe(istanbul.writeReports());
});
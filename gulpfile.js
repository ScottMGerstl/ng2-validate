var gulp        = require("gulp"),
    clean       = require("gulp-clean"),
    tsc         = require("gulp-typescript"),
    istanbul    = require("gulp-istanbul"),
    mocha       = require("gulp-mocha");

var tsProject = tsc.createProject("tsconfig.json");

gulp.task("build-app", function() {
    return gulp.src([
            "src/**/*.ts",
            "!src/**/*.spec.ts"
        ])
        .pipe(tsc(tsProject))
        .js.pipe(gulp.dest("dist/"));
});

gulp.task("istanbul:hook", function() {
    return gulp.src(['dist/**/*.js', '!dist/**/*.spec.js'])
        // Covering files
        .pipe(istanbul())
        // Force `require` to return covered files
        .pipe(istanbul.hookRequire());
});

gulp.task("test", ["istanbul:hook"], function() {
    return gulp.src('dist/**/*.spec.js')
        .pipe(mocha({ui: 'bdd'}))
        .pipe(istanbul.writeReports());
});

gulp.task("clean-spec", function() {
    return gulp.src('dist/_tests', {read: false})
		.pipe(clean());
});

gulp.task("clean-dist", function() {
    return gulp.src('dist', {read: false})
		.pipe(clean());
});

gulp.task("test-clean", ["test"], function() {
    return gulp.src('dist/_tests', {read: false})
		.pipe(clean());
});
var gulp        = require("gulp"),
    clean       = require("gulp-clean"),
    tsc         = require("gulp-typescript"),
    istanbul    = require("gulp-istanbul"),
    mocha       = require("gulp-mocha");
    browserify  = require('gulp-browserify');

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
    // all js files except specs, modules, and shims for code coverage report
    return gulp.src([
        'dist/**/*.js',
        '!dist/**/index.js',
        '!dist/**/*.module.js',
        '!dist/**/shims/*.js',
        '!dist/**/*.spec.js',
        '!dist/**/core.js',
        '!dist/**/logic.js'])
        // Covering files
        .pipe(istanbul({
            includeUntested: true
        }))
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

gulp.task('browserify', function() {
	return gulp.src(['dist/core.js', 'dist/logic.js'])
		.pipe(browserify({
		  insertGlobals : true
		}))
		.pipe(gulp.dest('publish'));
});

gulp.task("clean-publish", function() {
    return gulp.src('publish', {read: false})
		.pipe(clean());
});

gulp.task("prepublish", ["clean-publish", "browserify"], function() {
    return gulp.src(['dist/**/*.d.ts'])
		.pipe(gulp.dest('publish'));
});
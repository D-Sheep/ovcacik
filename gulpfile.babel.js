import gulp from 'gulp';
import sass from 'gulp-sass';
import babelify from 'babelify';
import browserify from 'gulp-browserify';
import sequence from 'gulp-sequence';
import del from 'del';
import sourcemaps from 'gulp-sourcemaps';

const sourcePath = './src';
const buildPath = './dist';

gulp.task('default', sequence(
	'clean',
	['build-styles', 'build-scripts'],
	'watch'
));

gulp.task('clean', () => {
	return del(buildPath, {
		force: true
	});
});

gulp.task('watch', () => {
	gulp.watch(sourcePath + '/**/*.scss', ['build-styles']);
	gulp.watch(sourcePath + '/**/*.js', ['build-scripts']);
});

gulp.task('build-styles', () => {
	return gulp
		.src(sourcePath + '/scss/index.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(buildPath));
});

gulp.task('build-scripts', () => {
	return gulp
		.src(sourcePath + '/js/index.js')
		.pipe(sourcemaps.init())
		.pipe(browserify({
			paths: [
				sourcePath + '/js'
			],
			transform: babelify
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(buildPath));
});
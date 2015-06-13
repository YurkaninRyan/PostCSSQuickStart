var gulp = require('gulp'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	csswring = require('csswring'),
    postcss = require('gulp-postcss'),
    processorsDev = [
        require('postcss-mixins'),
        require('postcss-simple-vars'),
        require('postcss-nested'),
        require('autoprefixer-core')({ browsers: ['last 2 versions', '> 2%'] })
    ],
    processorsDeploy = [
    	require('postcss-mixins'),
        require('postcss-simple-vars'),
        require('postcss-nested'),
        require('autoprefixer-core')({ browsers: ['last 2 versions', '> 2%'] }),
        require('csswring')({ preserveHacks: true, removeAllComments: true})
    ]

gulp.task('css-dev', function() {
  return gulp.src('public_html/**/*.css')
  	.pipe(postcss(processorsDev))
  	.pipe(rename({suffix: '-output'}))
  	.pipe(gulp.dest('public_html'))
  	.pipe(concat('main.css.min'))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('css-deploy', function() {
  return gulp.src('public_html/**/*.css')
  	.pipe(postcss(processorsDeploy))
  	.pipe(concat('main.css.min'))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('default', ['css-dev']);
gulp.task('deploy', ['css-deploy'])
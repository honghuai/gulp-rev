/**
 * Created by honghuai on 2015/12/7.
 */
var gulp = require('gulp');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var useref = require('gulp-useref');
var filter = require('gulp-filter');
var uglify = require('gulp-uglify');
var csso = require('gulp-csso');

gulp.task('index', function() {
    //var jsFilter = filter('**/*.js', {restore: true});
    var cssFilter = filter('assets/**/*.css', {restore: true});

    var userefAssets = useref.assets();

    return gulp.src('src/index.html')
        .pipe(userefAssets)  // ����html��build:{type}�飬���������õ����ļ��ϲ�������
        //.pipe(jsFilter)
        .pipe(uglify())             // ѹ��Js
        //.pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(csso())               // ѹ��Css
        .pipe(cssFilter.restore)
        .pipe(rev())                // �������ļ�
        .pipe(userefAssets.restore())
        .pipe(useref())
        .pipe(revReplace())         // ��д�ļ�����html
        .pipe(gulp.dest('dist'));
});
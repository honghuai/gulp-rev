/**
 * Created by honghuai on 2015/12/6.
 */
//������֮�󣬾Ϳ��ԶԾ�̬��Դ�����Ż����������Ƕ�����������һ����css�ģ�һ����js�ġ���css������Ա���less��sass�������Ҿ�û������Ȼ��js��ͬ�����Ա���coffee����������ϸ��������ĳ���������������css��Ȼ��src����css�ļ���ִ��csso��ѹ���Ż���Ȼ��������Ϊ*.min.css�����������ǵ�����Ӱ汾�ţ����������Ż��Ͱ汾���Ƶ�css�����dist�ļ�����������rev.manifest������Ӧ�İ汾����json��ʾ������������Բ�������ڶ���ͼ������ͨ��hash����ȷ��λ��htmlģ������Ҫ���ĵĲ���
//src����һ�����飬ǰһ��������ղ����ɵ�json�ļ�����һ������Ҫ���ĵ�htmlģ�壬��Ȼ��������jsp��Ȼ��replaceReved: true�Ϳ��Գɹ��滻�ˡ�����滻�����ļ�������ɣ��������������ԭ�������·���������Ϳ��Գɹ��滻�ˡ�������ڿ�����ʱ����Ҫ���ϵ��ԣ������Լ���gulp.watch��ʵʱ����ļ��仯��Ȼ��̬������Ӧ��
var gulp = require("gulp"),//������
    csso = require("gulp-csso"),//cssѹ��
    jshint = require("gulp-jshint"),//js���
    uglify = require("gulp-uglify"),//jsѹ��
    concat = require("gulp-concat"),//�ļ��ϲ�
    clean = require("gulp-clean"),//����ļ���
    rename = require("gulp-rename"),//�ļ�������
    rev = require("gulp-rev"),//���İ汾��
    revReplace = require("gulp-rev-replace"),
    //useref = require('gulp-useref'),
    //filter = require('gulp-filter'),
    revCollector = require("gulp-rev-collector");//gulp-rev���������htmlģ���������·��
gulp.task("clean",function() {
    return gulp.src("dist/admin/",{read:false})
        .pipe(clean())
})
gulp.task("css",function() {
    return gulp.src("build/stylesheets/admin/css/*.css")
        .pipe(csso())
        .pipe(rename(function(path) {
            //path.basename += ".min";
            path.extname = ".css"
        }))
        .pipe(rev())
        .pipe(gulp.dest("dist/admin/css"))
        .pipe(rev.manifest())
        .pipe(gulp.dest("dist/admin/rev/css"));
})
gulp.task("rev",function() {
    return gulp.src(["dist/admin/rev/**/*.json","WEB-INF/pages/admin/*.html"])
        .pipe(revReplace())
        .pipe(revCollector({
            replaceReved: true
        }))
               // ��д�ļ�����html
        .pipe(gulp.dest("WEB-INF/pages/admin"))
})
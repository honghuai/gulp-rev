/**
 * Created by honghuai on 2015/12/6.
 */
//清理完之后，就可以对静态资源进行优化处理。那我们定义两个任务，一个是css的，一个是js的。在css里，还可以编译less或sass，这里我就没有做。然后js里同样可以编译coffee。我们来仔细看看下面的程序，首先任务名是css，然后src引入css文件，执行csso的压缩优化，然后重命名为*.min.css。接下来就是到了添加版本号，并将经过优化和版本控制的css输出到dist文件夹里。最后再用rev.manifest，将对应的版本号用json表示出来，这里可以参照下面第二张图。这样通过hash来精确定位到html模板中需要更改的部分
//src引入一个数组，前一个是引入刚才生成的json文件，后一个是需要更改的html模板，当然我这里是jsp。然后replaceReved: true就可以成功替换了。最后将替换过的文件输出即可，这里我输出到了原来引入的路径，这样就可以成功替换了。如果你在开发的时候需要不断调试，还可以加上gulp.watch，实时监控文件变化，然后动态做出响应。
var gulp = require("gulp"),//基础库
    csso = require("gulp-csso"),//css压缩
    jshint = require("gulp-jshint"),//js检查
    uglify = require("gulp-uglify"),//js压缩
    concat = require("gulp-concat"),//文件合并
    clean = require("gulp-clean"),//清空文件夹
    rename = require("gulp-rename"),//文件重命名
    rev = require("gulp-rev"),//更改版本名
    revReplace = require("gulp-rev-replace"),
    //useref = require('gulp-useref'),
    //filter = require('gulp-filter'),
    revCollector = require("gulp-rev-collector");//gulp-rev插件，用于html模板更改引用路径
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
               // 重写文件名到html
        .pipe(gulp.dest("WEB-INF/pages/admin"))
})
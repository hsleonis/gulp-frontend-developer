var gulp = require('gulp');
var concat = require('gulp-concat');
var fs = require('fs');
var path = require('path');
var htmlbeautify = require('gulp-html-beautify');

gulp.task('html', function() {

    var ext = '.html';

    fs.readdir('./', function (err, list) {
        list.forEach(function (file) {
            var dst = './theme';

            if (path.extname(file) === ext)
                gulp.src([
                    'parts/header.html',
                    file,
                    'parts/footer.html'
                ])
                .pipe(concat(path.win32.basename(file)))
                .pipe(htmlbeautify({indentSize: 4,"max_preserve_newlines": 1}))
                .pipe(gulp.dest(dst));
        })
    });
});

gulp.task('default', ['html'], function() {
    // watch for HTML changes
    gulp.watch('./*.html', function() {
        gulp.run('html');
    });
});
import gulp from "gulp";
import gpug from "gulp-pug";
import del from "del";
import connect from "gulp-connect";
//import ws from "gulp-webserver";

const routes = {
  pug: {
    watch: "src/**/*.pug",
    src: "src/*.pug",
    dest: "build",
  },
};

const pug = () => gulp.src(routes.pug.src).pipe(gpug()).pipe(gulp.dest(routes.pug.dest)).pipe(connect.reload());

const clean = () => del(["build/"]);

//const webserver = () => gulp.src("build").pipe(ws({ livereload: true, open: true }));

const webserver = () => {
  connect.server({
    root: "build",
    livereload: true,
    open: true,
  });
  return new Promise(function (resolve, reject) {
    resolve();
  });
};

const detectChange = () => {
  gulp.watch(routes.pug.watch, pug);
};

const prepare = gulp.series([clean]);

const asstes = gulp.series([pug]);

const postDev = gulp.series([webserver]);

const watch = gulp.series([detectChange]);

export const dev = gulp.series([prepare, asstes, postDev, watch]);

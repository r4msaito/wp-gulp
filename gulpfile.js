const gulp = require("gulp");
const gulpif = require("gulp-if");
const theme = "new-theme";
const sass = require("gulp-sass");
const cssbeautify = require("gulp-cssbeautify");
const concat = require("gulp-concat");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();
const cleanCss = require("gulp-clean-css");
const uglify = require("gulp-uglify");
let mode = "dev";

gulp.task("browser-serve", () => {
    browserSync.init({
        proxy: "http://localhost/wp-gulp"
    });
    gulp.watch(`wp-content/themes/${theme}/assets/style/src/scss/**/*.scss`).on("change", gulp.series("scss-to-css", browserSync.reload));
    gulp.watch(`wp-content/themes/${theme}/assets/js/src/**/*.js`).on("change", gulp.series("process-main-js", browserSync.reload));
    gulp.watch("wp-content/themes/${theme}/**/*.php").on("change", browserSync.reload);
});

gulp.task("scss-to-css", () => {
    return gulp.src([
            `wp-content/themes/${theme}/assets/style/src/scss/main.scss`
        ])
        .pipe(sass())
        .pipe(cssbeautify({
            indent: "   ",
            autosemicolon: true
        }))
        .pipe((gulpif((mode === "prod"), cleanCss())))
        .pipe(gulp.dest(`wp-content/themes/${theme}/assets/style/dist`))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task("process-vendor-css", () => {
    return gulp.src(
            [
            ])
        .pipe(sourcemaps.init())
        .pipe(concat("vendor.css"))
        .pipe((gulpif((mode === "prod"), cleanCss())))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(`wp-content/themes/${theme}/assets/style/dist`));
});

gulp.task("process-vendor-js", () => {
    return gulp.src(
            [
            ])
        .pipe(sourcemaps.init())
        .pipe(concat("vendor.js"))
        .pipe(gulpif((mode === "prod"), uglify()))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(`wp-content/themes/${theme}/assets/js/dist`));
});

gulp.task("process-main-js", () => {
    return gulp.src(
            [
                `wp-content/themes/${theme}/assets/js/src/main.js`,
            ])
        .pipe(sourcemaps.init())
        .pipe(concat("main.js"))
        .pipe(gulpif((mode === "prod"), uglify()))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(`wp-content/themes/${theme}/assets/js/dist`));
});

gulp.task("start", gulp.series(
    "scss-to-css",
    "process-vendor-css",
    "process-vendor-js",
    "process-main-js",
    "browser-serve"
), (done) => {
    gulp.watch(`wp-content/theme/${theme}/assets/style/src/scss/*.scss`, gulp.series("scss-to-css", browserSync.reload));
    gulp.watch(`wp-content/theme/${theme}/assets/js/src/**/*.js`, gulp.series("process-main-js", browserSync.reload));
    gulp.watch(`wp-content/theme/${theme}/**/*.php`, gulp.series(browserSync.reload));
});

gulp.task("build", gulp.series(async ()=> {mode = "prod";},"process-vendor-js", "process-main-js", "process-vendor-css", "scss-to-css"), (done) => {
    done();
});
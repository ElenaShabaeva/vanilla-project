const { src, task, dest, series, parallel, watch } = require("gulp");
const scss = require("gulp-sass")(require("sass"));
const rename = require("gulp-rename");
const pug = require("gulp-pug");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sortMediaQueries = require("postcss-sort-media-queries");
const minify = require("gulp-csso");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config.js");
const webpackStream = require("webpack-stream");
const terser = require("gulp-terser");
const clean = require("gulp-clean");
const browserSync = require("browser-sync").create();

task("copy", () => {
    return src("./src/public/**/*")
        .pipe(dest("./build/public"))
})

task("clean", () => {
    return src("./build", {
        allowEmpty: true
    })
        .pipe(clean())
})

task("style", () => {
    return src("./src/style/**/*.scss")
        .pipe(scss())
        .pipe(
            postcss([
                autoprefixer({ overrideBrowserslist: ["last 4 version"] }),
                sortMediaQueries({
                    sort: "desktop-first",
                }),
            ])
        )
        .pipe(dest("./build/style"))
        .pipe(minify())
        .pipe(rename("main.min.css"))
        .pipe(dest("./build/style"))
        .pipe(browserSync.stream());
});

task("pug", () => {
    return src("./src/pug/views/**/*.pug")
        .pipe(pug())
        .pipe(dest("./build"))
        .pipe(browserSync.stream());
});

task("server", () => {
    browserSync.init({
        server: { baseDir: "build/" },
        notify: false,
        online: true,
    });
});

task("webpack", () => {
    return src("./src/js/main.js")
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(dest("./build/js"))
        .pipe(terser())
        .pipe(rename(function (path) 
        {
            path.basename += ".min";
        }))
        .pipe(dest("./build/js"))
        .pipe(browserSync.stream());
});

task("watch", () => {
    watch("./src/style/**/*.scss", series("style"));
    watch("./src/pug/views/**/*.pug", series("pug"));
    watch("./src/js/main.js", series("webpack"));
});

task(
    "serve",
    series(
        "clean",
        parallel("copy", "style", "webpack", "pug", "watch", "server")
    )
);
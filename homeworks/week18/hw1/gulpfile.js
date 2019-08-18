// 1. 把 scss 編譯成 css
// 2. 把 js 用 babel 轉成 ES5 語法
// 3. 把 css 以及 js 壓縮

const {
  src,
  dest,
  series,
  parallel,
} = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const cleanCSS = require('gulp-clean-css');

// Sass to CSS
function sassTask() {
  return src('./style.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./build'));
}

// Javascript to ES5 syntax
function babelTask() {
  return src('./main.js')
    .pipe(babel({
      presets: ['@babel/env'],
    }))
    .pipe(dest('./build'));
}

// Compress Javascript file
function uglifyTask() {
  return src('./build/main.js')
    .pipe(uglify())
    .pipe(dest('./build'));
}

// Compress CSS file
function cleanCSSTask() {
  return src('./build/style.css')
    .pipe(cleanCSS())
    .pipe(dest('./build'));
}

exports.default = series(
  parallel(sassTask, babelTask), parallel(cleanCSSTask, uglifyTask),
);

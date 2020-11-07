let {src, dest, parallel, series, watch} = require('gulp');

const browserSync  = require('browser-sync').create();
const del          = require('del');
const pug          = require('gulp-pug');
const postcss      = require('gulp-postcss');
// const autoprefixer = require('autoprefixer');
const cssnano      = require('cssnano');
const imagemin     = require('gulp-imagemin');
const uglify       = require('gulp-uglify-es').default;

function devServer() {
  browserSync.init({
    server: {
      baseDir: './build'
    },
    watch: true,
    reloadDebounce: 150,
    notify: false,
    online: true
  });
}

function buildPages() {
  return src('src/index.pug')
    .pipe(pug())
    .pipe(dest('build/'));
}

function buildStyles() {
  return src('src/style.css')
    .pipe(postcss([
      // autoprefixer(),
      cssnano()
    ]))
    .pipe(dest('build/'));
}

function buildImages() {
  return src('src/images/*.*')
    .pipe(imagemin())
    .pipe(dest('build/images/'));
}

function buildScripts() {
  return src('src/*.js')
    .pipe(uglify())
    .pipe(dest('build/scripts/'));
}

function clearBuild() {
  return del('build/**/*', {
    force: true
  });
}

function watchFiles() {
  watch('src/*.pug', buildPages);
  watch('src/*.css', buildStyles);
  watch('src/*.js', buildScripts);
  watch('src/images/*.*', buildImages);
}

exports.default =
  series(
    clearBuild,
    parallel(
      devServer,
      series(
        parallel(buildPages, buildStyles, buildScripts, buildImages),
        watchFiles
      )
    )
  );

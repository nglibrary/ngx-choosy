const gulp = require('gulp');
const sass = require('node-sass');
const inlineTemplates = require('gulp-inline-ng2-template');
const exec = require('child_process').exec;

const INLINE_TEMPLATES = {
  SRC: './src/**/*.ts',
  DIST: './tmp/src-inlined',
  CONFIG: {
    base: '/src',
    target: 'es6',
    useRelativePaths: true,
    styleProcessor: compileSass
  }
};

gulp.task('inline-templates', () => {
  return gulp.src(INLINE_TEMPLATES.SRC)
    .pipe(inlineTemplates(INLINE_TEMPLATES.CONFIG))
    .pipe(gulp.dest(INLINE_TEMPLATES.DIST));
});

gulp.task('build:esm', ['inline-templates'], (callback) => {
  exec('npm run ngcompile', function (error, stdout, stderr) {
    console.log(stdout, stderr);
    callback(error)
  });
});

gulp.task('build:esm:watch', ['build:esm'], () => {
  gulp.watch('src/**/*', ['build:esm']);
});

function compileSass(path, ext, file, callback) {
  let compiledCss = sass.renderSync({
    data: file,
    outputStyle: 'compressed',
  });
  callback(null, compiledCss.css);
}

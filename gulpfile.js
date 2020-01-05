const { watch, src, dest, parallel } = require('gulp');
const ts = require('gulp-typescript');
const tslint = require('gulp-tslint');

const destPath = './miniprogram';
const tsFiles = `${destPath}/**/*.ts`;

function compileTypeScript() {
  const tsConfig = ts.createProject('./tsconfig.json');
  return src([tsFiles])
    .pipe(tslint({
      tslint: require('tslint'),
    }))
    .pipe(tslint.report({
      emitError: false,
      summarizeFailureOutput: true,
    }))
    .pipe(tsConfig())
    .pipe(dest(destPath));
}

function dev() {
  parallel(compileTypeScript)();
  watch(tsFiles, compileTypeScript);
}

exports.dev = dev;

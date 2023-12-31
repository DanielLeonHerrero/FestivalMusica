const { src, dest, watch, parallel } = require('gulp');

// CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const postcss = require('gulp-postcss')
const sourcemaps = require('gulp-sourcemaps')

// Imagenes
const cache = require('gulp-cache')
const imagemin = require('gulp-imagemin')
const webp = require('gulp-webp');
const avif = require('gulp-avif')

//JS
const tercer = require('gulp-terser-js')

function css( done ) {
    src('src/scss/**/*.scss') // Identificar el archivo .SCSS a compilar
        .pipe( sourcemaps.init() )
        .pipe( plumber())
        .pipe( sass() ) // Compilarlo
        .pipe( postcss([autoprefixer(), cssnano()]))
        .pipe( sourcemaps.write('.') )
        .pipe( dest('build/css') ) // Almacenarla en el disco duro
    done();
}

function imagenes( cb ) {
    const opciones = {
        optimizationLevel: 3
    }

    src('src/img/**/*.{png,jpg}')
        .pipe(cache( imagemin(opciones) ))
        .pipe( dest('build/img') )

    cb();
}

function versionWebp( done ) {
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe( webp(opciones) )
        .pipe( dest('build/img') )
    done();
}

function versionavif( done ) {
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe( avif(opciones) )
        .pipe( dest('build/img') )
    done();
}

function javascript( cb ) {
    src('src/js/**/*.js')
        .pipe( sourcemaps.init() )
        .pipe( tercer() )
        .pipe( sourcemaps.write('.') )
        .pipe(dest('build/js'));
        
    cb();
}

function dev( done ) {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);
    done();
}
 

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes
exports.versionWebp = versionWebp;
exports.versionavif = versionavif
exports.dev = dev;
exports.dev = parallel( imagenes, versionWebp, versionavif, javascript, dev) ;
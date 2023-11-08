const { src, dest, watch } = require("gulp")
const sass = require("gulp-sass")(require("sass"))

function css(cb) {
    src('src/scss/app.scss') // Identificar el archivo SASS
        .pipe(sass())    // Compliar SCSS
        .pipe(dest('build/css')) // Alacenar el CSS

    cb(); // Callback para notificar al Gulp de la finalizacion
}

function dev(cb) {
    watch('src/scss/app.scss',css)

    cb();
}

exports.css = css
exports.dev = dev
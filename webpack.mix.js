const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.setPublicPath('public');

if (!mix.inProduction()) {
  mix
    .webpackConfig({
      devtool: 'source-map',
    })
    .sourceMaps()
} else {
  mix.version()
}

mix.react('./resources/js/shopper.js', 'js/')
  .js('./resources/js/login.js', 'js/')
  .sass('./resources/sass/login.scss', 'css/')
  .sass('./resources/sass/shopper.scss', 'css/')
  .options({
    processCssUrls: false
  });

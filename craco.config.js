const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const CracoAlias = require('craco-alias');

module.exports = {
  style: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'options',
        baseUrl: './',
        aliases: {
          '@Views': './src/views',
        },
      },
    },
  ],
};

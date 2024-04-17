/*
 * Copyright (c) 2024. Beijing Wisdech Co., Ltd.
 * Website: www.wisdech.com
 * Email: info@wisdech.com
 */

const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');
const tailwindcssNesting = require('tailwindcss/nesting');

module.exports = {
  rollup(config, options) {
    config.output.exports = 'auto';
    config.plugins.push(
      postcss({
        plugins: [
          tailwindcssNesting(),
          autoprefixer(),
          tailwindcss(),
        ],
        inject: true,
        extract: true,
      }),
    );
    config.plugins = config.plugins.map(p =>
      p.name === 'replace'
        ? require('@rollup/plugin-replace')({
          'process.env.NODE_ENV': JSON.stringify(options.env),
          preventAssignment: true,
        })
        : p,
    );

    return config;
  },
};
/* eslint-disable no-template-curly-in-string */

module.exports = (api) => {
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'entry',
          corejs: 'core-js@3',
          targets: { browsers: 'last 2 versions' },
          modules: false,
        },
      ],
      '@babel/preset-react',
      '@babel/preset-typescript',
    ],
    retainLines: true,
    plugins: [
      [
        'transform-imports',
        {
          lodash: {
            transform: 'lodash/${member}',
            preventFullImport: true,
          },
        },
      ],
      '@babel/plugin-syntax-dynamic-import',
      [
        '@babel/plugin-transform-runtime',
        {
          'regenerator': true,
        },
      ],
      [
        '@babel/plugin-proposal-class-properties',
        {
          loose: true,
        },
      ],
      [
        'module-resolver',
      ],
      '@loadable/babel-plugin',
      'lodash',
    ],
  };
};

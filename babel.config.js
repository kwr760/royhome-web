function isWebTarget(caller) {
  return Boolean(caller && caller.target === 'web');
}
function isWebpack(caller) {
  return Boolean(caller && caller.name === 'babel-loader');
}

module.exports = (api) => {
  const webpack = api.caller(isWebpack);
  const web = api.caller(isWebTarget);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: web ? 'entry' : undefined,
          corejs: web ? 'core-js@3' : false,
          targets: web ? { browsers: 'last 2 versions' } : { node: 'current' },
          modules: webpack ? false : 'commonjs',
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
      '@babel/plugin-proposal-class-properties',
      [
        'module-resolver',
      ],
      '@loadable/babel-plugin',
      'lodash',
    ],
  };
};

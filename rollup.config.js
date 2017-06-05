import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';

const pkg = require('./package.json');
const external = Object.keys(pkg.dependencies);

const plugins = [
  babel(babelrc())
];

export default {
  entry: 'src/webtask.js',
  dest: 'dist/webtask.js',
  format: 'cjs',
  plugins: plugins,
  external: external
};
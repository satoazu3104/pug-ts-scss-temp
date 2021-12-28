module.exports = {
  // `require.resolve` is needed for e.g. `pnpm`
  plugins: [require.resolve('@prettier/plugin-pug')],
  singleQuote: true,
  bracketSameLine: true,
  pugSingleQuote: false
  // ... more pug* options
};

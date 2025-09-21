export default {
  importOrderParserPlugins: ['importAssertions', 'typescript', 'jsx'],
  plugins: [
    '@prettier/plugin-oxc',
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-packagejson',
    // The order of plugins matters, and Tailwind CSS must be the last one.
    'prettier-plugin-tailwindcss',
  ],
  semi: false,
  singleQuote: false,
  tailwindAttributes: ['className'],
  tailwindFunctions: ['cx'],
  useTabs: true,
};

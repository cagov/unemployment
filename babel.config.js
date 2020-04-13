const transformDesignSystemImports = [
  "babel-plugin-transform-imports",
  {
    "@cmsgov/design-system-core": {
      transform:
        // eslint-disable-next-line no-template-curly-in-string
        "@cmsgov/design-system-core/dist/components/${member}/${member}",
      preventFullImport: true
    }
  }
];

module.exports = api => {
  /**
   * Cache based on the value of NODE_ENV. Any time the using callback returns
   * a value other than the one that was expected, the overall config function
   * will be called again and a new entry will be added to the cache.
   */
  api.cache.using(() => process.env.NODE_ENV);

  const config = {
    env: {
      test: {
        // async/await fix for tests
        plugins: ["@babel/plugin-transform-runtime"]
      }
    },
    presets: [
      [
        "@babel/preset-env",
        {
          // This version should correspond with the major version of core-js
          // NPM dependency installed
          corejs: 3,
          // Convert ES import/export syntax during tests, since Jest expects
          // CommonJS, not ES import/export syntax
          modules: api.env("test") ? "cjs" : false,
          // replace the "core-js" and "regenerator-runtime/runtime" import
          // statements with specific polyfills
          useBuiltIns: "entry"
        }
      ],
      "@babel/preset-react"
    ],
    plugins: [
      // Allow parsing of import()
      "syntax-dynamic-import",
      // class { handleThing = () => { } }
      "@babel/plugin-proposal-class-properties",
      [
        "@babel/plugin-proposal-object-rest-spread",
        {
          useBuiltIns: true
        }
      ],
      transformDesignSystemImports
    ]
  };

  if (api.env("production")) {
    config.plugins.push.apply(config.plugins, [
      "babel-plugin-transform-react-remove-prop-types"
    ]);
  }

  return config;
};

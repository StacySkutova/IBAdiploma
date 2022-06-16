const path = require('path');
const pathToScssVars = path.normalize('./src/app/styles');

module.exports = function override(config, env) {
  config = {
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.s[ac]ss$/i,
          use: [
            {
              loader: 'sass-resources-loader',
              options: {
                resources: [
                  `${pathToScssVars}/_functions.scss`,
                  `${pathToScssVars}/_mixins.scss`,
                  `${pathToScssVars}/_variables.scss`,
                ],
              },
            },
          ],
        },
      ],
    },
  };
  return config;
};

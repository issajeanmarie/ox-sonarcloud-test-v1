/* eslint-disable @typescript-eslint/no-var-requires */
const { PHASE_PRODUCTION_SERVER } = require("next/constants");
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_PRODUCTION_SERVER) {
    return {
      ...defaultConfig,
      webpack: {
        plugins: [new AntdDayjsWebpackPlugin()]
      }
    };
  }

  return defaultConfig;
};

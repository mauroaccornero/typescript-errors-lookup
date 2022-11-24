import path from "path";
import webpack, { Configuration, DefinePlugin } from "webpack";
import TerserPlugin from "terser-webpack-plugin";
import logger from "../../data/common/logger";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

const webpackBuild = () => {
  logger.info(`webpack build start`);
  const isProduction = process.env.NODE_ENV === "production";

  const envKeys = Object.keys(process.env).reduce(
    (prev: Record<string, string>, next: string) => {
      prev[`process.env.${next}`] = JSON.stringify(process.env[next]);
      return prev;
    },
    {}
  );

  const webpackConfig: Configuration = {
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? "source-map" : "cheap-module-source-map",
    entry: { client: path.resolve(__dirname, "../../../src/app/index.tsx") },
    output: {
      path: path.resolve(__dirname, "../../../dist/assets/js"),
      filename: "[name].js",
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: path.resolve(__dirname, "../../../src/app"),
          loader: "ts-loader",
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    plugins: [new ForkTsCheckerWebpackPlugin(), new DefinePlugin(envKeys)],
    externals: {
      react: "React",
      "react-dom": "ReactDOM",
    },
  };

  if (isProduction) {
    webpackConfig.optimization = {
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/](react-icons)[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      },
      runtimeChunk: "single",
      minimize: true,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
        }),
      ],
    };
  }

  const webpackCallback = function (err?: Error) {
    if (err) {
      logger.error(err.stack || err);
    }
    logger.info("Webpack build finished");
  };

  webpack(webpackConfig, webpackCallback);
};

export default webpackBuild;

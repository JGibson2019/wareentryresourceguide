import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as HtmlWebpackTemplate from "html-webpack-template";
import * as Webpack from "webpack";

const CommonConfig: Webpack.Configuration = {
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        enforce: "pre",
        loader: "tslint-loader",
        options: {
          emitErrors: false,
          failOnHint: true,
          fix: true,
          typeCheck: true,
        },
        test: /\.tsx$/,
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
        ],
      },
      {
        test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
        use: [
          {loader: "file-loader"},
        ],
      },
    ],
  },
  output: {
    filename: "bundle.[chunkhash].js",
  },
  plugins: [
      new HtmlWebpackPlugin({
        appMountId: "root",
        inject: false,
        minify: {
          collapseWhitespace: true,
        },
        template: HtmlWebpackTemplate,
        title: "re-entry-guide",
      }),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
};

export default CommonConfig;

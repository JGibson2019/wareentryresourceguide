import * as Path from "path";
import * as Webpack from "webpack";
import * as WebpackMerge from "webpack-merge";
import CommonConfig from "./webpack.common.config";

const devConfig: Webpack.Configuration = {
    devServer: {
        contentBase: "./out/dev",
    },
    devtool: "cheap-module-eval-source-map",
    output: {
        path: Path.resolve(__dirname, "out", "dev"),
    },
};

export default WebpackMerge(CommonConfig, devConfig);

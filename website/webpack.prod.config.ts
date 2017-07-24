import * as Path from "path";
import * as Webpack from "webpack";
import * as WebpackMerge from "webpack-merge";
import CommonConfig from "./webpack.common.config";

const prodConfig: Webpack.Configuration = {
    devServer: {
        contentBase: "./out/prod",
    },
    devtool: "source-map",
    output: {
        path: Path.resolve(__dirname, "out", "prod"),
    },
};

export default WebpackMerge(CommonConfig, prodConfig);

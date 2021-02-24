const path = require('path');

module.exports = {
    entry: [
        './src/index.ts'
    ],
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    performance: {
        hints: false,
        maxAssetSize: 100000,
        maxEntrypointSize: 1000000
    },
    devtool: "source-map",
    mode: "development",
    resolve: {
        modules: ["node_modules"],
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'hyper.js',
        path: path.resolve(__dirname, 'dist/js'),

        // use this for libraries
        library: "hyper"
    }
};
module.exports = {
    output: {
        path: __dirname + "/public/dist",
    },
    module: {
        rules: [
            {
                test: /.jsx?/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react'],
                    }
                }
            },
            {
                test: /.scss$/,
                use: ["style-loader","css-loader", "sass-loader"],
            }
        ]
    },
    devtool: "source-map"
}
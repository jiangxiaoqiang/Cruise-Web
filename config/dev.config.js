const path = require('path');

module.exports = {
  module: {
    rules: [
    {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
            presets: [
                ['@babel/preset-env', { targets: "defaults" }]
            ]
            }
        }
    },
    {
        test: /\.css$/i,
        use: [
        "style-loader",
        "css-loader",
        {
            loader: "postcss-loader",
            options: {
            postcssOptions: {
                plugins: [
                [
                    "postcss-preset-env",
                    {
                    // Options
                    },
                ],
                ],
            },
            },
        },
        ],
    },
    ],
  },
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'build'),
  },
};







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
                [
                    '@babel/preset-env',
                    { targets: "defaults" }
                ]
            ],
            plugins:[
<<<<<<< HEAD
                "@babel/plugin-transform-arrow-functions", 
                "@babel/plugin-proposal-class-properties"
=======
                "@babel/plugin-transform-arrow-functions", "@babel/plugin-proposal-class-properties"
>>>>>>> 07000b61df93dd995cf43850f8c7cfe4f57daaac
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







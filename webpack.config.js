const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = function(env, options) {
  const isProduction = options.mode === "production";

  const config = {
    context: path.join(__dirname, "src"),
    entry: {
      style: "./styles",
      vendor: "./vendor",
      polyfills: "./polyfills",
      script: "./main"
    },
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? "none" : "source-map",

    resolve: {
      extensions: [".ts", ".js"]
    },

    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: [
            {
              loader: "awesome-typescript-loader",
              options: {
                useCache: true
              }
            },
            {
              loader: "angular2-template-loader",
              options: {
                useCache: true
              }
            }
          ],
          exclude: /node_modules/
        },
        {
          test: /\.scss$/,
          include: path.join(__dirname, 'src/scripts'),
          loader: ['css-to-string-loader','css-loader','sass-loader'] 
        },
        {
          test: /\.scss$/,
          exclude: path.join(__dirname, 'src/scripts'),
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
              {
                loader: "css-loader",
                options:{
                  minimize: isProduction
                }
              },
              {
                loader: "sass-loader",
                options: {
                  sourceMap: !isProduction
                }
              }
            ]
          })
        },
        {
          test: /\.(png|jpg)$/,
          loader: 'file-loader'
        },
        {
          test: /\.html$/,
          use: [{
            loader: 'html-loader?exportAsEs6Default',
            options: {
              minimize: isProduction
            }
          }]
        }
      ]
    },

    plugins: [
      new HtmlWebpackPlugin({
        title: "App",
        hash: true,
        template: path.resolve(__dirname, "./src/index.html")
      }),
      new ExtractTextPlugin('style.css')
    ],

    devServer: {
      contentBase: "./dist",
      stats: {
        colors: true,
        hash: false,
        version: false,
        timings: false,
        assets: false,
        chunks: false,
        modules: false,
        reasons: false,
        children: false,
        source: false,
        errors: true,
        errorDetails: false,
        warnings: false,
        publicPath: false
      }
    }
  };
  return config;
};

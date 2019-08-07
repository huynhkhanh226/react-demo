const parts = require("./webpack.parts");
var path = require("path"); // to get the current path
//const fs = require('fs'); // to check if the file exists
//const dotenv = require('dotenv');
var merge = require("webpack-merge");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ManifestPlugin = require("webpack-manifest-plugin");
//customize notify webpack
var FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
//Notify desktop
//var notifier = require("node-notifier");
//var TARGET = process.env.npm_lifecycle_event;

//****************************************************************************************************/

//Export
module.exports = env => {
  var dotEnv = parts.getEnvKeys(env.ENVIRONMENT);
  //****************************************************************************************************/
  //Modules run in debug mode
  const debugModeModules = merge([
    {
      module: {
        rules: [
          // this will apply to both plain `.scss` files
          // AND `<style lang="scss">` blocks in `.vue` files

          {
            test: /\.(sa|sc|c)ss$/,
            use: [
              {
                loader: "style-loader", // creates style nodes from JS strings,
                options: {
                  sourceMap: true
                }
              },
              {
                loader: "css-loader", // creates style nodes from JS strings,
                options: {
                  sourceMap: true
                }
              },
              {
                loader: "sass-loader", // creates style nodes from JS strings,
                options: {
                  sourceMap: true
                }
              }
            ]
          },

          // {
          //   test: /\.js$/,
          //   loader: ["babel-loader"],
          //   exclude: /node_modules/
          // },
          {
            test: /\.js$/,
            use: [
              {
                loader: "babel-loader",
                options: {
                  //inputSourceMap: "SourceMap",
                  //sourceMaps: "both"
                }
              }
            ]
          },
          {
            test: /\.jsx?$/,
            loader: 'babel-loader'
          },
          // {
          //   test: /\.js$/,
          //   use: [
          //     {
          //       loader: "source-map-loader"
          //     }
          //   ],
          //   //enforce: "pre"
          // },
          {
            test: /\.(png|jpg|gif|svg|ico)$/,
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/images/"
            }
          },
          {
            test: /\.(json)$/,
            loader: "file-loader",
            options: {
              name: "[name].[ext]?[hash]"
            }
          },
          {
            test: /\.(ttf|woff|woff2|eot)$/,
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/fonts"
            }
          }
          // {
          //   test: /\.css$/,
          //   loader: ["style-loader", "css-loader"]
          // }
          //Chua su dung svg
          // {
          //   test: /\.svg$/,
          //   loader: ['svg-inline-loader']
          // }
        ]
      }
    }
  ]);

  //****************************************************************************************************/
  //Module run in production mode
  const productModeModules = merge([
    {
      module: {
        rules: [
          {
            test: /\.bundle\.js$/,
            loader: "bundle-loader",
            options: {
              name: 'my-chunk',
              lazy: true
            }
          },


          // this will apply to both plain `.scss` files
          // AND `<style lang="scss">` blocks in `.vue` files
          {
            test: /\.(sa|sc|c)ss$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader

                // publicPath: (resourcePath, context) => {
                //   return path.relative(path.dirname(resourcePath), context) + '/';
                // }
              },
              "css-loader",
              "sass-loader"
            ]

            // fallback to style-loader in development
          },
          {
            test: /\.js$/,
            loader: "babel-loader",
            exclude: /node_modules/
          },
          {
            test: /\.jsx?$/,
            loader: 'babel-loader'
          },
          {
            test: /\.(png|jpg|gif|svg|ico)$/,
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/images/"
            }
          },
          {
            test: /\.(json)$/,
            loader: "file-loader",
            options: {
              name: "[name].[ext]?[hash]"
            }
          },
          {
            test: /\.(ttf|woff|woff2|eot)$/,
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/fonts"
            }
          }

          // {
          //   test: /\.html$/,
          //   use: [ {
          //     loader: 'html-loader',
          //     options: {
          //       minimize: true,
          //       removeComments: false,
          //       collapseWhitespace: false
          //     }
          //   }],
          // },
          //  {
          //   test: /\.(png|jpg|gif)$/i,
          //   use: [
          //     {
          //       loader: 'url-loader',
          //       options: {
          //         limit: 8192,
          //         fallback: 'responsive-loader',
          //       },
          //     },
          //   ],
          // },
          // {
          //   test: /\.css$/i,
          //   use: ['style-loader', 'css-loader'],
          // },

          // {
          //   test: /\.css$/,
          //   loader: ["style-loader", "css-loader"]
          // }
          // {
          //   test: /\.svg$/,
          //   loader: ['svg-inline-loader']
          // }
        ]
      }
    }
  ]);

  //Plugins run in debug mode
  const debugModePluginConfig = merge([
    {
      plugins: [
        new HtmlWebpackPlugin({
          TITLE: process.env.TITLE,
          PUBLIC_URL: process.env.PUBLIC_URL,
          template: path.join(__dirname, "public", "index.html"),
          BASE_URL: process.env.PUBLIC_URL
        }),
        new webpack.LoaderOptionsPlugin(),
        new webpack.DefinePlugin(dotEnv),
        new ManifestPlugin(),
        new FriendlyErrorsWebpackPlugin({
          compilationSuccessInfo: {
            messages: [
              "DHR website is running at http://localhost:" +
                process.env.DEV_PORT,
              "Using webpack for development and production",
              "Configure Browser and PORT at .env.development",
              "Configure webpack at webpack.config.js"
            ],
            notes: []
          },
          onErrors: function(severity, errors) {
            // You can listen to errors transformed and prioritized by the plugin
            // severity can be 'error' or 'warning'
            if (severity !== "error") {
              return;
            }
          },
          // should the console be cleared between each compilation?
          // default is true
          clearConsole: true,
          // add formatters and transformers (see below)
          additionalFormatters: [],
          additionalTransformers: []
        })
        //new webpack.SourceMapDevToolPlugin({}),
        // new MiniCssExtractPlugin({
        //   // Options similar to the same options in webpackOptions.output
        //   // both options are optional
        //   filename: "[name].css",
        //   chunkFilename: "[id].css"
        // })
      ]
    }
  ]);

  //Plugins run in production mode
  const productionModePluginConfig = merge([
    {
      plugins: [
        new HtmlWebpackPlugin({
          TITLE: process.env.TITLE,
          PUBLIC_URL: process.env.PUBLIC_URL,
          template: path.join(__dirname, "public", "index.html"),
          BASE_URL: process.env.PUBLIC_URL
        }),
        new webpack.LoaderOptionsPlugin(),
        new webpack.DefinePlugin(dotEnv),
        new ManifestPlugin(),
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: "assets/css/[id].[name].[hash].css",
          chunkFilename: "assets/css/[id].[name].[hash].css"
        })
      ]
    }
  ]);

  //Common config
  var commonConfig = {
    entry: path.join(__dirname, "./src/index.js"),
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "assets/js/[name].[contenthash].bundles.js",
      chunkFilename: "assets/js/components/[id].[name].[contenthash].bundle.js",
      publicPath: process.env.PUBLIC_URL
      //chunkFilename: "chunk-[name].[contenthash].js"
      //publicPath: '/' + process.env.PUBLIC_URL + '/'
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src")
      }
    },
    //devtool: "source-map",
    optimization: {
      minimizer: [new TerserJSPlugin({})]
      // splitChunks: {
      //   chunks: 'async',
      //   minSize: 30000,
      //   maxSize: 0,
      //   minChunks: 1,
      //   maxAsyncRequests: 5,
      //   maxInitialRequests: 3,
      //   automaticNameDelimiter: '-',
      //   automaticNameMaxLength: 30,
      //   name: true,
      //   cacheGroups: {
      //     vendors: {
      //       test: /[\\/]node_modules[\\/]/,
      //       priority: -10
      //     },
      //     default: {
      //       minChunks: 2,
      //       priority: -20,
      //       reuseExistingChunk: true
      //     }
      //   }
      // }
    },
    performance: {
      hints: process.env.NODE_ENV === 'production' ? "warning" : false,
      //maxEntrypointSize: 512000,
      //maxAssetSize: 512000
       assetFilter: function(assetFilename) {
         return assetFilename.endsWith('.js');
       }
    },
    externals: {
      // global app config object
      config: JSON.stringify({
          apiUrl: process.env.API_URL
          //apiUrl: 'http://localhost:2016'
      })
  }
  };

  //This config are for dev server
  const devServerConfig = merge([
    parts.devServer({
      host: process.env.DEV_HOST,
      port: process.env.DEV_PORT,
      browser: process.env.DEV_BROWSER
    })
  ]);

  //Check mode & merge config
  var mode = env.ENVIRONMENT;
  if (mode === "production") {
    return merge(commonConfig, productModeModules, productionModePluginConfig, {
      mode
    });
  }
  return merge(
    commonConfig,
    debugModeModules,
    devServerConfig,
    debugModePluginConfig,
    { mode }
  );
};

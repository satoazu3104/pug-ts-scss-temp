const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const globule = require("globule");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const app = {
  entry: path.resolve(__dirname, "src/js/index.ts"),
  output: {
    filename: "./js/index.js",
    path: path.resolve(__dirname, "Public")
  },
  stats: {
    children: true
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: {
             url: false,
              sourceMap: true,
              importLoaders: 2
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: [require("autoprefixer")({grid: true})]
              }
            }
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
              sassOptions: {
                fiber: require("fibers")
              },
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: "pug-loader",
            options: {
              pretty: true,
              globals: ["site", "order", "mypage", "account", "modals"]
            }
          }
        ]
      }
    ]
  },
  target: ["web", "es5"],
  resolve: {
    extensions: [".ts", ".js"]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./css/style.css"
    })
  ],
  devtool: "source-map",
  watchOptions: {
    ignored: /node_modules/
  }
};

const templates = globule.find("./src/pug/**/*.pug",{
  ignore: ["./src/pug/**/_*.pug"]
});

templates.forEach((template) => {
  const fileName = template.replace("./src/pug/", "").replace(".pug", ".html");
  app.plugins.push(
    new HtmlWebpackPlugin({
      filename: `../View/${fileName}`,
      template: template,
      inject: false,
      minify: false
    })
  )
});

module.exports = app; 

const path = require("path");

module.exports = (env) => {
  let configuration;
  if (env) {
    configuration = {
      ...env.prod ? {
        mode: "production"
      } : {
        mode: "development",
        watch: true,
        devtool: "inline-source-map"
      },
      
      entry: {
        app: path.resolve(__dirname, "./src/index.tsx"),
        board: path.resolve(__dirname, "./src/board.tsx")
      },
    
      output: {
        filename: "[name].js",
        path: path.join(__dirname, `dist/js`),
      },

      optimization: {
        splitChunks: {
          chunks: 'all'
        }
      },
    
      module: {
        rules: [
          { test: /\.tsx?$/, loader: "ts-loader" },
          {
            test: /\.jsx?/i,
            loader: "babel-loader",
            exclude: /node_modules/,
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                ["@babel/plugin-transform-react-jsx", { "pragma":"preact.h" }]
              ]
            }
          },
          { test: /\.css$/, use: [{ loader: "style-loader" }, { loader: "css-loader" }] },
          {
            test: /\.less$/,
            use: [
              { loader: "style-loader" },
              { loader: "css-loader" },
              { loader: "less-loader" }
            ]
          },
        ]
      },
    
      resolve: {
        extensions: [".ts", ".tsx", ".js"],
        alias : {
          "react" : "preact/compat",
          "react-dom" : "preact/compat"
        }
      }
    }
  }

  return configuration;
};
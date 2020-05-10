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
        source: "./src/index.tsx",
        vendor: [
          "easy-peasy",
          "preact",
          "jquery",
          "underscore"
        ]
      },
    
      output: {
        filename: "[name].bundle.js",
        path: path.join(__dirname, `dist/js`),
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
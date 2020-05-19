var path=require('path');
var webpack=require('webpack');
var htmlWebpackPlugin=require('html-webpack-plugin');
//const { ModuleFederationPlugin } = require("webpack").container;
//var ModuleFederationPlugin=require('webpack/lib/container/ModuleFederationPlugin');
const { ModuleFederationPlugin } = require("webpack").container;
const VENDOR_LIBS=[
    'react','react-router-dom','react-router'
];
module.exports = {
    mode: 'development',
    entry:"./src/index.js",
    output:{
      //  filename:'main.js',
       // path: path.resolve(__dirname,'dist'),
        publicPath: "http://localhost:3001/"
    },
    module:{
        rules:[
           {
                test: /\.(js|jsx)$/,
                exclude:/node_modules/,
                use: {
                loader: 'babel-loader',
                options:{
                    presets: [
                       '@babel/preset-env',
                       '@babel/preset-react'
                    ]
                 }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.scss$/,
                use: ['css-loader','style-loader','sass-loader']
            },
            {
                test: /\.(jpe?g|svg|gif|png)$/i,
                use: 'file-loader'
            }
        ]
    },
    devServer:{
   //   contentBase: path.join(__dirname,'public'),
    // compress: true,
     contentBase: path.join(__dirname,"dist"),
      port: 3001
    },
  /*  optimization: {
        splitChunks: {
         cacheGroups: {
             vendor:{
                test: /node_modules/,
                chunks: "initial",
                name: "vendor",
                enforce: true
             }
        }
    }
      },*/
      plugins:[
        new htmlWebpackPlugin({
            template: path.resolve(__dirname,'public/index.html'),
            filename: 'index.html'
        }),
        new ModuleFederationPlugin({
            name:'app1',
            library: {type:'var', name:'app1'},
            remotes:{
                app2 : 'app2',
            },
            shared:['react','react-dom']
        }),
        
    ],


}
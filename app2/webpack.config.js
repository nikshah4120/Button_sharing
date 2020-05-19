var path=require('path');
var webpack=require('webpack');
var htmlWebpackPlugin=require('html-webpack-plugin');
//var ModuleFederationPlugin=require('webpack/lib/container/ModuleFederationPlugin');
const { ModuleFederationPlugin } = require("webpack").container;
const VENDOR_LIBS=[
    'react','react-router-dom','react-router','react-dom'
];
module.exports = {
    mode: 'development',
    entry:'./src/index.js',
    output:{
      // filename:'main.js',
      // path: path.resolve(__dirname,'dist'),
       publicPath: "http://localhost:3002/"
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
     contentBase: path.join(__dirname,'dist'),
      //compress: true,
      port: 3002
    },
   /* optimization: {
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
            name:'app2',
            library: {type:'var', name:'app2'},
            filename: "remoteEntry.js",
            exposes:{
                Button: './src/button'
            },
            shared:['react','react-dom']
        }),
        
    ],
    

}
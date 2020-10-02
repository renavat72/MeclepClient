const path = require('path')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve( __dirname, 'dist'),
        filename: 'bundle.js',
    },

    module:{
        rules:[{
            test: /\.(js|jsx)$/,
            exclude: /node_module/,
            loader: 'babel-loader',
        },
      
        {
            test: /\.css$/,
            use: 'css-loader'
        },
        {
            test: /\.(jpg|png|svg)$/,
            loader: 'url-loader?limit=25000',
            include: path.join(__dirname, 'public')
        }
    ]
    },
  
    resolve: {
       
        extensions: [ '*', '.js', '.jsx']
    },
    devtool: 'cheep-module-eval-source-map',
    devServer: {
        conentBase: path.join(__dirname, 'public')
    }
}
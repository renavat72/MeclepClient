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
            loader: "babel-loader",
        },
      
        {
            test: /\.css$/,
            use: 'css-loader'
        },
        {
            test: /\.(gif|svg|jpg|png)(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file-loader",
            include: path.join(__dirname, 'public')
        },
        {
            test: /\.(woff(2)?|ttf|eot|svg|jpg)(\?v=\d+\.\d+\.\d+)?$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                  outputPath: 'fonts/'
                }
              }
            ]
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
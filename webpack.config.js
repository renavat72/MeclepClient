const path = require('path')

module.exports = {
    entry: './src/index.js',
    mode:"development",
    output: {
        path: path.resolve( __dirname, 'dist'),
        filename: 'bundle.js',
    },

    module:{
        rules:[
        {
            test: /\.m?js$|jsx/,
            exclude: /node_module/,
            use: "babel-loader",
           
            
        },
        {
            test: /\.css$/,
            use: 'css-loader'
        },
        {
            test: /\.(gif|svg|jpg|png)(\?v=\d+\.\d+\.\d+)?$/,
            use: "file-loader",
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
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        inline: false,
        compress: true
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
}
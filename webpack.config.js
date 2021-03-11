const NODE_ENV = process.env.NODE_ENV
const path = require('path')
const fs = require('fs')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')



const isDev = NODE_ENV === 'development'



const PATH = {
    src: path.resolve(__dirname, 'src'),
    dist: path.resolve(__dirname, 'dist'),
    static: path.resolve(__dirname, 'src/static'),
    pages: path.resolve(__dirname, 'src/pages'),
}



const pages = fs.readdirSync(PATH.pages);



function EntryObject(args){
    // args.map((arg) => {
    //     this[arg] = `${PATH.pages}/${arg}/${arg}.ts`   // ./index/terms.ts, ./catalog/catalog.ts
    // })
    // this.common = ['./assets/js/main.js', 'sdsdsd.sd', sddssd.fergwef'];
    this.bundle = ['@babel/polyfill', `${PATH.src}/layout/layout.ts`];
}

const entryObject = new EntryObject(pages);



const filename = ext => isDev ? `[name].${ext}` : `[name].${ext}`



const optimization = () => {

    let config = {
        // splitChunks: {
        //     chunks: 'all'
        // }
    }

    if(!isDev) {
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin()
        ]

    }

    return config
}



const cssLoaders = extra => {
    let loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: isDev, // hot module replacement
                reloadAll: true
            }
        },
        {
            loader: 'css-loader',
            options: { sourceMap: true }
        }
    ]

    if(extra) {
        loaders.push(extra)
    }

    return loaders
}





module.exports = {

    context: PATH.src,

    entry: entryObject,

    output: {
        filename: filename('js'),
        path: PATH.dist
    },

    plugins: [


        ...pages.map((page) => {
            return new HTMLWebpackPlugin({
                template: `${PATH.pages}/${page}/${page}.pug`,
                filename: page+'.html',
                // chunks: ['common', page],
                chunks: ['bundle'],
                minify: {
                    collapseWhitespace: !isDev,
                    removeComments: !isDev,
                },
            })
        }),


        new MiniCssExtractPlugin({
            filename: filename('css')
        }),

        new CleanWebpackPlugin(),

        new CopyWebpackPlugin({
            patterns: [
                {
                    from: PATH.static,
                    to: PATH.dist
                }
            ]})

    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties'
                        ]
                    }
                }
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-typescript'
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties'
                        ]
                    }
                }
            },

            {
                test: /\.pug$/,
                loader: 'pug-loader'
            },

            {
                test: /\.(scss|sass)$/,
                use: cssLoaders('sass-loader')
            },

            {
                test: /\.less$/,
                use: cssLoaders('less-loader')

            },

            {
                test: /\.css$/,
                use: cssLoaders()
            },

            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },

            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts', '.json'],
        alias: {
            '@': `${PATH.src}`,
            '@styles': `${PATH.src}/assets/styles`,
            '@images': `${PATH.src}/assets/images`,
            '@components': `${PATH.src}/components`,
            '@pages': `${PATH.src}/pages`,
            '@libs': `${PATH.src}/assets/libs`,
        }
    },
    optimization: optimization(),
    devServer: {
        port: 8081,
        overlay: isDev,
        hot: isDev
    },
    devtool: isDev ? 'source-map' : false
}

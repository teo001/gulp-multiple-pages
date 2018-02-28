const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const glob = require('glob');
const pagesPath = __dirname + '/src/pages/';//源码路径
let allPath = glob.sync(pagesPath + "*");  //取得pages下静态目录
let arts = [];
allPath.forEach((v)=>{
   let target = v.split("/");
   arts.push(target[target.length-1]);
})
let plugins = arts.map(v => {
  return  new HtmlWebpackPlugin({
    filename: v.replace(".art",".html"),
    template: path.resolve(__dirname, `./src/pages/${v}`),
    inject:false
  })
})
module.exports = {
  entry: path.resolve(__dirname, "./src/index.js"),
  output: {
    //输出的路径，用了Node语法
    path: path.resolve(__dirname, "dist"),
    //输出的文件名称
    filename: "nouse.js"
  },
  module: {
    rules: [
      {
        test: /\.art$/,
        loader: "art-template-loader",
        options: {
          rules: [
            {
              test: /{{raw}}([\w\W]*?){{\/raw}}/, //vue or other javascript template
              use: function(match, code) {
                return {output: 'raw', code: JSON.stringify(code)}
             }
            }
          ]
        }
      }
    ]
  },
  plugins
};

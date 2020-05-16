const {override,fixBabelImports,addLessLoader} = require('customize-cra')

module.exports = override(
    //按需打包
    fixBabelImports('import',{
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css'
    }),
    //对源码中的less变量重新指定
    addLessLoader()
)
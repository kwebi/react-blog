- 本博客使用React+Redux+Antd开发

- 展示地址：http://nsme.xyz:8078/
- 后台api仓库地址：https://github.com/kwebi/koa-blog-server

克隆到本地后执行`npm i`或者`yarn`
然后执行`yarn start`或`npm start`即可运行查看效果，
部署的话，执行`npm build`或`yarn build`，会生成build文件夹，可以通过nginx进行部署

功能
- 注册登录管理员，只能注册一个用户
- 文章的增加，编辑，删除
- 个人用户呢称，密码，头像修改
- 文章使用markdown格式，支持渲染数学公式，代码高亮。

博客效果

![b](https://s1.ax1x.com/2020/07/12/U8PtoQ.png)
![b](https://s1.ax1x.com/2020/07/12/U8P8L8.png)
![b](https://s1.ax1x.com/2020/07/12/U8P3sf.png)
![b](https://s1.ax1x.com/2020/07/12/U8P1QP.png)

博客专门为移动端适配，提供响应式效果，后台管理界面暂时没适配
![b](https://s1.ax1x.com/2020/07/12/U8PJeS.png)
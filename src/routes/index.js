import {
    Dashboard,
    Login,
    NotFound,
    Settings,
    ArticleList,
    ArticleEdit,
    Notifications,
    NoAuth,
    Article,
    WebArticleList
} from '../views'

export const mainRoutes = [
    {
        pathname: '/article/:id',
        component: Article
    },
    {
        pathname: '/article',
        component: WebArticleList,
        exact: true
    }
]

export const otherRoutes = [
    {
        pathname: '/login',
        component: Login
    },
    {
        pathname: '/404',
        component: NotFound
    },
]

export const adminRoutes = [
    {
        pathname: '/admin/dashboard',
        component: Dashboard,
        title: '仪表盘',
        icon: 'dashboard',
        isNav: true
    },
    {
        pathname: '/admin/article',
        component: ArticleList,
        title: '文章管理',
        icon: 'ordered-list',
        isNav: true,
        exact: true
    },
    {
        pathname: '/admin/article/edit/:id',
        component: ArticleEdit,
        title: '文章编辑',
        icon: 'edit',
        isNav: false
    },
    {
        pathname: '/admin/article/add',
        component: ArticleEdit,
        title: '新增文章',
        icon: 'edit',
        isNav: false
    },
    {
        pathname: '/admin/settings',
        component: Settings,
        title: '设置',
        icon: 'setting',
        isNav: true
    },
    {
        pathname: '/admin/notifications',
        component: Notifications,
        isNav: false
    },
    {
        pathname: '/admin/noauth',
        component: NoAuth
    }
]

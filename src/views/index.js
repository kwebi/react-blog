
import Loadable from 'react-loadable'
import { Loading } from "../components";

const Dashboard = Loadable({
    loader: () => import('./admin/Dashboard'),
    loading: Loading
})

const Login = Loadable({
    loader: () => import('./Login'),
    loading: Loading
})

const NotFound = Loadable({
    loader: () => import('./NotFound'),
    loading: Loading
})
const Settings = Loadable({
    loader: () => import('./admin/Settings'),
    loading: Loading
})
const ArticleList = Loadable({
    loader: () => import('./admin/Article/index'),
    loading: Loading
})
const ArticleEdit = Loadable({
    loader: () => import('./admin/Article/Edit'),
    loading: Loading
})
const Notifications = Loadable({
    loader: () => import('./admin/Notifications'),
    loading: Loading
})
const NoAuth = Loadable({
    loader: () => import('./admin/NoAuth'),
    loading: Loading
})
const Article = Loadable({
    loader: () => import('./web/Article'),
    loading: Loading
})
const WebArticleList = Loadable({
    loader: () => import('./web/WebArticleList'),
    loading: Loading
})
const Register = Loadable({
    loader: () => import('./Register'),
    loading: Loading
})

export {
    Dashboard,
    Login,
    NotFound,
    Settings,
    ArticleList,
    ArticleEdit,
    Notifications,
    NoAuth,
    Article,
    WebArticleList,
    Register
}

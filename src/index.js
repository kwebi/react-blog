import React from 'react';
import ReactDOM from 'react-dom';

import App from "./App";
import './index.less'
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { mainRoutes, otherRoutes } from "./routes";
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd'

import store from './store'
import { Provider } from "react-redux";
import WebFrame from "./components/WebFrame";

ReactDOM.render(
    <Provider store={store}>
        <ConfigProvider locale={zhCN}>
            <Router>
                <Switch>
                    <Route path="/admin" render={(routerProps) => {
                        return <App {...routerProps} />
                    }} />
                    {otherRoutes.map((route) =>
                        (<Route key={route.pathname}
                            path={route.pathname}
                            component={route.component}
                        />))}
                    <Route path="/" render={(routerProps) => {
                        return (<WebFrame {...routerProps}>
                            <Switch>
                                {mainRoutes.map(route => {
                                    return <Route key={route.pathname} path={route.pathname}
                                        component={route.component} exact={route.exact} />
                                })}
                                <Redirect to="/article" from="/" exact={true} />
                                <Redirect to="/404" />
                            </Switch>
                        </WebFrame>)
                    }} />
                    <Redirect to="/404" />
                </Switch>
            </Router>
        </ConfigProvider>
    </Provider>,
    document.getElementById('root')
);

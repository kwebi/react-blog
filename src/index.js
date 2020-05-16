import React from 'react';
import ReactDOM from 'react-dom';

import App from "./App";
import './index.less'
import {HashRouter, Route, Switch, Redirect} from "react-router-dom";
import {mainRoutes} from "./routes";
import zhCN from 'antd/es/locale/zh_CN';
import {ConfigProvider} from 'antd'

import store from './store'
import {Provider} from "react-redux";

ReactDOM.render(
    <Provider store={store}>
        <ConfigProvider locale={zhCN}>
            <HashRouter>
                <Switch>
                    <Route path="/admin" render={(routerProps) => {
                        return <App {...routerProps} />
                    }}></Route>
                    {
                        mainRoutes.map(route => {
                            return <Route key={route.pathname} path={route.pathname}
                                          component={route.component}></Route>
                        })
                    }
                    <Redirect to="/admin" from="/" exact></Redirect>
                    <Redirect to="/404"></Redirect>
                </Switch>
            </HashRouter>
        </ConfigProvider>
    </Provider>,
    document.getElementById('root')
);

import React from 'react';
import { adminRoutes } from './routes'
import { Switch, Route, Redirect } from "react-router-dom";
import { Frame } from "./components";
import { connect } from "react-redux";

const menus = adminRoutes.filter(route => route.isNav === true)

const mapState = state => ({
    isLogin: state.user.isLogin,
    role: state.user.role
})

class App extends React.Component {
    render() {
        return (this.props.isLogin && this.props.role === 1 ? (
            <Frame menus={menus}>
                <Switch>
                    {
                        adminRoutes.map(route => {
                            return <Route key={route.pathname} path={route.pathname} render={(routerProps) => {
                                return <route.component {...routerProps} />
                            }} exact={route.exact}></Route>
                        }
                        )
                    }
                    <Redirect to={adminRoutes[0].pathname} from="/admin" exact></Redirect>
                    <Redirect to='/404'></Redirect>
                </Switch>
            </Frame>

        ) : (<Redirect to="/login" />))
    }
}

export default connect(mapState)(App);

import React, {Component} from 'react';
import {Layout, Menu, Icon, Dropdown, Avatar, Badge} from 'antd';
import {withRouter} from 'react-router-dom'
import {connect} from "react-redux";
import {logout} from '../../redux/actions/user'
import logo from './logo.png'
import './frame.less'

const {Header, Content, Sider} = Layout;

const mapState = state => {
    return {
        notificationsCount: state.notifications.list.filter(item=>item.hasRead===false).length,
        avatar: state.user.avatar,
        displayName: state.user.displayName
    }
}


class Frame extends Component {
    onMenuClick = ({key}) => {
        this.props.history.push(key)
    }
    onDropdownMenuClick = ({ item, key, keyPath, domEvent })=>{
        if(key==='/logout'){
            this.props.logout()
        }else {
            this.props.history.push(key)
        }
    }
    renderDropdown = ()=> (
        <Menu onClick={this.onDropdownMenuClick}>
            <Menu.Item key="/admin/notifications">
                <Badge offset={[10,5]} count={this.props.notificationsCount}>
                    通知
                </Badge>
            </Menu.Item>
            <Menu.Item key="/admin/settings">
                设置
            </Menu.Item>
            <Menu.Item key="/logout">
                退出
            </Menu.Item>
        </Menu>
    )

    render() {
        const selectedKeyArr = this.props.location.pathname.split('/')
        selectedKeyArr.length = 3
        return (
            <Layout style={{height: '100%'}}>
                <Header className="header ql-header">
                    <div className="ql-logo">
                        <img src={logo} alt="Dreamwings"/>
                    </div>
                    <Dropdown overlay={this.renderDropdown()}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <Avatar src={this.props.avatar}/>
                            <span>{this.props.displayName}</span>
                            <Icon type="down"/>
                        </div>
                    </Dropdown>
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            selectedKeys={selectedKeyArr.join('/')}
                            defaultOpenKeys={['sub1']}
                            style={{height: '100%', borderRight: 0}}
                            onClick={this.onMenuClick}
                        >

                            {
                                this.props.menus.map(item => {
                                    return <Menu.Item key={item.pathname}>
                                        <Icon type={item.icon}></Icon>
                                        {item.title}
                                    </Menu.Item>
                                })
                            }
                        </Menu>
                    </Sider>
                    <Layout style={{padding: '12px', height: '100%'}}>
                        <Content
                            className="site-layout-background"
                            style={{
                                margin: 0,
                                minHeight: '100%',
                                backgroundColor: '#fff',
                            }}
                        >
                            {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

export default connect(mapState,{logout})(withRouter(Frame));

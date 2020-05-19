import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {Menu, Icon, Dropdown} from 'antd'

import navList from "./navList";

const menu = (
    <Menu className='header-nav'>
        {navList.map(nav => (
            <Menu.Item key={nav.link}>
                <Link to={nav.link}>
                    {nav.icon && <Icon type={nav.icon} style={{marginRight: 15}}/>}
                    <span className='nav-text'>{nav.title}</span>
                </Link>
            </Menu.Item>
        ))}
    </Menu>
)

class Left extends Component {
    render() {
        return (
            <div className="header-left">
                <span className='blog-name'/>
                <Dropdown
                    overlayClassName='header-dropdown'
                    trigger={['click']}
                    overlay={menu}
                    getPopupContainer={() => document.querySelector('.home-header .header-left')}>
                    <Icon type='menu-o' className='header-dropdown-icon'/>
                </Dropdown>
            </div>
        );
    }
}

export default Left;

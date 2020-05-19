import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {Menu,Icon} from "antd";

import navList from "./navList";


class Right extends Component {

    render() {
        const { mode = 'horizontal' } = this.props
        return (
            <div className="header-right">
            <Menu mode={mode} className="header-nav" >
                {
                    navList.map(nav=>(
                        <Menu.Item key={nav.link}>
                            <Link to={nav.link}>
                                {nav.icon && <Icon type={nav.icon} />}
                                <span className='nav-text'>{nav.title}</span>
                            </Link>

                        </Menu.Item>
                    ))
                }
            </Menu>
            </div>
        );
    }
}

export default Right;

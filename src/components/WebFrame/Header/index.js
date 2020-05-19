import React, {Component} from 'react';
import {Layout, Row, Col} from 'antd';

import Left from "./Left";
import Right from "./Right";

// 响应式
const responsiveLeft = {xxl: 4, xl: 5, lg: 5, md: 4, sm: 4, xs: 24}
const responsiveRight = {xxl: 20, xl: 19, lg: 19, md: 20, sm: 20, xs: 0}

const {Header} = Layout;

class WebHeader extends Component {
    render() {
        return (
            <Header className="home-header">
                <Row>
                    <Col {...responsiveLeft}>
                        <Left/>
                    </Col>
                    <Col {...responsiveRight}>
                        <Right/>
                    </Col>
                </Row>
            </Header>
        );
    }
}

export default WebHeader;

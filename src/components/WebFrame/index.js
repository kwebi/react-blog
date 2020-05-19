import React, {Component} from 'react';
import {Col, Layout, Row} from 'antd';

import './home.less'
import WebHeader from "./Header";
import WebFooter from "./Footer";
import SideBar from "./SideBar";

const { Header, Footer, Content } = Layout;

// 响应式
const responsiveRight = { lg: {span:6,offset: 1},md:0, sm: 0, xs: 0 }
const responsiveLeft = { lg: {span:14,offset:2}, md:{span: 18,offset: 3}, sm: {span: 22,offset: 1}, xs: {span: 22,offset: 1} }

class WebFrame extends Component {
    render() {
        return (
            <Layout className="home-layout">
                <WebHeader/>
                <Layout>
                    <Content className="home-content">
                        <Row>
                            <Col {...responsiveLeft} className="left-side">
                                {this.props.children}
                            </Col>
                            <Col {...responsiveRight} className="right-side">
                                <SideBar/>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
                <WebFooter/>
            </Layout>
        );
    }
}

export default WebFrame;

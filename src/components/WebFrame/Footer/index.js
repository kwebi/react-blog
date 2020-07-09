import React, { Component } from 'react';

import { Layout } from 'antd';

const { Footer } = Layout;


class WebFooter extends Component {
    render() {
        return (
            <Footer className="home-footer">博客开源仓库:<a href="https://github.com/kwebi/react-blog">https://github.com/kwebi/react-blog</a></Footer>
        );
    }
}

export default WebFooter;

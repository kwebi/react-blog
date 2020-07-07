import React, { Component } from 'react';
import { Avatar, Icon } from "antd";
import { getHotArticles } from '../../../requests'
import moment from 'moment'

class SideBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            articleList: [],
        }
    }

    componentDidMount() {
        getHotArticles().then(res => {
            const data = res.map(article => {
                article.updatedAt = moment(article.updatedAt).format('YYYY年MM月DD日 hh:mm')
                return article
            })
            this.setState({
                articleList: data
            })
        })
    }

    render() {
        return (
            <div className="side-bar">
                <div className="side-avatar">
                    <Avatar className="avatar"
                        src="https://static.dreamwings.cn/wp-content/uploads/2018/06/806e52a2e2b9ff4bd2c23140df75cc1f.jpeg" />
                </div>
                <div className="like-me">
                    <div className="like-me-text">
                        Do you like me?
                    </div>
                    <div className="heart-icon">
                        <Icon type="heart" theme="filled" />1222
                    </div>
                </div>
                <div className="hot-articles">
                    <ul>

                        {this.state.articleList.map((article, index) => {
                            return (
                                <li key={index}>
                                    <Avatar size={60} shape={"square"} className="avatar"
                                        src={article.img} />
                                    <div className="desc-text">
                                        <span>{article.title}</span>
                                        <span className="push-time">{article.updatedAt}</span>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

export default SideBar;

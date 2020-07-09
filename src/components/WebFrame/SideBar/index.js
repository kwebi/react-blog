import React, { Component } from 'react';
import { Avatar, Icon } from "antd";
import { getArticles } from '../../../requests'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import { like, getLike, getPublic } from '../../../requests'

let timer

class SideBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            articleList: [],
            like: 0,
            publicInfo: {},
            total: -1
        }
    }

    reloadArticles = () => {
        getArticles(0, 1).then(async res => {
            if (this.state.total === -1) {
                this.setState({
                    total: res.total.total
                })
            }
            const total = res.total.total
            const st = new Set()
            while (st.size < 6 && st.size < total - 1) {
                st.add(Math.floor(Math.random() * total))
            }
            let articleList = []
            for (let order of st) {
                const res = await getArticles(order, 1)
                if (res.list.length === 0) return
                const data = res.list[0]
                data.order = order
                articleList.push(data)
            }
            articleList = articleList.map(item => {
                item.updatedAt = moment(item.updatedAt).format("YYYY年MM月DD日HH:mm")
                return item
            })
            this.setState({
                articleList
            })
        })

    }

    linkToArticle = (id) => {
        this.props.history.push(`/article/${id}`)
    }
    getLike = () => {
        getLike().then(res => {
            this.setState({
                like: res
            })
        })
    }
    getPublicInfo = () => {
        getPublic().then(res => {
            this.setState({
                publicInfo: res
            })
        })
    }

    handleLike = () => {
        //0.5s内多次点击只有一次有效
        clearTimeout(timer)
        timer = setTimeout(() => {
            like().finally(() => {
                this.getLike()
            })
        }, 200)

    }

    componentDidMount() {
        this.reloadArticles()
        this.getLike()
        this.getPublicInfo()
    }

    render() {
        return (
            <div className="side-bar">
                <div className="side-avatar">
                    <Avatar className="avatar"
                        src={this.state.publicInfo.img} />
                </div>
                <div className="like-me">
                    <div className="like-me-text">
                        Do you like me?
                    </div>
                    <div className="heart-icon" onClick={this.handleLike}>
                        <Icon type="heart" theme="filled" />{this.state.like}
                    </div>
                </div>
                <div className="hot-articles">
                    <ul style={{ padding: 0 }}>
                        {this.state.articleList.map((article, index) => {
                            return (
                                <li key={index} onClick={() => {
                                    this.linkToArticle(article.order)
                                }} style={{ cursor: 'pointer' }}>
                                    <Avatar size={60} shape={"square"} className="avatar"
                                        src={article.img} />
                                    <div className="desc-text">
                                        <span>{article.title}</span>
                                        <br />
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

export default withRouter(SideBar);

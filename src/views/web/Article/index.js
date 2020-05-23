import React, { Component } from 'react';
import { Icon } from "antd";
import moment from "moment";
import { getArticleById } from "../../../requests";
import '../index.less'
import './article.less'

class Article extends Component {

    constructor(props) {
        super(props);
        this.state = {
            article: {
                title: "",
                author: "",
                createdAt: "",
                amount: ""
            }
        }
    }

    getArticle = (id) => {
        return getArticleById(id)
    }
    componentDidMount() {
        this.getArticle(this.props.match.params.id).then(resp => {
            resp.createdAt = moment(resp.createdAt).format("YYYY年MM月DD日 hh:mm")
            this.setState({
                article: resp
            })
        })
    }

    render() {
        return (
            <div className="article-content">
                <div>
                    <img src="https://static.dreamwings.cn/wp-content/uploads/2020/03/72683c0777833534f746219f5c4f177e-1.jpg" alt="" />
                </div>
                <div className="article-container">
                    <div className="outline-title">
                        {this.state.article.title}
                    </div>
                    <div className="entry-meta">
                        <ul>
                            <li>@{this.state.article.author}</li>
                            <li>/</li>
                            <li><Icon type="star" theme="filled" />
                                {this.state.article.createdAt}
                            </li>
                            <li>/</li>
                            <li><Icon type="tags" theme="filled" />
                                任意门
                            </li>
                            <li>/</li>
                            <li><Icon type="eye" theme="filled" />
                                {this.state.article.amount}
                            </li>
                        </ul>
                    </div>
                    <div className="article-main">
                        {this.state.article.content}
                    </div>
                </div>
            </div>
        );
    }
}

export default Article;

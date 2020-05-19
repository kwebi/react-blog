import React, {Component} from 'react';
import {Icon} from "antd";
import {getArticleById} from "../../../requests";
import '../index.less'
import './article.less'

class Article extends Component {

    constructor(props) {
        super(props);
        this.state = {
            article : {
                title: "",
                author: "",
                createAt: "",
                amount: ""
            }
        }
    }

    getArticle=(id)=>{
        return getArticleById(id)
    }
    componentDidMount() {
        this.getArticle(this.props.match.params).then(resp=>{
            console.log(resp)
            this.setState({
                article: resp
            })
        })
    }

    render() {
        return (
            <div className="article-content">
                <div>
                    <img src="https://static.dreamwings.cn/wp-content/uploads/2020/03/72683c0777833534f746219f5c4f177e-1.jpg" alt=""/>
                </div>
                <div className="article-container">
                    <div className="outline-title">
                        {this.state.article.title}
                    </div>
                    <div className="entry-meta">
                        <ul>
                            <li>@{this.state.article.author}</li>
                            <li>/</li>
                            <li><Icon type="star" theme="filled"/>
                                {this.state.article.createAt}
                            </li>
                            <li>/</li>
                            <li><Icon type="tags" theme="filled"/>
                                任意门
                            </li>
                            <li>/</li>
                            <li><Icon type="eye" theme="filled"/>
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

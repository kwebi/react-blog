import React, { Component } from 'react';
import { Icon, Spin } from "antd";
import { translateMarkdown } from '../../../utils'
import moment from "moment";
import { getArticles } from "../../../requests";
import '../index.less'
import './article.less'


var isMathjaxConfig = false; // 防止重复调用Config，造成性能损耗
  const initMathjaxConfig = () => {
    if (!window.MathJax) {
      return;
    }
    window.MathJax.Hub.Config({
      showProcessingMessages: false, //关闭js加载过程信息
      messageStyle: "none", //不显示信息
      jax: ["input/TeX", "output/HTML-CSS"],
      tex2jax: {
        inlineMath: [["$", "$"], ["\\(", "\\)"]], //行内公式选择符
        displayMath: [["$$", "$$"], ["\\[", "\\]"]], //段内公式选择符
        skipTags: ["script", "noscript", "style", "textarea", "pre", "code", "a"] //避开某些标签
      },
      "HTML-CSS": {
        availableFonts: ["STIX", "TeX"], //可选字体
        showMathMenu: false //关闭右击菜单显示
      }
    });
    isMathjaxConfig = true; // 
  };
  if (isMathjaxConfig === false) { // 如果：没有配置MathJax
    initMathjaxConfig();
  }

class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            article: {
                title: "",
                author: "",
                createdAt: "",
                amount: "",
                content: "",
                img: "#",
                id: ''
            },
            isLoading: false,
            total: -1
        }
    }

    getArticle = (order) => {
        this.setState({ isLoading: true })
        return getArticles(order, 1).then(res => {
            const resp = res.list[0]
            if (this.state.total === -1) {
                this.setState({
                    total: res.total.total
                })
            }
            if (res.list.length === 0) {
                if (res.total.total !== 0)
                    this.props.history.push('/article/' + (res.total.total - 1))
                else
                    this.props.history.push('/')
            } else {
                resp.updatedAt = moment(resp.updatedAt).format("YYYY年MM月DD日HH:mm")
                this.setState({
                    article: resp
                })
            }
        }).finally(() => {
            this.setState({ isLoading: false })
        })
    }

    handlePre = () => {
        let nowId = +this.props.match.params.id
        if (nowId - 1 < 0) return
        this.props.history.push('/article/' + (nowId - 1))
    }
    handleNext = () => {
        let nowId = +this.props.match.params.id
        if (nowId + 1 >= this.state.total) return
        this.props.history.push('/article/' + (nowId + 1))
    }

    componentDidMount() {
        this.props.history.listen(route => {
            const arr = route.pathname.split('/')
            if (!arr.includes('article')) return
            const id = parseInt(arr[arr.length - 1])
            if (!isNaN(id))
                this.getArticle(id)
        })
        this.getArticle(+this.props.match.params.id).finally(() => {
            // 如果，不传入第三个参数，则渲染整个document
            window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, document.querySelector('.article-main')]);
        })
    }

    render() {
        return (
            <Spin spinning={this.state.isLoading}>
                <div className="article-content">
                    <div className="article-img">
                        <img className="article-img" src={this.state.article.img} alt="" />
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
                                    {this.state.article.updatedAt}
                                </li>
                                {/* <li>/</li>
                                <li><Icon type="tags" theme="filled" />
                                任意门
                                </li>
                                <li>/</li>
                                <li><Icon type="eye" theme="filled" />
                                    {this.state.article.amount}
                                </li> */}
                            </ul>
                        </div>
                        <div className="article-main" >
                            <div dangerouslySetInnerHTML={{ __html: translateMarkdown(this.state.article.content) }}></div>
                        </div>
                    </div>
                    <div className="next-previous-posts">
                        <div className="page-btn" onClick={this.handlePre}>
                            <span>&lt;前一篇</span>
                        </div>
                        <div className="page-btn" onClick={this.handleNext}>
                            <span>后一篇&gt;</span>
                        </div>
                    </div>
                </div>
            </Spin>
        );
    }
}

export default Article;

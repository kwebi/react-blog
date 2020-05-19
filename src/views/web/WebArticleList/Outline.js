import React, {Component} from 'react';
import {Icon} from "antd";
import {Link} from "react-router-dom";
import './outline.less'
import '../index.less'

class Outline extends Component {
    render() {
        return (
            <div className="outline-content">
                <div>
                    <img src="https://static.dreamwings.cn/wp-content/uploads/2020/03/20200323194841.jpg" alt=""/>
                </div>
                <div className="outline-main">
                    <div className="outline-title">
                        <Link to={`/article/${this.props.id}`}>{this.props.title}</Link>
                    </div>
                    <div className="entry-meta">
                        <ul>
                            <li>@{this.props.author}</li>
                            <li>/</li>
                            <li><Icon type="star" theme="filled"/>
                                {this.props.createAt}
                            </li>
                            <li>/</li>
                            <li><Icon type="tags" theme="filled"/>
                                任意门
                            </li>
                            <li>/</li>
                            <li><Icon type="eye" theme="filled"/>
                                {this.props.amount}
                            </li>
                        </ul>
                    </div>
                    <div className="entry-excerpt">
                        <p>呐，这样的结局，有过后悔嘛~</p>
                        <p>其实呢，都是自己的选择，自己选择了放弃，就该清楚放弃了什么</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Outline;

import React, { Component } from 'react';
import { Icon } from "antd";
import { Link } from "react-router-dom";


class Outline extends Component {
    render() {
        return (
            <div className="outline-content">
                <div className="article-img">
                    <img className="article-img" src={this.props.img} alt="" />
                </div>
                <div className="outline-main">
                    <div className="outline-title">
                        <Link className="outline-title" to={`/article/${this.props.order}`}>{this.props.title}</Link>
                    </div>
                    <div className="entry-meta">
                        <ul>
                            <li>@{this.props.author ? this.props.author : '夏目蓝'}</li>
                            <li>/</li>
                            <li><Icon type="star" theme="filled" />
                                {this.props.updatedAt}
                            </li>
                            {/* <li>/</li>
                            <li><Icon type="tags" theme="filled" />
                                任意门
                            </li>
                            <li>/</li>
                            <li><Icon type="eye" theme="filled" />
                                {this.props.amount}
                            </li> */}
                        </ul>
                    </div>

                </div>
            </div>
        );
    }
}

export default Outline;

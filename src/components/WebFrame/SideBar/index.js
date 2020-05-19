import React, {Component} from 'react';
import {Avatar, Icon} from "antd";

class SideBar extends Component {
    render() {
        return (
            <div className="side-bar">
                <div className="side-avatar">
                    <Avatar className="avatar"
                            src="https://static.dreamwings.cn/wp-content/uploads/2018/06/806e52a2e2b9ff4bd2c23140df75cc1f.jpeg"/>
                </div>
                <div className="like-me">
                    <div className="like-me-text">
                        Do you like me?
                    </div>
                    <div className="heart-icon">
                        <Icon type="heart" theme="filled"/>1222
                    </div>
                </div>
                <div className="hot-articles">
                    <ul>
                        <li>
                            <Avatar size={60} shape={"square"} className="avatar"
                                    src="https://static.dreamwings.cn/wp-content/uploads/2016/07/timg-1-150x150.jpg"/>
                            <div className="desc-text">
                                <span>为多说评论添加QQ表情</span>
                                <span className="push-time">下午9:32, 23 12月 2018</span>
                            </div>
                        </li>
                        <li>
                            <Avatar size={60} shape={"square"} className="avatar"
                                    src="https://static.dreamwings.cn/wp-content/uploads/2016/08/a686c9177f3e67098d1406e638c79f3df8dc5596-150x150.jpg"/>
                            <div className="desc-text">
                                <span>为多说评论添加QQ表情</span>
                                <span className="push-time">下午9:32, 23 12月 2018</span>
                            </div>
                        </li>
                        <li>
                            <Avatar size={60} shape={"square"} className="avatar"
                                    src="https://static.dreamwings.cn/wp-content/uploads/2018/11/49418016_p0-150x150.jpg"/>
                            <div className="desc-text">
                                <span>为多说评论添加QQ表情</span>
                                <span className="push-time">下午9:32, 23 12月 2018</span>
                            </div>
                        </li>
                        <li>
                            <Avatar size={60} shape={"square"} className="avatar"
                                    src="https://static.dreamwings.cn/wp-content/uploads/2019/04/cbp9o-tbk7p-150x150.png"/>
                            <div className="desc-text">
                                <span>为多说评论添加QQ表情</span>
                                <span className="push-time">下午9:32, 23 12月 2018</span>
                            </div>
                        </li>
                        <li>
                            <Avatar size={60} shape={"square"} className="avatar"
                                    src="https://static.dreamwings.cn/wp-content/uploads/2018/08/Nipic_18003253_20140215180014733125-150x150.jpg"/>
                            <div className="desc-text">
                                <span>为多说评论添加QQ表情</span>
                                <span className="push-time">下午9:32, 23 12月 2018</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default SideBar;

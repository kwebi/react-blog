import React, {Component} from 'react';
import {Card, Button, List, Avatar, Icon, Badge,Spin} from "antd";
import {connect} from "react-redux";
import {markNotificationsAsReadById, markAllNotificationsAsRead} from "../../../redux/actions/notifications";

const mapState = state => {
    const {list, isLoading} = state.notifications
    return {
        list,
        isLoading
    }
}

class Notifications extends Component {
    render() {
        return (
            <Spin spinning={this.props.isLoading}>
                <Card title="通知中心" bordered={false} extra={
                    <Button
                        disabled={this.props.list.every(item => item.hasRead === true)}
                        onClick={this.props.markAllNotificationsAsRead}
                    >全部标记已读</Button>
                }>
                    <List
                        itemLayout="horizontal"
                        dataSource={this.props.list}
                        renderItem={item => (
                            <List.Item extra={item.hasRead ? null : <Button onClick={() => {
                                this.props.markNotificationsAsReadById(item.id)
                            }}><Icon type="check"/></Button>}>
                                <List.Item.Meta
                                    avatar={<Avatar
                                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                                    title={<Badge dot={!item.hasRead}>{item.title}</Badge>}
                                    description={item.description}
                                />
                            </List.Item>
                        )}
                    />
                </Card>
            </Spin>
        );
    }
}

export default connect(mapState, {markNotificationsAsReadById, markAllNotificationsAsRead})(Notifications);

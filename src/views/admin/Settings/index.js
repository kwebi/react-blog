import React, { Component } from 'react';
import { Form, Icon, Input, Button, message, Spin } from 'antd';
import { setting, getSettingById } from '../../../requests'
import { getLocal, getSession } from '../../../utils/stroage';



const formItemLayout = {
    xs: {
        span: 24,
    },
    sm: {
        span: 20,
        offset: 2
    },
    md: {
        span: 16,
        offset: 4
    },
    lg: {
        span: 12,
        offset: 6
    }
}


class Settings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false
        }
    }
    handleRegister = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {

                if (values.password2 !== values.password1) {
                    message.error('密码不一致')
                    return;
                }
                if (!values.password1 || !values.password2) {
                    values.password1 = values.password
                    values.password2 = values.password
                }
                const userInfo = getSession('userInfo') || getLocal('userInfo')
                Object.assign(userInfo, values)
                this.setState({
                    isLoading: true
                })
                setting(userInfo).then(resp => {
                    message.success(resp.msg)
                }).finally(() => {
                    this.setState({
                        isLoading: false
                    })
                })

            }
        });
    }

    getUserSetting = () => {
        const userInfo = getSession('userInfo') || getLocal('userInfo')
        return getSettingById(userInfo.userId).then(resp => {
            this.props.form.setFieldsValue({
                img: resp.userInfo.img,
                nickname: resp.userInfo.nickname
            })
        })
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        })
        this.getUserSetting().finally(() => {
            this.setState({
                isLoading: false
            })
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Spin spinning={this.state.isLoading}>
                    <Form style={{ marginTop: "40px" }} onSubmit={this.handleRegister} className="login-form" wrapperCol={formItemLayout}>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="旧密码"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password1', {
                                rules: [{ required: false, message: 'Please input your Password!' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="输入新密码"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password2', {
                                rules: [{ required: false, message: 'Please input your Password!' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="再次输入新密码"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('img', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="新头像图片链接"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('nickname', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="修改昵称"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" disabled={this.props.isLoading}>
                                修改
                        </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </div>
        );
    }
}

export default (Form.create()(Settings));
import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, Spin, message } from 'antd';
import { Redirect } from 'react-router-dom'


import { registerRequest } from '../../requests'
import '../Login/login.less'



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

class Register extends Component {

    handleRegister = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (values.passward !== values.passward1) {
                    message.error('密码不一致')
                    return;
                }
                registerRequest(values).then(res => {

                    if (res.data.code === 200) {
                        message.success('注册成功')
                        this.props.history.push('/login')
                    } else {
                        message.error(res.data.errMsg)
                    }
                }).catch(err => {
                    message.error('注册失败')
                })
            }
        });
    }
    render() {

        const { getFieldDecorator } = this.props.form;
        return this.props.isLogin ? <Redirect to="/admin" /> : (

            <div className="ql-login-card">
                <Form onSubmit={this.handleRegister} className="login-form" wrapperCol={formItemLayout}>
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="用户名"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="密码"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password1', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="再次输入密码"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>

                        <Button type="primary" htmlType="submit" disabled={this.props.isLoading}>
                            注册
                        </Button>
                    </Form.Item>
                </Form>

            </div>
        )
    }
}

export default (Form.create()(Register));

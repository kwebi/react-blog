import React, {Component} from 'react';
import {Form, Icon, Input, Button, Checkbox,Spin} from 'antd';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {login} from '../../redux/actions/user'
import './login.less'

const mapState=state=>{
    return {
        isLogin: state.user.isLogin,
        isLoading: state.user.isLoading
    }
}

const formItemLayout = {
    xs: {
        span: 24
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

class Login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.login(values)
            }
        });
    };
    render() {
        const {getFieldDecorator} = this.props.form;
        return this.props.isLogin?<Redirect to="/admin" />: (

            <div className="ql-login-card">
                <Form onSubmit={this.handleSubmit} className="login-form" wrapperCol={formItemLayout}>
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{required: true, message: 'Please input your username!'}],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder="用户名"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: 'Please input your Password!'}],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                type="password"
                                placeholder="密码"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox>记住我</Checkbox>)}
                        <Button type="primary" htmlType="submit" disabled={this.props.isLoading}>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
                <Spin spinning={this.props.isLoading} style={{position:"absolute", left: '49%',top: '49%'}}></Spin>
            </div>
        )
    }
}

export default connect(mapState,{login})(Form.create()(Login));

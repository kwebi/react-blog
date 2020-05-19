import React, {Component} from 'react'
import {Button, Card, Form, Input, DatePicker, Spin,message} from "antd"
import SimpleMDEEditor from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {getArticleById, saveArticle} from '../../../requests'
import moment from 'moment'

const formItemLayout = {
    labelCol: {
        span: 3
    },
    wrapperCol: {
        span: 16
    }
}

class ArticleEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const data = Object.assign({}, values, {
                    createAt: values.createAt.valueOf()
                })
                this.setState({
                    isLoading: true
                })
                saveArticle(this.props.match.params.id, data).then(resp => {
                    message.success(resp.msg)
                }).finally(() => {
                    this.setState({
                        isLoading: false
                    })
                    this.props.history.push('/admin/article')
                })
            }
        });
    }

    getArticle = (id) => {
        return getArticleById(id).then(resp => {
            this.props.form.setFieldsValue({
                title: resp.title,
                author: resp.author,
                content: resp.content,
                createAt: moment(resp.createAt)
            })
        })
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        })
        this.getArticle(this.props.match.params.id).finally(() => {
            this.setState({
                isLoading: false
            })
        })

    }


    render() {
        const {getFieldDecorator} = this.props.form
        return (
            <Card title='文章编辑' bordered={false}
                  extra={<Button>取消</Button>}>
                <Spin spinning={this.state.isLoading}>
                    <Form onSubmit={this.handleSubmit}
                          {...formItemLayout}>
                        <Form.Item label="标题">
                            {getFieldDecorator('title', {
                                rules: [{required: true, message: '标题必填'}],
                            })(
                                <Input
                                />,
                            )}
                        </Form.Item>
                        <Form.Item label="作者">
                            {getFieldDecorator('author', {
                                rules: [{required: true, message: '作者必填'}],
                            })(
                                <Input
                                />,
                            )}
                        </Form.Item>

                        <Form.Item label="时间">
                            {getFieldDecorator('createAt', {
                                rules: [{required: true, message: '时间'}],
                            })(
                                <DatePicker showTime placeholder="选择时间"/>
                            )}
                        </Form.Item>
                        <Form.Item label="内容">
                            {getFieldDecorator('content', {
                                rules: [{required: true, message: '内容必填'}],
                            })(
                                <SimpleMDEEditor />
                            )}
                        </Form.Item>
                        <Form.Item wrapperCol={{offset: 3}}>
                            <Button type="primary" htmlType="submit">
                                保存
                            </Button>
                        </Form.Item>

                    </Form>
                </Spin>
            </Card>
        );
    }
}


export default Form.create({name: 'normal_login'})(ArticleEdit)

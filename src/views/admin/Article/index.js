import React, { Component } from 'react';
import { Card, Button, Table, Tag, Modal, Typography, message } from "antd";
import { deleteArticleById, getArticles } from "../../../requests";
import { Link } from "react-router-dom"
import moment from "moment";

const titleDisplayMap = {
    id: 'id',
    title: '标题',
    author: '作者',
    updatedAt: '修改时间',
    amount: '阅读量',
    //content: '内容'
}

const ButtonGroup = Button.Group

class ArticleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            columns: [],
            total: 0,
            isLoading: false,
            offset: 0,
            limited: 10
        }
    }

    createColumns = (columnsKeys) => {
        const columns = columnsKeys.map(item => {
            if (item === 'amount') {
                return {
                    title: titleDisplayMap[item],
                    key: item,
                    render: (text, record, index) => {
                        const { amount } = record
                        return <Tag color={amount > 200 ? 'green' : 'blue'}>{amount}</Tag>
                    }
                }
            }
            if (item === 'updatedAt') {
                return {
                    title: titleDisplayMap[item],
                    key: item,
                    render: (text, record, index) => {
                        const { updatedAt } = record
                        return moment(updatedAt).format('YYYY年MM月DD日 HH:mm')
                    }
                }
            }

            return {
                title: titleDisplayMap[item],
                dataIndex: item,
                key: item
            }

        })
        columns.push({
            title: '操作',
            key: 'action',
            render: (text, record, index) => {
                return (
                    <ButtonGroup>
                        <Button size="small" type="default" onClick={() => {
                            this.toEdit(record)
                        }}>编辑</Button>
                        <Button size="small" type="danger" onClick={() => {
                            this.deleteArticle(record)
                        }}>删除</Button>
                    </ButtonGroup>
                )
            }
        })
        return columns
    }

    deleteArticle = (record) => {
        Modal.confirm({
            title: <Typography>确定删除{record.title}吗</Typography>,
            content: `操作不可逆，谨慎删除`,
            okText: `删除`,
            onOk: () => {
                //通过返回Promise达到等待直到操作成功
                return deleteArticleById(record.id).then(resp => {
                    message.success(resp.msg)
                    this.getData()
                })
            }
        })
    }
    toEdit = (record) => {
        this.props.history.push({
            pathname: `/admin/article/edit/${record.id}`
        })
    }

    getData = () => {
        this.setState({
            isLoading: true
        })
        getArticles(this.state.offset, this.state.limited).then(resp => {
            const columnsKeys = ['id', 'title', 'updatedAt', 'amount'] //Object.keys(resp.list[0])
            resp.list.map(item => {
                // const contentLimited = item.content.slice(0, 20) + '...';//内容压缩显示
                // Object.assign(item, {
                //     content: contentLimited
                // })
                return item
            })
            const columns = this.createColumns(columnsKeys)
            this.setState({
                total: resp.total,
                dataSource: resp.list,
                columns,
            })
        }).catch(err => {
        }).finally(() => {
            this.setState({
                isLoading: false
            })
        })
    }

    componentDidMount() {
        this.getData()
    }

    onPageChange = (page, pageSize) => {
        this.setState({
            limited: pageSize,
            offset: (page - 1) * pageSize
        }, () => {
            this.getData()
        })
    }

    onShowSizeChange = (current, size) => {
        this.setState({
            limited: size,
            offset: 0
        }, () => {
            this.getData()
        })
    }

    render() {
        return (
            <Card title="文章列表" bordered={false}
                extra={<Button><Link to="/admin/article/add">新建文章</Link></Button>}>
                <Table dataSource={this.state.dataSource}
                    columns={this.state.columns}
                    pagination={{
                        current: (this.state.offset / this.state.limited + 1),
                        total: this.state.total,
                        onChange: this.onPageChange,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        onShowSizeChange: this.onShowSizeChange,
                        pageSizeOptions: ['5', '10', '20', '40']
                    }}
                    rowKey={record => record.id}
                    loading={this.state.isLoading}
                />
            </Card>
        );
    }
}

export default ArticleList;

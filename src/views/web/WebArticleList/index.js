import React, { Component } from 'react';
import { getArticles } from "../../../requests";
import moment from "moment";
import Outline from "./Outline";
import './outline.less'
import '../index.less'

class WebArticleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            total: 0,
            isLoading: false,
            offset: 0,
            limit: 6
        }
    }

    getData = (offset, limit) => {
        this.setState({
            isLoading: true
        })
        getArticles(offset, limit).then(resp => {
            this.setState({
                dataSource: resp.list,
                total: resp.total.total
            })
        }).finally(() => {
            this.setState({
                isLoading: false
            })
        })

    }

    handlePre = () => {
        let offset = this.state.offset - this.state.limit
        if (offset <= 0) offset = 0
        this.setState({
            offset
        })
        this.getData(offset, this.state.limit)
    }
    handleNext = () => {
        let offset = this.state.offset + this.state.limit
        if (offset > this.state.total) offset = this.state.offset
        this.setState({
            offset
        })
        this.getData(offset, this.state.limit)
    }

    componentDidMount() {
        this.getData(this.state.offset, this.state.limit)
    }

    render() {
        return (
            <div>
                {
                    this.state.dataSource.map(item => {
                        const formatDate = moment(item.updatedAt).format("YYYY年MM月DD日")
                        const newItem = Object.assign({}, item, {
                            updatedAt: formatDate
                        })
                        return <Outline key={item.id} {...newItem} />
                    })
                }
                <div className="next-previous-posts">
                    <div className="page-btn" onClick={this.handlePre}>
                        <span>&lt;前一页</span>
                    </div>
                    <div className="page-btn" onClick={this.handleNext}>
                        <span>后一页&gt;</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default WebArticleList;

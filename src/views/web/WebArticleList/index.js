import React, {Component} from 'react';
import {getArticles} from "../../../requests";
import moment from "moment";
import Outline from "./Outline";

class WebArticleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            total: 0,
            isLoading: false,
            offset: 0,
            limited: 6
        }
    }

    getData = () => {
        this.setState({
            isLoading: true
        })
        getArticles(this.state.offset, this.state.limited).then(resp => {
            this.setState({
                dataSource: resp.list,
                total: resp.total
            })
        }).finally(() => {
            this.setState({
                isLoading: false
            })
        })

    }

    componentDidMount() {
        this.getData()
    }

    render() {
        return (
            <div>
                {
                    this.state.dataSource.map(item => {
                        const formatDate = moment(item.createAt).format("YYYY年MM月DD日")
                        const newItem = Object.assign({}, item, {
                            createAt: formatDate
                        })
                        return <Outline key={item.id} {...newItem} />
                    })
                }
            </div>
        );
    }
}

export default WebArticleList;

import React, {Component,createRef} from 'react';
import {Card, Row, Col} from "antd";
import './dashboard.less'
import echarts from 'echarts'

class Dashboard extends Component {
    constructor() {
        super();
        this.articleAmount = createRef()
    }

    initArticleChart = ()=>{
        this.articleChart = echarts.init(this.articleAmount.current)
    }

    componentDidMount() {
        this.initArticleChart()
        const option = {
            xAxis: {
                type: 'category',
                data: ["一月","二月","三月","四月","五月","六月"]
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                type: 'line',
                data: [5, 20, 36, 10, 10, 20]
            }]
        }
        this.articleChart.setOption(option);
    }

    render() {
        return (
            <div>
                <Card title="概览">
                    <Row gutter={[{xs: 8, sm: 16, md: 24, lg: 32}, 20]}>
                        <Col className="gutter-row" span={6}>
                            <div className="ql-gutter-box" style={{backgroundColor: '#29B6F6'}}></div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className="ql-gutter-box" style={{backgroundColor: '#AB47BC'}}></div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className="ql-gutter-box" style={{backgroundColor: '#FF7043'}}></div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className="ql-gutter-box" style={{backgroundColor: '#43A047'}}></div>
                        </Col>
                    </Row>
                </Card>
                <Card title="最近浏览量">
                    <div ref={this.articleAmount} style={{height:'400px'}}></div>
                </Card>
            </div>
        );
    }
}

export default Dashboard;
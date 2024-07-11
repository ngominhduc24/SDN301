import React from "react"
import { Card, Statistic, Row, Col } from "antd"
import ReactECharts from 'echarts-for-react';
const DashBoard = () => {
  const chartOptions = {
    title: {
      text: 'Sample Chart'
    },
    tooltip: {},
    xAxis: {
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {},
    series: [
      {
        name: 'Fake Data',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20, 30]
      }
    ]
  };
  return  <div>
  <Row gutter={16}>
    <Col span={8}>
      <Card>
        <Statistic
          title="Active Users"
          value={1128}
          valueStyle={{ color: '#3f8600' }}
          suffix="/ 2000"
        />
      </Card>
    </Col>
    <Col span={8}>
      <Card>
        <Statistic
          title="Bounce Rate"
          value={2.8}
          precision={2}
          valueStyle={{ color: '#cf1322' }}
          suffix="%"
        />
      </Card>
    </Col>
    <Col span={8}>
      <Card>
        <Statistic
          title="New Users"
          value={93}
          valueStyle={{ color: '#3f8600' }}
        />
      </Card>
    </Col>
  </Row>
  <Row gutter={16} style={{ marginTop: 16 }}>
    <Col span={24}>
      <Card title="Chart Example">
        <ReactECharts option={chartOptions} />
      </Card>
    </Col>
  </Row>
</div>
}

export default DashBoard


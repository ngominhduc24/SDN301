import React, { useState } from "react"
import { Card, Statistic, Row, Col, Select } from "antd"
import ReactECharts from "echarts-for-react"

const { Option } = Select

const DashBoard = () => {
  const [selectedShop, setSelectedShop] = useState("all")

  // Fake data for shops
  const data = {
    all: {
      activeUsers: 5000,
      bounceRate: 3.5,
      newUsers: 450,
      monthlyRevenue: [
        5000, 8000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000,
        15000,
      ],
      productRevenue: [
        { value: 5000, name: "Product A" },
        { value: 3000, name: "Product B" },
        { value: 2000, name: "Product C" },
        { value: 1500, name: "Product D" },
        { value: 1000, name: "Product E" },
      ],
      topProducts: [
        { name: "Product A", sales: 150 },
        { name: "Product B", sales: 120 },
        { name: "Product C", sales: 100 },
        { name: "Product D", sales: 90 },
        { name: "Product E", sales: 80 },
      ],
    },
    shop1: {
      activeUsers: 1128,
      bounceRate: 2.8,
      newUsers: 93,
      monthlyRevenue: [
        2000, 3000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000,
      ],
      productRevenue: [
        { value: 2000, name: "Product A" },
        { value: 1500, name: "Product B" },
        { value: 1000, name: "Product C" },
        { value: 500, name: "Product D" },
        { value: 300, name: "Product E" },
      ],
      topProducts: [
        { name: "Product A", sales: 100 },
        { name: "Product B", sales: 80 },
        { name: "Product C", sales: 60 },
        { name: "Product D", sales: 50 },
        { name: "Product E", sales: 40 },
      ],
    },
    shop2: {
      activeUsers: 2345,
      bounceRate: 4.2,
      newUsers: 150,
      monthlyRevenue: [
        3000, 4000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500, 8000,
      ],
      productRevenue: [
        { value: 3000, name: "Product A" },
        { value: 2000, name: "Product B" },
        { value: 1500, name: "Product C" },
        { value: 1000, name: "Product D" },
        { value: 500, name: "Product E" },
      ],
      topProducts: [
        { name: "Product A", sales: 120 },
        { name: "Product B", sales: 100 },
        { name: "Product C", sales: 80 },
        { name: "Product D", sales: 70 },
        { name: "Product E", sales: 60 },
      ],
    },
  }

  const handleShopChange = value => {
    setSelectedShop(value)
  }

  const lineChartOptions = {
    title: {
      text: "Doanh thu theo từng tháng",
    },
    tooltip: {},
    xAxis: {
      type: "category",
      data: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Doanh thu",
        type: "line",
        data: data[selectedShop].monthlyRevenue,
      },
    ],
  }

  const pieChartOptions = {
    title: {
      text: "Doanh thu theo sản phẩm",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        name: "Doanh thu",
        type: "pie",
        radius: "50%",
        data: data[selectedShop].productRevenue,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  }

  const barChartOptions = {
    title: {
      text: "Top 5 sản phẩm bán chạy nhất",
    },
    tooltip: {},
    xAxis: {
      type: "category",
      data: data[selectedShop].topProducts.map(product => product.name),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Sales",
        type: "bar",
        data: data[selectedShop].topProducts.map(product => product.sales),
      },
    ],
  }

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={8}>
          <Select
            showSearch
            placeholder="Select a shop or all"
            optionFilterProp="children"
            onChange={handleShopChange}
            style={{ width: "100%" }}
          >
            <Option value="all">All Shops</Option>
            <Option value="shop1">Shop 1</Option>
            <Option value="shop2">Shop 2</Option>
            {/* Add more shops as needed */}
          </Select>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Active Users"
              value={data[selectedShop].activeUsers}
              valueStyle={{ color: "#3f8600" }}
              suffix="/ 5000"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Bounce Rate"
              value={data[selectedShop].bounceRate}
              precision={2}
              valueStyle={{ color: "#cf1322" }}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="New Users"
              value={data[selectedShop].newUsers}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card>
            <ReactECharts option={lineChartOptions} />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card>
            <ReactECharts option={pieChartOptions} />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={12}>
          <Card>
            <ReactECharts option={barChartOptions} />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <ReactECharts option={barChartOptions} />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default DashBoard

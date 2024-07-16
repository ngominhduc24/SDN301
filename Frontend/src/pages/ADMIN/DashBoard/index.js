import React, { useEffect, useState } from "react"
import { Card, Statistic, Row, Col, Select, DatePicker, Progress, Avatar, Table } from "antd"
import ReactECharts from "echarts-for-react"
import AdminServices from "src/services/AdminService"

const { Option } = Select
const { MonthPicker } = DatePicker;

const DashBoard = () => {
  const [data, setData] = useState(null);
  const [shopId, setShopId] = useState(-1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  // Fake data for shops
  const getStatistics = async() => {
    try {
      const res = await AdminServices.getStatistics({
        shopId,
        year, month
      });
    setData(res)
    console.log("statistic: ", res);
    } catch (error) {
      console.log("error");
    }
    
  }

  useEffect(() => {
      getStatistics();
  }, [shopId, year, month]);

  const handleShopIdChange = value => {
    setShopId(value)
  }
  const handleMonthChange = (value) => {
    setMonth(value);
  };

  const handleYearChange = (value) => {
    setYear(value);
  };

  const lineChartOptions = {
    // title: {
    //   text: "Doanh thu theo từng ngày trong tháng",
    // },
    tooltip: {},
    xAxis: {
      type: "category",
      data: data?.revenueByDay.map(day => day.day) || [],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Doanh thu",
        type: "line",
        data: data?.revenueByDay.map(day => day.revenue) || []
        // data: data[selectedShop].totalRevenue,
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
        // data: data[shopId],
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
    // title: {
    //   text: "Top 5 cửa hàng có doanh thu cao nhất",
    // },
    tooltip: {},
    xAxis: {
      type: "category",
      data: data?.top5ShopsByRevenue.map(shop => shop.shopName) || [],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: 'Doanh thu',
        type: 'bar',
        data: data?.top5ShopsByRevenue.map((shop) => shop.totalRevenue) || [],
      }
    ]
  };
  const barChartOptions2 = {
    // title: {
    //   text: "Top 5 cửa hàng có doanh thu cao nhất",
    // },
    tooltip: {},
    xAxis: {
      type: "category",
      data: data?.bottom5ShopsByRevenue.map(shop => shop.shopName) || [],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: 'Doanh thu',
        type: 'bar',
        data: data?.bottom5ShopsByRevenue.map((shop) => shop.totalRevenue) || [],
      }
    ]
  };

  const bestSellingProducts = [
    {
      title: 'Product',
      dataIndex: 'productName',
      key: 'productName',
      render: (text, record) => (
        <>
          <Avatar src={record?.image} />
          <span style={{ marginLeft: 8 }}>{text}</span>
        </>
      ),
    },
    {
      title: 'Quantity Sold',
      dataIndex: 'totalQuantity',
      key: 'totalQuantity',
    },
    {
      title: 'Revenue (%)',
      dataIndex: 'percentage',
      key: 'percentage',
      render: (percentage) => (
        <Progress percent={percentage} type="line" strokeColor="blue" />
      ),
    },
  ];

  const leastSellingProducts = [
    {
      title: 'Product',
      dataIndex: 'productName',
      key: 'productName',
      render: (text, record) => (
        <>
          <Avatar src={record?.image} />
          <span style={{ marginLeft: 8 }}>{text}</span>
        </>
      ),
    },
    {
      title: 'Quantity Sold',
      dataIndex: 'totalQuantity',
      key: 'totalQuantity',
    },
    {
      title: 'Revenue (%)',
      dataIndex: 'percentage',
      key: 'percentage',
      render: (percentage) => (
        <Progress percent={percentage} type="line" strokeColor="blue" />
      ),
    },
  ];
  return  <div>
  {/* <Row gutter={16}>
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
  </Row> */}
  <Row gutter={16} style={{marginTop: 16}}>
    <Col span={24}>
    <Card>
      <Select defaultValue={shopId} style={{width: 200, marginBottom: 16}} onChange={handleShopIdChange}>
        <Option value={-1}>Tất cả cửa hàng</Option>
        <Option value={0}>Tổng kho</Option>
        <Option value={1}>Cửa hàng 1</Option>
      </Select>
      <Select defaultValue={month} style={{ width: 120, marginBottom: 16, marginLeft: 16 }} onChange={handleMonthChange}>
              {Array.from({ length: 12 }, (v, k) => (
                <Option key={k + 1} value={k + 1}>
                  Tháng {k + 1}
                </Option>
              ))}
            </Select>
            <Select defaultValue={year} style={{ width: 120, marginBottom: 16, marginLeft: 16 }} onChange={handleYearChange}>
              {Array.from({ length: 10 }, (v, k) => (
                <Option key={k + 2020} value={k + 2020}>
                  {k + 2020}
                </Option>
              ))}
            </Select>
    </Card>
    </Col>
  </Row>
  <Row gutter={16} style={{ marginTop: 16 }}>
    <Col span={12}>
      <Card title="Doanh thu theo từng ngày trong tháng">
        <ReactECharts option={lineChartOptions} />
      </Card>
    </Col>
    <Col span={9}>
    <Card title="Tỉ lệ đơn hàng bị hủy">
    <Progress type="circle" percent={data?.cancellationRate?.cancellationRate} strokeColor={"blue"}></Progress>
    </Card>
    </Col>
  </Row>
  <Row gutter={16}>
    <Col span={12}>
    <Card title="Top 5 cửa hàng doanh thu cao nhất">
    <ReactECharts option={barChartOptions}/>
    </Card>
    </Col>
    <Col span={12}>
    <Card title="Top 5 cửa hàng doanh thu thấp nhất">
    <ReactECharts option={barChartOptions2}/>
    </Card>
    </Col>
  </Row>
  <Row gutter={16}>
    <Col span={12}>
    <Table
      columns={bestSellingProducts}
      dataSource={data?.top5SellingProductsByQuantity || []}
      rowKey="prductId"
      pagination={false}
      title={() => 'Top 5 Sản Phẩm Bán Chạy Nhất'}
    /></Col>
    <Col span={12}>
    <Table
      columns={leastSellingProducts}
      dataSource={data?.least5SellingProductsByQuantity || []}
      rowKey="prductId"
      pagination={false}
      title={() => 'Top 5 Sản Phẩm Ít Lượt Mua Nhất'}
    />
    </Col>
  </Row>
</div>
}

export default DashBoard

import React, { useEffect, useState } from "react"
import {
  Card,
  Statistic,
  Row,
  Col,
  Select,
  DatePicker,
  Progress,
  Avatar,
  Table,
} from "antd"
import ReactECharts from "echarts-for-react"
import AdminServices from "src/services/AdminService"

const { Option } = Select
const { MonthPicker } = DatePicker

const DashBoard = () => {
  const [data, setData] = useState({
    revenueByDay: [],
    top5ShopsByRevenue: [],
    bottom5ShopsByRevenue: [],
    top5SellingProductsByQuantity: [],
    least5SellingProductsByQuantity: [],
    totalRevenue: 0,
    totalOrders: 0,
    totalOrderQuantity: 0,
    totalImportCost: 0,
    totalImportQuantity: 0,
    remainQuantity: 0,
    remainProductValue: 0,
  })
  const [listShop, setListShop] = useState([])
  const [shopId, setShopId] = useState("-1")
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  let barChartOptions = {}
  let barChartOptions2 = {}
  const getStatistics = async () => {
    try {
      const res = await AdminServices.getStatistics({
        shopId,
        year,
        month,
      })
      setData(res)
      console.log("statistic: ", res)
    } catch (error) {
      console.log("Error fetching statistics:", error)
    }
  }

  const getAllStores = async () => {
    try {
      const res = await AdminServices.getAllStores()
      console.log("Store list: ", res)
      setListShop([
        {
          _id: "-1",
          name: "Tất cả cửa hàng",
        },
        {
          _id: "0",
          name: "Tổng kho",
        },
        ...res.map(shop => ({
          _id: shop._id,
          name: shop.name,
        })),
      ])
    } catch (error) {
      console.log("Error fetching stores:", error)
    }
  }

  useEffect(() => {
    getStatistics()
    getAllStores()
  }, [shopId, year, month])

  const handleShopIdChange = value => {
    setShopId(value)
  }

  const handleMonthChange = value => {
    setMonth(value)
  }

  const handleYearChange = value => {
    setYear(value)
  }

  const lineChartOptions = {
    tooltip: {},
    xAxis: {
      type: "category",
      data: data.revenueByDay.map(day => day.day),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Doanh thu",
        type: "line",
        data: data.revenueByDay.map(day => day.revenue),
      },
    ],
  }
  if (shopId === "-1" || shopId === "0") {
    barChartOptions = {
      tooltip: {},
      xAxis: {
        type: "category",
        data: data.top5ShopsByRevenue.map(shop => shop.shopName),
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "Doanh thu",
          type: "bar",
          data: data.top5ShopsByRevenue.map(shop => shop.totalRevenue),
        },
      ],
    }

    barChartOptions2 = {
      tooltip: {},
      xAxis: {
        type: "category",
        data: data.bottom5ShopsByRevenue.map(shop => shop.shopName),
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "Doanh thu",
          type: "bar",
          data: data.bottom5ShopsByRevenue.map(shop => shop.totalRevenue),
        },
      ],
    }
  }

  const bestSellingProducts = [
    {
      title: "Product",
      dataIndex: "productName",
      key: "productName",
      render: (text, record) => (
        <>
          <Avatar src={record.image} />
          <span style={{ marginLeft: 8 }}>{text}</span>
        </>
      ),
    },
    {
      title: "Quantity Sold",
      dataIndex: "totalQuantity",
      key: "totalQuantity",
    },
    {
      title: "Revenue (%)",
      dataIndex: "percentage",
      key: "percentage",
      render: percentage => (
        <Progress percent={percentage} type="line" strokeColor="blue" />
      ),
    },
  ]

  const leastSellingProducts = [
    {
      title: "Product",
      dataIndex: "productName",
      key: "productName",
      render: (text, record) => (
        <>
          <Avatar src={record.image} />
          <span style={{ marginLeft: 8 }}>{text}</span>
        </>
      ),
    },
    {
      title: "Quantity Sold",
      dataIndex: "totalQuantity",
      key: "totalQuantity",
    },
    {
      title: "Revenue (%)",
      dataIndex: "percentage",
      key: "percentage",
      render: percentage => (
        <Progress percent={percentage} type="line" strokeColor="blue" />
      ),
    },
  ]

  return (
    <div>
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card>
            <Select
              defaultValue={shopId}
              style={{ width: 200, marginBottom: 16 }}
              onChange={handleShopIdChange}
            >
              {listShop.map(shop => (
                <Option key={shop._id} value={shop._id}>
                  {shop.name}
                </Option>
              ))}
            </Select>
            <Select
              defaultValue={month}
              style={{ width: 120, marginBottom: 16, marginLeft: 16 }}
              onChange={handleMonthChange}
            >
              {Array.from({ length: 12 }, (v, k) => (
                <Option key={k + 1} value={k + 1}>
                  Tháng {k + 1}
                </Option>
              ))}
            </Select>
            <Select
              defaultValue={year}
              style={{ width: 120, marginBottom: 16, marginLeft: 16 }}
              onChange={handleYearChange}
            >
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
        <Col span={8}>
          <Card title="Tổng doanh thu">
            <Statistic
              title="Doanh thu"
              value={data.totalRevenue}
              precision={2}
              prefix="$"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Tổng số đơn hàng">
            <Statistic title="Số đơn hàng" value={data.totalOrders} />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Tổng sản phẩm bán ra">
            <Statistic title="Sản phẩm" value={data.totalOrderQuantity} />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={8}>
          <Card title="Tổng chi phí nhập hàng">
            <Statistic
              title="Chi phí nhập hàng"
              value={data.totalImportCost}
              precision={2}
              prefix="$"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Lượng hàng nhập vào">
            <Statistic title="Lượng hàng" value={data.totalImportQuantity} />
          </Card>
        </Col>
        <Row gutter={16} style={{ marginTop: 16 }}>
          <Col span={24}>
            <Card title="Thông tin hàng tồn kho" className="flex">
              <Row gutter={16}>
                <Col span={12}>
                  <Statistic
                    title="Lượng hàng"
                    value={`${data.remainQuantity} ~`}
                  />
                </Col>
                <Col span={12}>
                  <Statistic title="Giá trị" value={data.remainProductValue} />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Row>
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={12}>
          <Card title="Doanh thu theo từng ngày trong tháng">
            <ReactECharts option={lineChartOptions} />
          </Card>
        </Col>
        <Col span={9}>
          <Card title="Tỉ lệ đơn hàng bị hủy">
            <Progress
              type="circle"
              percent={data.cancellationRate?.cancellationRate}
              strokeColor={"blue"}
            ></Progress>
          </Card>
        </Col>
      </Row>
      {(shopId === "-1" || shopId === "0") && (
        <Row gutter={16}>
          <Col span={12}>
            <Card title="Top 5 cửa hàng doanh thu cao nhất">
              {data.top5ShopsByRevenue.length > 0 ? (
                <ReactECharts option={barChartOptions} />
              ) : (
                <p>No data available</p>
              )}
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Top 5 cửa hàng doanh thu thấp nhất">
              {data.bottom5ShopsByRevenue.length > 0 ? (
                <ReactECharts option={barChartOptions2} />
              ) : (
                <p>No data available</p>
              )}
            </Card>
          </Col>
        </Row>
      )}
      <Row gutter={16}>
        <Col span={12}>
          <Table
            columns={bestSellingProducts}
            dataSource={data.top5SellingProductsByQuantity}
            rowKey="prductId"
            pagination={false}
            title={() => "Top 5 Sản Phẩm Bán Chạy Nhất"}
          />
        </Col>
        <Col span={12}>
          <Table
            columns={leastSellingProducts}
            dataSource={data.least5SellingProductsByQuantity}
            rowKey="prductId"
            pagination={false}
            title={() => "Top 5 Sản Phẩm Ít Lượt Mua Nhất"}
          />
        </Col>
      </Row>
    </div>
  )
}

export default DashBoard

import React from "react"
import { Col, Divider, Row, Tabs } from "antd"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import LayoutCommon from "src/components/Common/Layout"
import BookingService from "src/services/BookingService"
import moment from "moment"
import { TabsStyled } from "../styles"
import Confirmation from "./Confirmation"
import Result from "./Result"
import useWindowSize from "src/lib/useWindowSize"
const MeetConfirmation = ({ setLoading }) => {
  const { state } = useLocation()
  const isMobile = useWindowSize.isMobile() || false
  const [data, setData] = useState({})
  const [activeKey, setActiveKey] = useState(1)

  useEffect(() => {
    if (!!state?.BookingID) {
      getData(state?.BookingID)
    }
  }, [state])

  const getData = async BookingID => {
    try {
      setLoading(true)
      const resp = await BookingService.getIforConfirmCTH({
        BookingID: BookingID,
      })
      if (resp.isError) return
      setData(resp?.Object)
    } finally {
      setLoading(false)
    }
  }

  const items = [
    {
      label: `Xác nhận lịch họp`,
      key: 1,
      children: (
        <Confirmation
          setLoading={setLoading}
          data={data}
          BookingID={state?.BookingID}
          getData={() => getData(state?.BookingID)}
        />
      ),
    },
    {
      label: `Kết quả xác nhận lịch họp`,
      key: 2,
      children: <Result setLoading={setLoading} BookingID={state?.BookingID} />,
    },
  ]
  return (
    <>
      <Divider className="m-5 mb-12" />
      <div>
        <div className="mt-8 ml-5 mb-8">Bạn được mời tham gia họp:</div>
        <div>
          <Row>
            {/* <Col span={24}>Xác nhận lịch họp</Col> */}
            <Col span={8}>
              <div className="fw-600 box-infor">Chương trình họp:</div>
            </Col>
            <Col span={16}>
              <div className="box-infor">{data?.MeetingSchedule}</div>
            </Col>
            <Col span={8}>
              <div className="fw-600 box-infor">Đơn vị chuẩn bị:</div>
            </Col>
            <Col span={16}>
              <div className="box-infor">{data?.PreparationUnit}</div>
            </Col>
            <Col span={8}>
              <div className="fw-600 box-infor">Thời gian:</div>
            </Col>
            <Col span={16}>
              <div className="box-infor">
                {!!data?.StartDate
                  ? moment(data?.StartDate)?.format("DD/MM/YYYY HH:mm:ss")
                  : ""}{" "}
                -{" "}
                {!!data?.EndDate
                  ? moment(data?.EndDate)?.format("DD/MM/YYYY HH:mm:ss")
                  : ""}
              </div>
            </Col>
            <Col span={8}>
              <div className="fw-600 box-infor">Địa điểm: </div>
            </Col>
            <Col span={16}>
              <div className="box-infor">{data?.Address}</div>
            </Col>
            <Col span={8}>
              <div className="fw-600 box-infor">Thành phần họp: </div>
            </Col>
            <Col span={16}>
              <div className="box-infor">
                <div className="mt-0">- Chủ trì: {data?.Preside}</div>

                <div className="mt-8">- Thư ký: {data?.Secretary}</div>

                <div className="mt-8">
                  - Thành phần tham gia:
                  <span className="ml-5">
                    {!!data?.ListUser?.length &&
                      data?.ListUser?.map(item => item?.FullName)?.join()}
                  </span>
                </div>

                <div className="mt-8">
                  - Thành phần khác: {data?.OtherComponents}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div className="mt-12">
        <TabsStyled isMobile={isMobile} className="mt-0">
          <Tabs activeKey={activeKey} onChange={setActiveKey} items={items} />
        </TabsStyled>
      </div>
    </>
  )
}

export default MeetConfirmation

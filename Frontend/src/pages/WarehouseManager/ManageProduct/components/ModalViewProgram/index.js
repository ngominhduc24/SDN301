import { Col, Row } from "antd"
import moment from "moment"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import CB1 from "src/components/Modal/CB1"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import { SYSTEM_KEY } from "src/constants/constants"
import { getListComboByKey } from "src/lib/utils"
import InsertUpdateProgram from "../InsertUpdateProgram"

const ModalViewProgram = ({ open, onCancel, onOk, buttonShow }) => {
  const { listSystemKey } = useSelector(state => state.appGlobal)
  const { userInfo } = useSelector(state => state.appGlobal)
  const [bookings, setBookings] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [openInsertUpdateBooking, setOpenInsertUpdateBooking] = useState(false)
  const [pagination, setPagination] = useState({
    PageSize: 10,
    CurrentPage: 1,
    TextSearch: "",
    ApproveStatus: 0,
    Status: 0,
  })

  useEffect(() => {
    console.log(buttonShow)
  }, [pagination])
  const renderFooter = () => (
    <div className="lstBtn-right d-flex-end">
      {!!buttonShow?.IsUpdate && (
        <Button btntype="primary" onClick={() => handleInsertUpdateProgram()}>
          Chỉnh sửa
        </Button>
      )}
      {!!buttonShow?.IsDelete && (
        <Button
          btntype="primary"
          onClick={() => {
            showDeleteConfirmation(open)
          }}
        >
          Xóa
        </Button>
      )}
    </div>
  )

  const showDeleteConfirmation = record => {
    CB1({
      record,
      title: `Phòng họp đang có chương trình họp sắp hoặc đang diễn ra, bạn chắc chắn muốn xóa?`,
      icon: "warning-usb",
      okText: "Có",
      cancelText: "Không",
      onOk: async close => {
        // await handleDeleteBooking(record)
        close()
      },
    })
  }
  const handleInsertUpdateProgram = async () => {
    setOpenInsertUpdateBooking(true)
  }
  return (
    <CustomModal
      open={open}
      onCancel={onCancel}
      title="Chi tiết chương trình họp"
      width="70vw"
      footer={renderFooter()}
    >
      <div className="d-flex-center">
        <Row>
          <Col span={12}>
            <Row>
              <Col span={9}>
                <div className="mb-10">
                  <strong>Chương trình họp: </strong>
                </div>
              </Col>
              <Col span={15}>
                <div>{open?.MeetingSchedule}</div>
              </Col>
              <Col span={9}>
                <div className="mb-10">
                  <strong>Thời gian bắt đầu: </strong>
                </div>
              </Col>
              <Col span={15}>
                <div>{moment(open?.StartDate).format("DD/MM/YYYY HH:mm")}</div>
              </Col>
              <Col span={9}>
                <div className="mb-10">
                  <strong>Thời gian kết thúc: </strong>
                </div>
              </Col>
              <Col span={15}>
                <div>{moment(open?.EndDate).format("DD/MM/YYYY HH:mm")}</div>
              </Col>
              <Col span={9}>
                <div className="mb-10">
                  <strong>Thành phần khác: </strong>
                </div>
              </Col>
              <Col span={15}>
                <div>{open?.OtherComponents}</div>
              </Col>
              <Col span={9}>
                <div className="mb-10">
                  <strong>Đơn vị chuẩn bị: </strong>
                </div>
              </Col>
              <Col span={15}>
                <div>{open?.PreparationUnit}</div>
              </Col>
              <Col span={9}>
                <div className="mb-10">
                  <strong>Địa chỉ: </strong>
                </div>
              </Col>
              <Col span={15}>
                <div>{open?.Address}</div>
              </Col>
              <Col span={9}>
                <div className="mb-10">
                  <strong>Loại lịch họp: </strong>
                </div>
              </Col>
              <Col span={15}>
                <span>
                  {
                    getListComboByKey(
                      SYSTEM_KEY?.MEETING_TYPE,
                      listSystemKey,
                    ).find(i => i?.CodeValue === open?.MeetingType)?.Description
                  }
                </span>
              </Col>
            </Row>
          </Col>

          <Col span={12}>
            <Row>
              <Col span={9}>
                <div className="mb-10">
                  <strong>Người tạo: </strong>
                </div>
              </Col>
              <Col span={15}>
                <div>{userInfo?.FullName}</div>
              </Col>
              <Col span={9}>
                <div className="mb-10">
                  <strong>Loại phòng họp: </strong>
                </div>
              </Col>
              <Col span={15}>
                <span>
                  {
                    getListComboByKey(
                      SYSTEM_KEY?.ROOM_TYPE,
                      listSystemKey,
                    ).find(i => i?.CodeValue === open?.MeetRoomType)
                      ?.Description
                  }
                </span>
              </Col>
              <Col span={9}>
                <div className="mb-10">
                  <strong>Thiết bị: </strong>
                </div>
              </Col>
              <Col span={15}>
                <span>
                  {
                    getListComboByKey(
                      SYSTEM_KEY?.MEETING_DEVICE,
                      listSystemKey,
                    ).find(i => i?.CodeValue === open?.Device)?.Description
                  }
                </span>
              </Col>
              <Col span={9}>
                <div className="mb-10">
                  <strong>Hình thức họp: </strong>
                </div>
              </Col>
              <Col span={15}>
                <span>
                  {
                    getListComboByKey(
                      SYSTEM_KEY?.MEETING_FORM,
                      listSystemKey,
                    ).find(i => i?.CodeValue === open?.MeetingForm)?.Description
                  }
                </span>
              </Col>
              <Col span={9}>
                <div className="mb-10">
                  <strong>Trạng thái duyệt: </strong>
                </div>
              </Col>
              <Col span={15}>
                <span>
                  {
                    getListComboByKey(
                      SYSTEM_KEY?.BOOKING_STATUS_BROWSE,
                      listSystemKey,
                    ).find(i => i?.CodeValue === open?.ApproveStatus)
                      ?.Description
                  }
                </span>
              </Col>
              <Col span={9}>
                <div className="mb-10">
                  <strong>Trạng thái sử dụng: </strong>
                </div>
              </Col>
              <Col span={15}>
                <span
                  className={["no-color", "blue-text", "red"][open?.Status]}
                >
                  {
                    getListComboByKey(
                      SYSTEM_KEY?.BOOKING_STATUS,
                      listSystemKey,
                    ).find(i => i?.CodeValue === open?.Status)?.Description
                  }
                </span>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      {!!openInsertUpdateBooking && (
        <InsertUpdateProgram
          open={open}
          onOk={() => onOk()}
          onCancel={() => setOpenInsertUpdateBooking(false)}
        />
      )}
    </CustomModal>
  )
}

export default ModalViewProgram


import { Col, Row } from "antd"
import { useState } from "react"
import Button from "src/components/MyButton/Button"
import BookingService from "src/services/BookingService"
import AuthorizationConfirmation from "./AuthorizationConfirmation"
import InviteModal from "./InviteModal"
import moment from "moment"
import Notice from "src/components/Notice"

// Type
// 2: Đồng ý
// 3: không
// 4: Ủy quyền
// 5: Mời
const TypeTitle = [
  "",
  "",
  "Xác nhận tham gia họp thành công",
  "Xác nhận không tham gia họp thành công",
]
const Confirmation = ({ setLoading, BookingID, data, getData }) => {
  const [openModalAuthorization, setOpenModalAuthorization] = useState(false)
  const [openModalInvite, setOpenModalInvite] = useState(false)

  const confirm = async Type => {
    try {
      setLoading(true)
      const resp = await BookingService.confirmBooking({
        Type: Type,
        BookingID: BookingID,
      })
      if (resp.isError) return
      getData()
      Notice({ msg: TypeTitle[Type] })
    } finally {
      setLoading(false)
    }
  }
  return (
    <div>
      <Row>
        <Col span={8}>
          <div className="d-flex-start mb-8">
            <div className="fw-600 mr-8 no-wrap">Giấy mời:</div>
            <div className="">
              <a href={data?.FileUrl} target="_blank" rel="noreferrer">
                <i>{data?.FileName}</i>
              </a>
            </div>
          </div>
        </Col>
        <Col span={24}>
          <div className=" mb-8">
            Mời quý đại biểu xác nhận tham gia lịch họp
          </div>
        </Col>
        <Col span={24}>
          <div>
            <div
              className="mt-8"
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: "10px",
              }}
            >
              {!!(data?.Status === 1 || data?.Status === 2) && (
                <div style={{ flex: 1 }}>
                  <Button
                    style={{ width: "100%" }}
                    btntype="red"
                    onClick={e => {
                      confirm(3)
                    }}
                  >
                    Không tham gia
                  </Button>
                </div>
              )}
              <div style={{ flex: 1 }}>
                <Button
                  style={{ width: "100%" }}
                  btntype="primary"
                  onClick={e => setOpenModalInvite({ BookingID: BookingID })}
                >
                  Mời tham gia họp
                </Button>
              </div>
            </div>

            <div
              className="mt-8"
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: "10px",
              }}
            >
              {!!(data?.Status === 1 || data?.Status === 3) && (
                <div style={{ flex: 1 }}>
                  <Button
                    style={{ width: "100%" }}
                    btntype="primary"
                    onClick={() => {
                      setOpenModalAuthorization({ BookingID: BookingID })
                    }}
                  >
                    Ủy quyền
                  </Button>
                </div>
              )}

              {!!(data?.Status === 1 || data?.Status === 3) && (
                <div style={{ flex: 1 }}>
                  <Button
                    style={{ width: "100%" }}
                    btntype="primary"
                    onClick={e => {
                      confirm(2)
                    }}
                  >
                    Đồng ý tham gia
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Col>
        {!!(data?.Status === 2) && (
          <Col span={24}>
            <div
              className="p-24 d-flex-center mt-8 fw-600 "
              style={{ background: "#10b93e70" }}
            >
              Đại biểu đã xác nhận tham gia
            </div>
          </Col>
        )}
      </Row>

      {!!openModalAuthorization && (
        <AuthorizationConfirmation
          open={openModalAuthorization}
          onCancel={() => setOpenModalAuthorization(false)}
          onOk={() => getData()}
        />
      )}
      {!!openModalInvite && (
        <InviteModal
          open={openModalInvite}
          onCancel={() => setOpenModalInvite(false)}
          onOk={() => getData()}
        />
      )}
    </div>
  )
}

export default Confirmation

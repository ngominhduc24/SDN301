import { Col, Divider, Image, Row } from "antd"
import moment from "moment"
import { useEffect, useState } from "react"
import CB1 from "src/components/Modal/CB1"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import styled from "styled-components"
import ModalInsertUpdate from "./InsertUpdate"
import { FAILBACK } from "src/constants/constants"

const StyledUserDetail = styled.div`
  .img-user {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .account-name {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
  }
  .position {
    text-align: center;
  }
  .div-divider {
    display: flex;
    justify-content: center;
    align-items: center;
    .ant-divider-horizontal {
      width: 50%;
      min-width: 50%;
    }
  }
`

const UserDetail = ({ open, onCancel, onOk, data }) => {
  const [loading, setLoading] = useState(false)
  const [openInsert, setOpenInsert] = useState(false)

  useEffect(() => {
    // getUserDetail()
    console.log(data)
  }, [])

  const footer = (
    <div className="d-flex justify-content-flex-end">
      <Button
        loading={loading}
        btntype="primary"
        onClick={() => {
          setOpenInsert(data)
        }}
      >
        Sửa
      </Button>

      <Button
        loading={loading}
        onClick={() => {
          onCancel()
        }}
      >
        Đóng
      </Button>
    </div>
  )

  return (
    <CustomModal
      footer={footer}
      open={!!open}
      onCancel={onCancel}
      title="Chi tiết nhân viên"
    >
      <StyledUserDetail>
        <Row gutter={[20, 8]}>
          <Col span={10}>
            <Image
              src={data?.avatar || FAILBACK}
              fallback={FAILBACK}
              alt={"ảnh tài khoản"}
              className="img-user"
            />
          </Col>
          <Col span={14}>
            <Col span={24}>
              <div className="account-name">{data?.fullname || "N/A"}</div>
            </Col>
            <Col span={24}>
              <div className="mb-12 text-center ">
                <span className="fw-600 ">Nhóm quyền:</span>{" "}
                {data?.role || "N/A"}
              </div>
            </Col>
            <Col span={24} className="position">
              <div
                className="d-flex justify-content-center align-item-center"
                style={{ gap: 10 }}
              >
                <div>
                  <span className="fw-600">Trạng thái:</span>{" "}
                  {data?.status === "active"
                    ? "Đang hoạt động"
                    : "Không hoạt động"}
                </div>
              </div>
            </Col>
            <Col span={24}>
              <div className="div-divider">
                <Divider />
              </div>
            </Col>
            <Row>
              <Col span={12}>
                <div className="mb-12">
                  <span className="fw-600 ">Email:</span> {data?.email}
                </div>
              </Col>
              <Col span={12}>
                <div className="mb-12">
                  <span className="fw-600 ">Ngày sinh:</span>{" "}
                  {moment(data?.dob, "DD/MM/YYYY").format("DD/MM/YYYY")}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </StyledUserDetail>

      {!!openInsert && (
        <ModalInsertUpdate
          open={openInsert}
          detailInfo={data}
          onOk={() => {
            onOk()
            // getUserDetail()
          }}
          onCancel={() => {
            setOpenInsert(false)
          }}
        />
      )}
    </CustomModal>
  )
}

export default UserDetail

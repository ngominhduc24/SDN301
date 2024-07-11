import React from "react"
import { Modal, Row, Col } from "antd"

const ModalViewManager = ({ visible, onCancel, manager }) => {
  if (!manager) return null

  return (
    <Modal
      visible={visible}
      footer={null}
      onCancel={onCancel}
      title="Thông tin quản lý"
    >
      <Row>
        <Col span={12}>
          <p>
            <strong>Name:</strong> {manager.name}
          </p>
          <p>
            <strong>Email:</strong> {manager.email}
          </p>
          <p>
            <strong>Ngày sinh:</strong> {manager.dob}
          </p>
          <p>
            <strong>Trạng thái:</strong> {manager.status}
          </p>
          <p>
            <strong>Vai trò:</strong> {manager.role}
          </p>
        </Col>
        <Col span={12}>
          <img
            alt="avatar"
            style={{ width: "100%", borderRadius: "8px" }}
            src="https://via.placeholder.com/150"
          />
        </Col>
      </Row>
    </Modal>
  )
}

export default ModalViewManager


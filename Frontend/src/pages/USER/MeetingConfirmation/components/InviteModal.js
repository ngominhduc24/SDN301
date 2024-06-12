import { Col, Form, Input, Row, Select, TreeSelect } from "antd"
import React, { useEffect, useState } from "react"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import { convertTreeData, getListComboByKey } from "src/lib/utils"
import { convertTreeDataParticipants } from "src/pages/ADMIN/MeetingProgram/components/InsertUpdateProgram"
import BookingService from "src/services/BookingService"
import UserService from "src/services/UserService"
import styled from "styled-components"

export const TreeSelectStyled = styled(TreeSelect)`
  .ant-select-selector {
    border-top: transparent !important;
    border-left: transparent !important;
    border-right: transparent !important;
  }
`
const InviteModal = ({ open, onCancel, onOk }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const [participants, setParticipants] = useState([])

  const getParticipants = async () => {
    const treeData = []
    try {
      setLoading(true)
      const res = await UserService.getListDepartmentUser({
        SearchText: "",
      })
      if (res?.isError) return
      setParticipants(
        !!res?.Object?.Data.length
          ? convertTreeDataParticipants(
              res?.Object?.Data,
              false,
              "DepartmentID",
              "DepartmentName",
              "DepartmentParentID",
            )
          : [],
      )
      // res?.Object?.Data.forEach(item => {
      //   if (!!item?.UserInfoOutputList) {
      //     treeData.push({
      //       ...item,
      //       disabled: true,
      //       children: item?.UserInfoOutputList.map(i => ({
      //         title: i?.FullName,
      //         value: i?.UserID,
      //         key: i?.UserID,
      //         disabled: false,
      //       })),
      //     })
      //   } else treeData.push(item)
      // })
      // setParticipants(
      //   !!res?.Object?.Data.length
      //     ? convertTreeData(
      //         treeData,
      //         false,
      //         "DepartmentID",
      //         "DepartmentName",
      //         "DepartmentParentID",
      //       )
      //     : [],
      // )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getParticipants()
  }, [])

  const confirm = async () => {
    // Type
    // 2: Đồng ý
    // 3: không
    // 4: Ủy quyền
    // 5: Mời
    try {
      setLoading(true)
      const value = await form.validateFields()
      const resp = await BookingService.confirmBooking({
        ...value,
        Type: 5,
        BookingID: open?.BookingID,
      })
      if (resp.isError) return

      onCancel()
      onOk()
      Notice({ msg: "Mời tham gia họp thành công" })
    } finally {
      setLoading(false)
    }
  }
  return (
    <CustomModal
      title="Mời tham gia họp"
      open={open}
      onCancel={onCancel}
      footer={
        <div className="d-flex-center">
          <Button
            btntype="gray"
            onClick={() => {
              onCancel()
            }}
            loading={loading}
          >
            Đóng
          </Button>{" "}
          <Button
            btntype="primary"
            onClick={() => {
              confirm()
            }}
            loading={loading}
          >
            Xác nhận
          </Button>
        </div>
      }
    >
      <Form form={form} layout="vertical">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item
              name="UserID"
              label="Người ủy quyền"
              rules={[
                { required: true, message: "Thông tin không được để trống." },
              ]}
            >
              <TreeSelect
                treeData={participants}
                treeDefaultExpandAll={true}
                dropdownStyle={{ overflow: "hidden auto" }}
                virtual={false}
                mode="tag"
                placeholder="Thành phần tham gia"
                maxTagCount="responsive"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </CustomModal>
  )
}

export default InviteModal

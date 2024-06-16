import { useState } from "react"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import TableCustom from "src/components/Table/CustomTable"
import ModalInsertUpdateAttendance from "./ModalInsertUpdateAttendance"
import CB1 from "src/components/Modal/CB1"
import { Space } from "antd"
import ButtonCircle from "src/components/MyButton/ButtonCircle"

const ModalAttendance = ({
  open,
  onCancel,
  onOk,
  atendanceContents,
  ltUser,
  BookingID,
}) => {
  const [loading, setLoading] = useState(false)
  const [modalInsertUpdateAttendance, setModalInsertUpdateAttendanceContent] =
    useState(false)

  const column = [
    {
      title: "STT",
      width: 60,
      render: (_, record, index) => (
        <div className="text-center">{index + 1}</div>
      ),
    },
    {
      title: "Nội dung",
      dataIndex: "Content",
      width: 400,
      key: "Content",
    },
    {
      title: "Số đại biểu",
      dataIndex: "NumberDelegate",
      width: 100,
      key: "NumberDelegate",
    },
    {
      title: "Chức năng",
      width: 120,
      render: (_, record) => (
        <Space>
          {listBtn(record).map((i, idx) => (
            <ButtonCircle
              key={idx}
              title={i.name}
              iconName={i.icon}
              onClick={i.onClick}
            />
          ))}
        </Space>
      ),
    },
  ]

  const renderFooter = () => (
    <div className="lstBtn d-flex-end">
      <Button
        btntype="primary"
        className="ml-8 mt-12 mb-12"
        onClick={() => setModalInsertUpdateAttendanceContent(true)}
      >
        Thêm mới
      </Button>
      <Button
        btntype="third"
        className="ml-8 mt-12 mb-12"
        onClick={() => onCancel()}
      >
        Đóng
      </Button>
    </div>
  )

  const listBtn = record => [
    {
      name: "Chỉnh sửa",
      icon: "edit-green",
      onClick: () => setModalInsertUpdateAttendanceContent(record),
    },
    {
      name: "Xóa",
      icon: "delete-red-row",
      onClick: () =>
        CB1({
          record,
          title: `Bạn có chắc chắn xóa nội dung điểm danh này?`,
          icon: "warning-usb",
          okText: "Có",
          cancelText: "Không",
          onOk: async close => {
            // handleDeleteContent(record?.ContentID)
            close()
          },
        }),
    },
  ]

  return (
    <CustomModal
      open={open}
      onCancel={onCancel}
      onOk={onOk}
      title="Nội dung điểm danh"
      width="90vw"
      footer={renderFooter()}
    >
      <TableCustom
        isPrimary
        rowKey="BookingID"
        columns={column}
        textEmpty="Chưa có chương trình họp nào"
        dataSource={atendanceContents}
        // pagination={{
        //   hideOnSinglePage: atendanceContents.length <= 10,
        //   current: pagination?.CurrentPage,
        //   pageSize: pagination?.PageSize,
        //   responsive: true,
        //   total: total,
        //   locale: { items_per_page: "" },
        //   showSizeChanger: total > 10,
        //   onChange: (CurrentPage, PageSize) =>
        //     setPagination({
        //       ...pagination,
        //       CurrentPage,
        //       PageSize,
        //     }),
        // }}
      />

      {!!modalInsertUpdateAttendance && (
        <ModalInsertUpdateAttendance
          open={modalInsertUpdateAttendance}
          ltUser={ltUser}
          BookingID={BookingID}
          onOk={onOk}
          onCancel={() => setModalInsertUpdateAttendanceContent(false)}
        />
      )}
    </CustomModal>
  )
}

export default ModalAttendance


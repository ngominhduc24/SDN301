import { Col, Form, Row, Select, TimePicker } from "antd"
import FlDatePicker from "src/components/FloatingLabel/DatePicker"
import CustomModal from "src/components/Modal/CustomModal"
import { DisableBetweenDate, range } from "src/lib/dateFormatters"
import dayjs from "dayjs"
import TinyEditor from "src/components/TinyEditor"
import { useEffect, useState } from "react"
import Button from "src/components/MyButton/Button"

const { Option } = Select

const ModalInsertUpdateContent = ({ open, onOk, onCancel, documents }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!!open?.ContentID) {
      form.setFieldsValue({
        ...open,
        Date: dayjs(open?.Date),
        TimeValue: [dayjs(open?.StartDate), dayjs(open?.EndDate)],
        ltDocumentFolderID: !!open?.ltDocumentFolderID.length
          ? open?.ltDocumentFolderID.map(i => i?.DocumentFolderID)
          : [],
      })
    }
  }, [open])

  return (
    <CustomModal
      title="Thêm mới nội dung"
      open={open}
      onCancel={onCancel}
      onOk={onOk}
      footer={
        <div className="d-flex-end">
          <Button
            btntype="primary"
            loading={loading}
            // onClick={() => hanndeInsertUpdateContent()}
          >
            {!!open?.ContentID ? "Lưu" : "Thêm"}
          </Button>
          <Button
            btntype="third"
            className="ml-8 mt-12 mb-12"
            onClick={() => onCancel()}
          >
            Đóng
          </Button>
        </div>
      }
    >
      <Form form={form} layout="vertical">
        <Row gutter={[16, 8]}>
          <Col span={12}>
            <Form.Item
              name="Date"
              label="Ngày diễn ra:"
              rules={[
                { required: true, message: "Thông tin không được bỏ trống" },
              ]}
            >
              <FlDatePicker
                isRequired
                format="DD/MM/YYYY"
                disabledDate={current =>
                  DisableBetweenDate(
                    current,
                    dayjs(open?.StartDate),
                    dayjs(open?.EndDate),
                  )
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item shouldUpdate noStyle>
              {({ getFieldValue }) => {
                let date = getFieldValue("Date")
                return (
                  <Form.Item
                    name="TimeValue"
                    label="Giờ bắt đầu/Giờ kết thúc"
                    rules={[
                      {
                        required: true,
                        message: "Thông tin không được bỏ trống",
                      },
                    ]}
                  >
                    <TimePicker.RangePicker
                      disabled={!!date ? false : true}
                      disabledTime={() => {
                        if (
                          dayjs(date).format("DD/MM/YYYY") ===
                          dayjs(open?.StartDate).format("DD/MM/YYYY")
                        ) {
                          return {
                            disabledHours: () =>
                              range(0, 24).splice(
                                0,
                                dayjs(open?.StartDate)?.$H,
                              ),
                            // disabledMinutes: () =>
                            //   range(0, 60).splice(0, dayjs(open?.StartDate)?.$m),
                          }
                        } else if (
                          dayjs(date).format("DD/MM/YYYY") ===
                          dayjs(open?.EndDate).format("DD/MM/YYYY")
                        ) {
                          return {
                            disabledHours: () =>
                              range(0, 24).splice(0, dayjs(open?.EndDate)?.$H),
                            // disabledMinutes: () =>
                            //   range(0, 60).splice(0, dayjs(open?.EndDate)?.$m),
                          }
                        } else return {}
                      }}
                    />
                  </Form.Item>
                )
              }}
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="Content"
              label="Nội dung"
              trigger="onEditorChange"
              validateTrigger={["onEditorChange"]}
              rules={[
                { required: true, message: "Bạn phải nhập chương trình họp" },
              ]}
            >
              <TinyEditor setLoading={setLoading} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="ltDocumentFolderID"
              label="Tài liệu"
              rules={[
                { required: true, message: "Bạn phải nhập chương trình họp" },
              ]}
            >
              <Select
                mode="multiple"
                allowClear
                style={{
                  width: "100%",
                }}
              >
                {documents.map(
                  i =>
                    i?.Type === 1 && (
                      <Option
                        key={i?.DocumentFolderID}
                        value={i?.DocumentFolderID}
                      >
                        {i?.DocumentName}
                      </Option>
                    ),
                )}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </CustomModal>
  )
}

export default ModalInsertUpdateContent


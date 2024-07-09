import { Col, DatePicker, Form, Input, Row, Select, Upload } from "antd"
import { useEffect, useState } from "react"
import moment from "moment"
import "moment/locale/vi" // hoặc 'moment/locale/en' tương ứng với ngôn ngữ của bạn
import { useSelector } from "react-redux"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import Notice from "src/components/Notice"
import SpinCustom from "src/components/Spin"
import {
  getRegexEmail,
  getRegexMobile,
  getRegexPassword,
  getRegexUsername,
} from "src/lib/stringsUtils"
import { getListComboByKey, nest, normFile } from "src/lib/utils"
import styled from "styled-components"
import { ButtonUploadStyle } from "../styled"
import SvgIcon from "src/components/SvgIcon"
import dayjs from "dayjs"
import ManagerService from "src/services/ManagerService"

const Styled = styled.div`
  .ant-upload.ant-upload-select-picture-card {
    width: unset;
    height: unset;
    background-color: unset;
    border: unset;
  }
  .ant-upload-list {
    align-items: center;
    display: flex;
  }
`

const ModalInsertUpdate = ({ onOk, detailInfo, ...props }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (detailInfo && props?.open) getUserDetail()
  }, [detailInfo, props?.open])

  const getUserDetail = async () => {
    try {
      setLoading(true)
      const res = await ManagerService.getDetailStaff(detailInfo?._id)
      if (res?.isError) return

      form.setFieldsValue({
        ...res,
        // dob: dob,
        dob:
          res.dob && dayjs(res.dob, "DD/MM/YYYY").isValid()
            ? dayjs(res.dob, "DD/MM/YYYY")
            : null,
      })
    } finally {
      setLoading(false)
    }
  }

  const onContinue = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      let urlAvatar = ""
      if (values?.Avatar?.length && values?.Avatar[0]?.name) {
        const formData = new FormData()
        values?.Avatar?.map(img => formData.append("file", img?.originFileObj))
        // const resUpload = await FileService.uploadFile(formData)
        // urlAvatar = resUpload?.Object
      } else {
        if (!!values?.Avatar) urlAvatar = values?.Avatar[0]?.url
      }
      const res = detailInfo
        ? await ManagerService.updateStatusStaff(detailInfo?._id, { ...values })
        : await ManagerService.createStaff({
            ...values,
            dob: values.dob ? values.dob.format("DD/MM/YYYY") : null,
          })

      if (res?.isError) return
      onOk && onOk()
      Notice({
        msg: `${detailInfo ? "Cập nhật" : "Thêm"} nhân viên thành công !`,
      })
      props?.onCancel()
    } finally {
      setLoading(false)
    }
  }

  const renderFooter = () => (
    <div className={!!detailInfo ? "d-flex-sb" : "d-flex-end"}>
      {!detailInfo && (
        <Button btntype="primary" className="btn-hover-shadow mr-12 mb-12">
          Reset mật khẩu mặc định
        </Button>
      )}
      <Button
        btntype="primary"
        className="btn-hover-shadow mb-12"
        onClick={onContinue}
      >
        Ghi lại
      </Button>
    </div>
  )

  return (
    <CustomModal
      title={!!detailInfo ? "Cập nhật nhân viên" : "Thêm nhân viên"}
      footer={renderFooter()}
      width={1024}
      {...props}
    >
      <SpinCustom spinning={loading}>
        <Styled>
          <Form form={form} layout="vertical">
            <Row gutter={[16]} className="mr-12 ml-12 mt-12 mb-12">
              <Col span={24}>
                <Form.Item
                  label="Hình đại diện"
                  name="Avatar"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  rules={[
                    () => ({
                      validator(_, value) {
                        if (!!value?.find(i => i?.size > 5 * 1024 * 1024)) {
                          return Promise.reject(
                            new Error("Dung lượng file tối đa 5MB"),
                          )
                        }
                        return Promise.resolve()
                      },
                    }),
                  ]}
                >
                  <Upload
                    accept="image/*"
                    multiple={false}
                    maxCount={1}
                    beforeUpload={() => false}
                    listType="picture-card"
                  >
                    <Row className="align-items-center">
                      <ButtonUploadStyle>
                        <Button className="account-button-upload ">
                          <Row className="account-background-upload d-flex align-items-center">
                            <SvgIcon name="add-media-video" />
                            <div className="account-text-upload ml-16">
                              Chọn ảnh
                            </div>
                          </Row>
                        </Button>
                      </ButtonUploadStyle>
                      <div className="sub-color fs-12 ml-16">
                        Dung lượng file tối đa 5MB, định dạng: .JPG, .JPEG,
                        .PNG, .SVG
                      </div>
                    </Row>
                  </Upload>
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item
                  label="Họ và tên"
                  name="fullname"
                  rules={[
                    {
                      required: true,
                      message: "Thông tin không được để trống",
                    },
                  ]}
                >
                  <Input placeholder="Nhập tên" />
                </Form.Item>
              </Col>
              <Col md={12} xs={24}>
                <Form.Item
                  label="Tên tài khoản"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Thông tin không được để trống",
                    },
                    {
                      pattern: getRegexEmail(),
                      message:
                        "Tài khoản phải nhiều hơn 6 kí tự, bao gồm chữ số hoặc chữ cái hoặc kí tự _ và không chứa khoảng trắng",
                    },
                  ]}
                >
                  <Input placeholder="Nhập tên" disabled={!!detailInfo} />
                </Form.Item>
              </Col>
              {!!detailInfo?.UserID && (
                <Col md={12} xs={24}>
                  <Form.Item
                    label="Trạng thái"
                    name="Status"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Thông tin không được để trống",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Chọn trạng thái"
                      // options={}
                    />
                  </Form.Item>
                </Col>
              )}
              {!detailInfo ? (
                <>
                  <Col md={12} xs={24}>
                    <Form.Item
                      label="Mật khẩu mặc định"
                      required
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Thông tin không được để trống",
                        },
                        {
                          pattern: getRegexPassword(),
                          message:
                            "Mật khẩu có chứa ít nhất 8 ký tự, trong đó có ít nhất một số và bao gồm cả chữ thường và chữ hoa và ký tự đặc biệt, ví dụ @, #, ?, !.",
                        },
                      ]}
                    >
                      <Input placeholder="Nhập" />
                    </Form.Item>
                  </Col>
                </>
              ) : (
                <></>
              )}
              <Col md={8} xs={24}>
                <Form.Item
                  label="Tên thường gọi"
                  name="fullname"
                  rules={
                    [
                      // {
                      //   required: true,
                      //   message: "Thông tin không được để trống",
                      // },
                    ]
                  }
                >
                  <Input placeholder="Nhập tên" />
                </Form.Item>
              </Col>
              <Col md={8} xs={24}>
                <Form.Item
                  label="Số điện thoại"
                  name="PhoneNumber"
                  rules={[
                    {
                      required: true,
                      message: "Thông tin không được để trống",
                    },
                    {
                      pattern: getRegexMobile(),
                      message:
                        "Số điện thoại là chuỗi từ 8 đến 15 kí tự chữ số",
                    },
                  ]}
                >
                  <Input placeholder="Nhập" />
                </Form.Item>
              </Col>
              <Col md={8} xs={24}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    // {
                    //   required: true,
                    //   message: "Thông tin không được để trống",
                    // },
                    {
                      pattern: getRegexEmail(),
                      message: "Email sai định dạng",
                    },
                  ]}
                >
                  <Input placeholder="Nhập email" />
                </Form.Item>
              </Col>
              <Col md={6} xs={24}>
                <Form.Item
                  label="Giới tính"
                  name="Sex"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "Thông tin không được để trống",
                  //   },
                  // ]}
                >
                  <Select placeholder="Chọn" allowClear></Select>
                </Form.Item>
              </Col>
              <Col md={6} xs={24}>
                <Form.Item
                  label="Ngày sinh"
                  name="dob"
                  rules={[
                    // {
                    //   required: true,
                    //   message: "Thông tin không được để trống",
                    // },
                    () => ({
                      validator(_, value) {
                        if (!!value) {
                          const today = dayjs()
                          const birthDate = value
                          let age

                          if (today?.format("MM") > birthDate?.format("MM")) {
                            // Calculate the age of the user
                            age = today.diff(birthDate, "years") - 1
                          } else if (
                            today?.format("MM") === birthDate?.format("MM") &&
                            today?.format("DD") > birthDate?.format("DD")
                          ) {
                            age = today.diff(birthDate, "years") - 1
                          } else {
                            age = today.diff(birthDate, "years")
                          }

                          // Check if the age is 14 or more
                          if (age < 14) {
                            // The user is over 14 years old
                            return Promise.reject(
                              new Error("Ngày sinh chưa đủ 14 tuổi"),
                            )
                          } else {
                            // The user is under 14 years old
                            return Promise.resolve()
                          }
                        }
                        return Promise.resolve()
                      },
                    }),
                  ]}
                >
                  <DatePicker
                    placeholder="Chọn"
                    format="DD/MM/YYYY"
                    allowClear
                  />
                </Form.Item>
              </Col>
              <Col md={12} xs={24}>
                <Form.Item label="Địa chỉ" name="Address">
                  <Input placeholder="Nhập" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Styled>
      </SpinCustom>
    </CustomModal>
  )
}

export default ModalInsertUpdate


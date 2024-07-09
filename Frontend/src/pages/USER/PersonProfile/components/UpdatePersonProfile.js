import {
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  TreeSelect,
  Upload,
} from "antd"
import moment from "moment"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import Notice from "src/components/Notice"
import SpinCustom from "src/components/Spin"
import { GUIDE_EMPTY, SYSTEM_KEY } from "src/constants/constants"
import {
  getRegexEmail,
  getRegexMobile,
  getRegexPassword,
  getRegexUsername,
} from "src/lib/stringsUtils"
import { getListComboByKey, nest, normFile } from "src/lib/utils"
import styled from "styled-components"
import SvgIcon from "src/components/SvgIcon"
// import SelectAddress from "src/components/SelectAddress"
import { ButtonUploadStyle } from "src/components/Upload/styled"
import STORAGE, { getStorage } from "src/lib/storage"
import UserService from "src/services/UserService"
import dayjs from "dayjs"
const { Option } = Select
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
const ModalInsertUpdate = ({ onOk, ...props }) => {
  const { listSystemKey } = useSelector(state => state.appGlobal)
  const userID = getStorage(STORAGE.USER_ID);
  const [form] = Form.useForm()
  const [user, setUser] = useState({})
  const [listDept, setListDept] = useState([])
  const [listPosition, setListPosition] = useState([])
  const [listRole, setListRole] = useState([])
  const [regionCode, setRegionCode] = useState({})

  const [loading, setLoading] = useState(false)
  const listStatus = getListComboByKey("ACCOUNT_STATUS", listSystemKey)?.map(
    i => ({ ...i, label: i?.Description, value: i?.CodeValue }),
  )
  const defaultPass = listSystemKey?.find(
    i => i?.CodeKey === "DEFAULT_PASSWORD",
  )
  useEffect(() => {
    getUserDetail();
  }, [])

  // useEffect(() => {
  //   // getListSelect()
  //   // getListRole()
  //   // getListSelectSept()
  // }, [])

  const getUserDetail = async () => {
    try {
      setLoading(true)
      const res = await UserService.getUserById(userID)
      if (res?.isError) return

      const dob = res.dob && dayjs(res.dob, "DD/MM/YYYY").isValid() ? dayjs(res.dob, "DD/MM/YYYY") : null
      console.log("dayjs dob:", dob)
      form.setFieldsValue({
        FullName: res.fullname,
        PhoneNumber: res.phone,
        Email: res.email,
        Birthday: dob
      })
      console.log("res: ", res);
      setUser(res)
      console.log("user: ", user);
      const currentValues = form.getFieldsValue(["FullName", "PhoneNumber", "Email", "Birthday"]);
      console.log("Current form values: ", currentValues);
    } finally {
      setLoading(false)
    }
  }
  // const getUserDetail = async () => {
  //   try {
  //     setLoading(true)
  //     const res = await UserService.getInforUser()
  //     if (!res || res.isError || !res.Object) return // Add this check
  //     form.setFieldsValue({
  //       ...res.Object,
  //       Birthday: !!res.Object.Birthday && moment(res.Object.Birthday),
  //       DateParty: !!res.Object.DateParty && moment(res.Object.DateParty),
  //       RoleID: res?.Object?.ListRole?.[0]?.RoleID,
  //       Avatar: !!res.Object.Avatar ? [{ url: res.Object.Avatar }] : [],
  //       Sex: !!res.Object.Sex ? res.Object.Sex : undefined,

  //       MaccanType: !!res.Object.MaccanType
  //         ? +res.Object.MaccanType
  //         : undefined,
  //     })
  //     setRegionCode({
  //       ProvinceID: res.Object.ProvinceID,
  //       DistrictID: res.Object.DistrictID,
  //       WardID: res.Object.WardID,
  //     })
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // const getListSelect = async () => {
  //   try {
  //     setLoading(true)
  //     const resPostion = await PositionService.getAllPosition()
  //     if (!!resPostion?.isError) return
  //     setListPosition(resPostion?.Object)
  //   } finally {
  //     setLoading(false)
  //   }
  // }
  // const getListSelectSept = async () => {
  //   try {
  //     setLoading(true)
  //     const resDept = await Department.getAllDept()

  //     if (!!resDept?.isError) return
  //     setListDept(
  //       nest(resDept?.Object || [], GUIDE_EMPTY, "DepartmentParentID"),
  //     )
  //   } finally {
  //     setLoading(false)
  //   }
  // }
  // const getListRole = async () => {
  //   try {
  //     setLoading(true)
  //     const resRole = await RoleService.getAllForCombobox()
  //     if (!!resRole?.isError) return
  //     setListRole(resRole?.Object)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // const onContinue = async () => {
  //   try {
  //     setLoading(true)
  //     const values = await form.validateFields()
  //     let urlAvatar = ""
  //     if (values?.Avatar?.length && values?.Avatar[0]?.name) {
  //       const formData = new FormData()
  //       values?.Avatar?.map(img => formData.append("file", img?.originFileObj))
  //       const resUpload = await FileService.uploadFile(formData)
  //       urlAvatar = resUpload?.Object
  //     } else {
  //       if (!!values?.Avatar) urlAvatar = values?.Avatar[0]?.url
  //     }
  //     const res = await UserService.changeInfor({
  //       ...values,
  //       AccountType: 1,
  //       Position: values?.Position,
  //       Birthday: values?.Birthday ? values?.Birthday?.format() : undefined,
  //       DateParty: values?.DateParty ? values?.DateParty?.format() : undefined,
  //       UserCode: values?.UserName,
  //     })

  //     if (res?.isError) return
  //     onOk && onOk()
  //     Notice({
  //       msg: "Cập nhật thành công !",
  //     })
  //     props?.onCancel()
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  const onUpdateProfiile = async() => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const res = await UserService.updateProfile(userID, {
        fullname: values.FullName,
        phone: values.PhoneNumber,
        email: values.Email,
        dob: values.Birthday ? values.Birthday.format("DD/MM/YYYY") : null
      })
      console.log("response: ", res);
      if(!res?.isError){
        Notice({ isSuccess: true, msg: "Cập nhật thành công!" })
        onOk()
      }else{
        Notice({ isSuccess: false, msg: res?.message || "Cập nhật thất bại!" });
      }
    } catch (error) {
      const errorMessage = error.message || "Có lỗi xảy ra!"
      Notice({
        isSuccess: false,
        msg: errorMessage,
      })
    }finally{
      setLoading(false)
    }
  }

  const renderFooter = () => (
    <div className={"d-flex-sb"}>
      <Button
        btntype="primary"
        className="btn-hover-shadow"
        onClick={onUpdateProfiile}
      >
        Cập nhật
      </Button>
    </div>
  )
  return (
    <CustomModal
      title={"Cập nhật thông tin tài khoản"}
      footer={renderFooter()}
      width={1024}
      {...props}
    >
      <SpinCustom spinning={loading}>
        <Styled>
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              // Password: `${defaultPass?.Description}`,
              // PasswordConfirm: `${defaultPass?.Description}`,
              // ListUserManager: [
              //   {
              //     PositionID: undefined,
              //     DepartmentID: props?.open?.DepartmentID,
              //   },
              // ],
              PhoneNumber: user?.phone,
              Email: user?.email,
              Birthday: user?.dob
            }}
          >
            <Row gutter={[16]}>
              <Col md={24} xs={24}>
                <Form.Item
                  label="Họ và tên"
                  name="FullName"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "Thông tin không được để trống",
                  //   },
                  // ]}
                >
                  <Input placeholder="Nhập tên" />
                </Form.Item>
              </Col>

              {/* <Col md={12} xs={24}>
                <Form.Item
                  label="Tên tài khoản"
                  name="UserName"
                  rules={[
                    {
                      required: true,
                      message: "Thông tin không được để trống",
                    },
                    {
                      pattern: getRegexUsername(),
                      message:
                        "Tài khoản phải nhiều hơn 6 kí tự, bao gồm chữ số hoặc chữ cái hoặc kí tự _ và không chứa khoảng trắng",
                    },
                  ]}
                >
                  <Input placeholder="Nhập tên" disabled={true} />
                </Form.Item>
              </Col> */}
              {/* <Col md={8} xs={24}>
                <Form.Item
                  label="Tên thường gọi"
                  name="CommonNames"
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
              </Col> */}
              <Col md={8} xs={24}>
                <Form.Item
                  label="Số điện thoại"
                  name="PhoneNumber"
                  
                  rules={[
                    // {
                    //   required: true,
                    //   message: "Thông tin không được để trống",
                    // },
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
                  name="Email"
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

              {/* <Col md={6} xs={24}>
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
                  <Select placeholder="Chọn" allowClear>
                    {getListComboByKey(
                      SYSTEM_KEY?.SEX_TYPE,
                      listSystemKey,
                    )?.map(i => (
                      <Option key={+i?.CodeValue} value={+i?.CodeValue}>
                        {i?.Description}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col> */}
              {/* <Col md={6} xs={24}>
                <Form.Item
                  label="Tôn giáo"
                  name="Religion"
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
              </Col> */}
              <Col md={6} xs={24}>
                <Form.Item
                  label="Ngày sinh"
                  name="Birthday"
                  rules={[
                    // {
                    //   required: true,
                    //   message: "Thông tin không được để trống",
                    // },
                    // () => ({
                    //   validator(_, value) {
                    //     if (!!value) {
                    //       const today = dayjs()
                    //       const birthDate = dayjs(value, 'DD/MM/YYYY')
                    //       let age

                    //       if (today?.format("MM") > birthDate?.format("MM")) {
                    //         // Calculate the age of the user
                    //         age = today.diff(birthDate, "years") - 1
                    //       } else if (
                    //         today?.format("MM") === birthDate?.format("MM") &&
                    //         today?.format("DD") > birthDate?.format("DD")
                    //       ) {
                    //         age = today.diff(birthDate, "years") - 1
                    //       } else {
                    //         age = today.diff(birthDate, "years")
                    //       }

                    //       // Check if the age is 14 or more
                    //       if (age < 14) {
                    //         // The user is over 14 years old
                    //         return Promise.reject(
                    //           new Error("Ngày sinh chưa đủ 14 tuổi"),
                    //         )
                    //       } else {
                    //         // The user is under 14 years old
                    //         return Promise.resolve()
                    //       }
                    //     }
                    //     return Promise.resolve()
                    //   },
                    // }),
                  ]}
                >
                  <DatePicker
                    placeholder="Chọn"
                    format="DD/MM/YYYY"
                    allowClear
                    value={form.getFieldValue('Birthday')}
                    onChange={(date) => form.setFieldsValue({ Birthday: date })}
                  />
                </Form.Item>
              </Col>

              {/* <Col md={6} xs={24}>
                <Form.Item
                  label="Dân tộc"
                  name="Ethnic"
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
              </Col> */}
              {/* <div className="fw-600 mb-12 ml-8">Quê quán:</div> */}
              {/* <Col md={24} xs={24}> */}
                {/* <SelectAddress
                  floating={true}
                  form={form}
                  required={false}
                  // isGuest

                  initValue={regionCode}
                  listFormName={["ProvinceID", "DistrictID", "WardID"]}
                /> */}
              {/* </Col> */}

              {/* <Col span={24}>
                <Form.Item
                  label="Địa chỉ"
                  name="Address"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "Thông tin không được để trống",
                  //   },
                  // ]}
                >
                  <Input placeholder="Nhập" />
                </Form.Item>
              </Col> */}
              {/* <Col md={8} xs={24}>
                <Form.Item
                  label="Trình độ học vấn"
                  name="AcademicLevel"
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
                  label="Trình độ chính trị"
                  name="PoliticalLevel"
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
                  label="Trình độ chuyên môn"
                  name="Qualification"
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
                  label="Chức vụ"
                  name="Position"
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
                  label="Nơi làm việc"
                  name="Workplace"
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
                  label="Ngày vào đảng"
                  name="DateParty"
                  rules={
                    [
                      // {
                      //   required: true,
                      //   message: "Thông tin không được để trống",
                      // },
                    ]
                  }
                >
                  <DatePicker
                    placeholder="Chọn"
                    format="DD/MM/YYYY"
                    allowClear
                  />
                </Form.Item>
              </Col>

              <Col md={6} xs={24}>
                <Form.Item
                  label="Nơi ứng cử"
                  name="PlaceOfCandidacy"
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

              <Col md={6} xs={24}>
                <Form.Item
                  label="Đại biểu chuyên trách"
                  name="SpecializedRepresentative"
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

              <Col md={6} xs={24}>
                <Form.Item
                  label="Đại biểu hội đồng nhân dân"
                  name="PeopleCouncilDeputies"
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
              <Col md={6} xs={24}>
                <Form.Item
                  label="Loại đại biểu"
                  name="MaccanType"
                  rules={[
                    {
                      required: true,
                      message: "Thông tin không được để trống",
                    },
                  ]}
                >
                  <Select placeholder="Chọn" allowClear>
                    {getListComboByKey(
                      SYSTEM_KEY?.MACCAN_TYPE,
                      listSystemKey,
                    )?.map(i => (
                      <Option key={+i?.CodeValue} value={+i?.CodeValue}>
                        {i?.Description}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col> */}
            </Row>
            {/* <div className="form-list-custom">
              <Form.List name="ListUserManager">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }, idx) => (
                      <Row
                        gutter={[16, 16]}
                        className="mt-16"
                        key={`form-list${idx}`}
                      >
                        <Col flex="auto" style={{ width: 0 }}>
                          <Row gutter={[16, 16]}>
                            <Col span={24} style={{}}>
                              <Form.Item
                                {...restField}
                                name={[name, "DepartmentID"]}
                                label={!idx ? "Nhóm đại biểu" : undefined}
                                required
                                rules={[
                                  {
                                    required: true,
                                    message: "Thông tin không được để trống",
                                  },
                                ]}
                              >
                                <TreeSelect
                                  placeholder="Chọn"
                                  treeDefaultExpandAll
                                  showSearch
                                  treeNodeFilterProp="title"
                                  treeData={listDept}
                                />
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item
                                {...restField}
                                name={[name, "PositionID"]}
                                label={!idx ? "Chức vụ" : undefined}
                                rules={[
                                  {
                                    required: true,
                                    message: "Thông tin không được để trống",
                                  },
                                ]}
                              >
                                <Select
                                  placeholder="Chọn"
                                  allowClear
                                  showSearch
                                  filterOption={(input, option) =>
                                    option?.children
                                      ?.toLowerCase()
                                      ?.indexOf(input?.toLowerCase()) >= 0
                                  }
                                >
                                  {listPosition?.map(i => (
                                    <Option
                                      key={i?.PositionID}
                                      value={i?.PositionID}
                                      title={i?.PositionName}
                                    >
                                      {i?.PositionName}
                                    </Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            </Col>
                          </Row>
                        </Col>
                        <Col style={{ marginTop: !idx ? 30 : 0 }}>
                          <ButtonCircle
                            iconName={!idx ? "plus-circle" : "bin"}
                            title={!idx ? "Thêm" : "Xóa"}
                            onClick={() => (!idx ? add() : remove(name))}
                            style={{ background: !idx ? "#EDF6FC" : "#F7F7F7" }}
                          />
                        </Col>
                      </Row>
                    ))}
                  </>
                )}
              </Form.List>
            </div> */}
          </Form>
        </Styled>
      </SpinCustom>
    </CustomModal>
  )
}

export default ModalInsertUpdate


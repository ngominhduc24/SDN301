import { Col, Form, Row, Select } from "antd"
import FlDatePicker from "src/components/FloatingLabel/DatePicker"
import FlInput from "src/components/FloatingLabel/Input"
import FlSelect from "src/components/FloatingLabel/Select"
// import SelectAddress from "src/components/SelectAddress"
import {
  getRegexEmail,
  getRegexMobile,
  regexIDCard,
} from "src/lib/stringsUtils"
import dayjs from "dayjs"
const PersonRegister = ({ form, registerToOther }) => {
  return (
    <Row gutter={16}>
      <Col xs={24} md={12}>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Bạn chưa nhập trường này!",
            },
          ]}
          name="FullName"
        >
          <FlInput label="Họ tên" isRequired />
        </Form.Item>
      </Col>

      <Col xs={24} md={12}>
        <Form.Item name="Sex">
          <FlSelect style={{ width: "100%" }} label="Giới tính">
            <Select.Option value={1} key={1}>
              Nam
            </Select.Option>
            <Select.Option value={0} key={0}>
              Nữ
            </Select.Option>
          </FlSelect>
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Bạn chưa nhập trường này!",
            },
            {
              pattern: regexIDCard(),
              message: "Số căn cước công dân nhập sai định dạng!",
            },
          ]}
          name="Identification"
        >
          <FlInput label="Số CMT/CCCD" isRequired />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item
          name="Birthday"
          rules={[
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
          <FlDatePicker
            label="Ngày sinh"
            rules={[
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
          />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item
          name="PhoneNumber"
          rules={[
            { required: true, message: "Thông tin không được để trống" },
            {
              pattern: getRegexMobile(),
              message: "Số điện thoại là chuỗi từ 8 đến 15 kí tự chữ số",
            },
          ]}
        >
          <FlInput label="Số điện thoại" isRequired />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item
          name="Email"
          rules={[
            { required: true, message: "Thông tin không được để trống" },
            {
              pattern: getRegexEmail(),
              message: "Email sai định dạng",
            },
          ]}
        >
          <FlInput label="Email" isRequired />
        </Form.Item>
      </Col>
      <Col span={24}>
        {/* <SelectAddress
          floating={true}
          form={form}
          required={false}
          isGuest
          listFormName={["ProvinceID", "DistrictID", "WardID"]}
        /> */}
      </Col>
      <Col md={24}>
        <Form.Item name="Address">
          <FlInput label="Địa chỉ" />
        </Form.Item>
      </Col>
      {registerToOther && (
        <>
          <Col xs={24} md={12}>
            <Form.Item
              name="Certificate"
              rules={[
                { required: true, message: "Thông tin không được để trống" },
              ]}
            >
              <FlInput label="Số chứng chỉ" isRequired />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="OrganCode"
              rules={[
                { required: true, message: "Thông tin không được để trống" },
              ]}
            >
              <FlInput label="Mã tổ chức" isRequired />
            </Form.Item>
          </Col>
          <Col xs={24} md={24}>
            <Form.Item
              name="OrganName"
              rules={[
                { required: true, message: "Thông tin không được để trống" },
              ]}
            >
              <FlInput label="Tổ chức đại diện" isRequired />
            </Form.Item>
          </Col>
        </>
      )}
    </Row>
  )
}

export default PersonRegister


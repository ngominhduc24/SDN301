import { Col, Form, Row } from "antd"
import { useState } from "react"
import FlInput from "src/components/FloatingLabel/Input"
import Notice from "src/components/Notice"
// import SelectAddress from "src/components/SelectAddress"
import { getRegexEmail, getRegexMobile } from "src/lib/stringsUtils"
import AuthService from "src/services/AuthService"

const OrganizationRegister = ({ form, setLoading, registerToOther }) => {
  const [regionCode, setRegionCode] = useState({})
  const searchInfoByCode = async code => {
    if (!code) return
    try {
      setLoading(true)
      const res1 = await AuthService.getInfoByTaxCode(code)
      if (res1.data.code === "00") {
        const res2 = await AuthService.convertAddress({
          address: res1.data?.data?.address,
        })
        if (res2.isError) return
        setRegionCode({
          ProvinceID: res2?.Object?.ProvinceID,
          DistrictID: res2?.Object?.DistricID,
          WardID: res2?.Object?.WardID,
        })
        form.setFieldsValue({
          AccountName: res1.data?.data?.name,
          ...res2?.Object,
          DistrictID: res2?.Object?.DistricID,
          BusinessAddress: res2?.Object?.Address,
        })
      } else {
        Notice({
          isSuccess: false,
          msg: res1.data.desc,
        })
      }
    } finally {
      setLoading(false)
    }
  }
  return (
    <Row gutter={16}>
      <Col xs={24} md={12}>
        <Form.Item
          // rules={[
          //   {
          //     required: true,
          //     message: "Bạn chưa nhập trường này!",
          //   },
          // ]}
          name="TaxCode"
        >
          <FlInput
            label="Mã số thuế/Mã định danh"
            // isRequired
            search={true}
            enterbutton={"Lấy thông tin"}
            onSearch={searchInfoByCode}
          />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Bạn chưa nhập trường này!",
            },
          ]}
          name="AccountName"
        >
          <FlInput label="Tên tổ chức/doanh nghiệp" isRequired />
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
          <FlInput label="Email " isRequired />
        </Form.Item>
      </Col>
      <Col span={24}>
        {/* <SelectAddress
          floating={true}
          form={form}
          required={false}
          isGuest
          initValue={
            regionCode
              ? {
                  ProvinceID: regionCode?.ProvinceID,
                  DistrictID: regionCode?.DistrictID,
                  WardID: regionCode?.WardID,
                }
              : {}
          }
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
              name="OrganCode"
              rules={[
                { required: true, message: "Thông tin không được để trống" },
              ]}
            >
              <FlInput label="Mã tổ chức" isRequired />
            </Form.Item>
          </Col>
          {/* <Col xs={24} md={12}>
            <Form.Item
              name="OrganName"
              rules={[
                { required: true, message: "Thông tin không được để trống" },
              ]}
            >
              <FlInput label="Tên tổ chức" isRequired />
            </Form.Item>
          </Col> */}
          <Col xs={24} md={12}>
            <Form.Item name="ForeignName">
              <FlInput label="Tên giao dịch/Tên nước ngoài" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="ShortName">
              <FlInput label="Tên viết tắt" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="OfficeAddress"
              rules={[
                { required: true, message: "Thông tin không được để trống" },
              ]}
            >
              <FlInput label="Địa chỉ trụ sở" isRequired />
            </Form.Item>
          </Col>
          <Col xs={24} md={24}>
            <Form.Item name="BranchAddress">
              <FlInput label="Địa chỉ chi nhánh/ văn phòng đại diện..." />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="LegalRepresentative"
              rules={[
                { required: true, message: "Thông tin không được để trống" },
              ]}
            >
              <FlInput label="Đại diện theo pháp luật" isRequired />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="Fax"
              // rules={[
              //   { required: true, message: "Thông tin không được để trống" },
              // ]}
            >
              <FlInput label="Fax" />
            </Form.Item>
          </Col>
        </>
      )}
    </Row>
  )
}

export default OrganizationRegister


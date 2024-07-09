import { Col, Form, Row, Select, TimePicker } from "antd"
import FlDatePicker from "src/components/FloatingLabel/DatePicker"
import CustomModal from "src/components/Modal/CustomModal"
import { DisableBetweenDate, range } from "src/lib/dateFormatters"
import dayjs from "dayjs"
import TinyEditor from "src/components/TinyEditor"
import { useEffect, useState } from "react"
import Button from "src/components/MyButton/Button"
import AdminServices from "src/services/AdminService"
import Notice from "src/components/Notice"
import FormInsertUpdateProduct from "../FormInsertUpdateProduct"

const { Option } = Select

const ModalInsertUpdateProduct = ({onOk, onCancel, detailedInfo, ...props }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if(detailedInfo && props?.open){
      getProductDetail()
      console.log("detailed info: ", detailedInfo);
    }
  }, [detailedInfo, props?.open])
  useEffect(() => {
    console.log("data: ", detailedInfo);
  }, [])

  const getProductDetail = async() => {
    try {
      setLoading(true);
      const res = await AdminServices.getProductById(detailedInfo?._id)
      console.log("products detail res: ", res);
      if(res?.isError){
        return;
      }
      form.setFieldValue({
        ...res
      })
    } catch (error) {
      console.log("error");
    }finally{
      setLoading(false)
    }
  }

  const onContinue = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields();
      const res = detailedInfo ? await AdminServices.updateProducts(detailedInfo?._id, {...values}) : await AdminServices.addNewProduct({
        ...values
      })
      if(res?.isError) return
      onOk && onOk()
      Notice({
        msg: `${detailedInfo ? "Cập nhật" : "Thêm"} sản phẩm thành công!`
      })
      props?.onCancel()
    } catch (error) {
      console.log("error");
    }finally{
      setLoading(false);
    }
  }

  const renderFooter = () => (
    <div className={!!detailedInfo ? "d-flex-sb" : "d-flex-end"}>
      <Button btntype="primary" className="btn-hover-shadow" onClick={onContinue}>Ghi lại</Button>
      <Button
            btntype="third"
            className="ml-8 mt-12 mb-12"
            onClick={() => onCancel()}
          >
            Đóng
          </Button>
    </div>
  )
  return (
    <CustomModal
      title={!!detailedInfo ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới"}
      
      onCancel={onCancel}
      onOk={onOk}
      footer={
       renderFooter()
      }
      width={1024}
      {...props}
    >
       <FormInsertUpdateProduct form={form}/>
    </CustomModal>
  )
}

export default ModalInsertUpdateProduct


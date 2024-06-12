import { Checkbox, Form, Modal, Spin } from "antd"
import PropTypes from "prop-types"
import { useEffect, useState } from "react"
import Button from "src/components/MyButton/Button"

// import TableTextSample from 'containers/ProfileContainer/TableTextSample'

import styles from "./styles.module.scss"

export default function SignModal(props) {
  const { isOpen, onCancel, className } = props
  const [isLoading, setLoading] = useState(false)
  const [form] = Form.useForm()
  useEffect(() => {
    if (isOpen) form.setFieldsValue({ Status: true })
  }, [isOpen])

  const onFinish = () => {
    setLoading(true)
  }

  const renderFooter = () => (
    <div className="d-flex justify-content-flex-end u-mb-32 mr-8">
      <Button
        btntype="orange"
        htmlType="submit"
        form="signForm"
        className="ml-8"
        allowDisabled={isLoading}
      >
        Ký Hồ sơ
      </Button>
    </div>
  )

  return (
    <Modal
      width={918}
      visible={isOpen}
      destroyOnClose
      maskClosable={false}
      onCancel={onCancel}
      className={`modal-orange ${className} ${styles.titleFlexStart}`}
      maskTransitionName=""
      title="Ký Hồ sơ"
      footer={renderFooter()}
    >
      <SpinCustom size="small" spinning={isLoading}>
        {/* <TableTextSample detailInfo={detailInfo} themeDark /> */}
        <Form
          layout="vertical"
          requiredMark={false}
          form={form}
          name="formAddEdit"
          className={styles.form}
          onFinish={onFinish}
          id="signForm"
        >
          <Form.Item name="Status" className={styles.status}>
            <Checkbox className={styles.checkbox}>
              Tôi đã đọc và đồng ý với toàn bộ các Hợp đồng và Văn bản ở trên
            </Checkbox>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  )
}

SignModal.propTypes = {
  isOpen: PropTypes.bool,
  onCancel: PropTypes.func,
  className: PropTypes.string,
}

SignModal.defaultProps = {
  isOpen: false,

  onCancel: () => {},
  className: "",
}

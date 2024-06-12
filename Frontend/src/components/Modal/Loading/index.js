import { Modal } from "antd"
import React from "react"
import { useSelector } from "react-redux"
import SpinCustom from "src/components/Spin"
import styled from "styled-components"
const StyledModal = styled(Modal)`
  .ant-modal-content {
    background: transparent;
    box-shadow: unset;
  }
`
const ModalLoading = () => {
  const { modalLoading } = useSelector(state => state.common)

  return (
    <StyledModal
      open={modalLoading}
      title={null}
      footer={null}
      closable={false}
      destroyOnClose
      maskStyle={{ zIndex: 2000, backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      wrapClassName="loading-modal"
    >
      <SpinCustom spinning={true} />
    </StyledModal>
  )
}

export default ModalLoading

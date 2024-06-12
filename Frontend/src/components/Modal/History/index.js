import React, { useState, useEffect } from "react"

import HistoryTable from "src/components/Table/History"
import Button1 from "src/components/MyButton/Button"
import CustomModal from "src/components/Modal/CustomModal"

export default function HistoryModal(props) {
  const {
    isOpen,
    onClose,
    title,
    columnsHistory,
    rowKey,
    historyApi,
    detailInfo,
  } = props

  const [dataTable, setDataTable] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    isOpen && getHistory()
  }, [isOpen])

  const columnsCustom = [
    {
      title: <div className="text-center">STT</div>,
      dataIndex: "stt",
      width: 64,
      render: (val, record, idx) => {
        return <div className="text-center">{idx + 1}</div>
      },
    },
  ].concat(columnsHistory)

  const getHistory = () => {
    setLoading(true)
    if (!detailInfo.ObjectGuid) return
    historyApi.getListHistory(detailInfo.ObjectGuid).then(res => {
      setLoading(false)
      if (res.isError) return
      setDataTable(res.Object)
    })
  }

  return (
    <CustomModal
      title={title}
      visible={isOpen}
      footer={false}
      closable={false}
      width={970}
      onCancel={onClose}
      maskClosable={false}
    >
      <HistoryTable
        loading={loading}
        tableData={dataTable}
        columnsData={columnsCustom}
        rowKey={rowKey}
      />
      <div className={`d-flex mt-48 justify-content-flex-end`}>
        <Button1
          btntype="primary"
          onClick={() => {
            onClose()
          }}
        >
          Đóng
        </Button1>
      </div>
    </CustomModal>
  )
}

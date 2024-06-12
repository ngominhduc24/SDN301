import PropTypes from "prop-types"
import { useEffect, useState } from "react"

import { PAGINATION } from "src/constants/constants"
import { DATE_TIME_FORMAT_DD, formatDate } from "src/lib/dateFormatters"
import { generateRandomString } from "src/lib/stringsUtils"

import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import TableWithSimplePagination from "src/components/Table/TableWithSimplePagination"

import { TableTextWrapper } from "./styled"
import styles from "./styles.module.scss"
HistoryPaginationModal.propTypes = {
  detailInfo: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  onCancel: PropTypes.func,
}

HistoryPaginationModal.defaultProps = {
  onCancel: () => {},
  isOpen: false,
}

export default function HistoryPaginationModal(props) {
  const { isOpen, onCancel, detailInfo, title } = props

  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState(PAGINATION)
  const [dataTable, setDataTable] = useState([])

  const columns = [
    {
      title: <div className="text-center">STT</div>,
      dataIndex: "stt",
      width: 64,
      render: (val, record, idx) => {
        return (
          <div className="text-center">
            {idx + 1 + pagination.pageSize * (pagination.current - 1)}
          </div>
        )
      },
    },
    {
      title: "Thời gian",
      dataIndex: "createdDate",
      width: 140,
      render: val => {
        return formatDate(val, DATE_TIME_FORMAT_DD)
      },
    },
    {
      title: "Tài khoản thao tác",
      dataIndex: "account",
      width: 150,
    },
    {
      title: "Địa chỉ IP",
      dataIndex: "ip",
      width: 135,
    },
    {
      title: "Nhật ký xử lý",
      dataIndex: "logContent",
    },
  ]

  const getHistory = paginationProps => {
    const idObject = detailInfo.objectGuid

    if (!idObject) return
    setLoading(true)
  }

  useEffect(() => {
    isOpen && getHistory(pagination)
  }, [isOpen])

  const renderFooter = () => {
    return (
      <div className={styles.buttons}>
        <Button className="ml-3" btntype="primary" onClick={onCancel}>
          Đóng
        </Button>
      </div>
    )
  }

  return (
    <CustomModal
      title={title}
      visible={isOpen}
      onCancel={onCancel}
      footer={renderFooter()}
      closable
      destroyOnClose
      maskClosable={false}
      className="modal-history"
      width={918}
      tilteStart={false}
    >
      <TableTextWrapper className="p-3">
        <TableWithSimplePagination
          heightScroll="500px"
          columns={columns}
          dataSource={dataTable}
          loading={loading}
          bottomFade={false}
          paginationProps={
            pagination?.total > 10
              ? {
                  ...pagination,
                  onChange: (page, pageSize) => {
                    setPagination({
                      ...pagination,
                      current: page,
                      pageSize: pageSize,
                    })
                    const paginationProps = {
                      current: page,
                      pageSize: pageSize,
                    }
                    getHistory(paginationProps)
                  },
                }
              : false
          }
          widthScroll={"100%"}
          textEmpty="Danh sách lịch sử trống !"
          showPagination={pagination?.total > 10}
          footerLeft={<div className="d-flex mt-20"></div>}
          rowKey={() => generateRandomString()}
          tableLayout={"auto"}
          className="table-custom-1"
        />
      </TableTextWrapper>
    </CustomModal>
  )
}

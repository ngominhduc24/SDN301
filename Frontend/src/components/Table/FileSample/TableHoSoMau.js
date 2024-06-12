import React, { useState, useCallback, useRef } from 'react'
import { Table, Space, Tooltip } from 'antd'
import moment from 'moment'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper'

import { TableTextWrapper } from '../FileSample/styled'
import { renderButtonCircle } from '../../../containers/ProfileTypeContainer/index'
import ModalDelete from 'components/Modal/Delete'
import ModalPreview from 'containers/TextSampleContainer/ModalPreview'

import { WORDS } from 'constants/wordUtils'
import styles from '../FileSample/styles.module.scss'

import TextSampleApi from 'api/TextSampleApi'

const type = 'DraggableBodyRow'

const DraggableBodyRow = ({
  index,
  moveRow,
  className,
  style,
  ...restProps
}) => {
  const ref = useRef()
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: monitor => {
      const { index: dragIndex } = monitor.getItem() || {}
      if (dragIndex === index) {
        return {}
      }
      return {
        isOver: monitor.isOver(),
        dropClassName:
          dragIndex < index ? ' drop-over-downward' : ' drop-over-upward'
      }
    },
    drop: item => {
      moveRow(item.index, index)
    }
  })
  const [, drag] = useDrag({
    type,
    item: { index },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })
  drop(drag(ref))

  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ''}`}
      style={{ cursor: 'move', ...style }}
      {...restProps}
    />
  )
}

export default function TableHoSoMau(props) {
  const { setDataSource, dataSource, onUpdate } = props
  const [openDeleteModal, setOpenDeleteModal] = useState()
  const [loading, setLoading] = useState(false)
  const [base64, setBase64] = useState()

  const moveRow = useCallback(
    (dragIndex, hoverIndex) => {
      const dragRow = dataSource[dragIndex]
      setDataSource(
        update(dataSource, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow]
          ]
        })
      )
    },
    [dataSource]
  )

  const columns = [
    {
      title: WORDS.stt,
      dataIndex: 'id',
      key: 'id',
      width: 60,
      align: 'center',
      render: (val, record, idx) => {
        return <div className="">{idx + 1}</div>
      }
    },
    {
      title: 'Mã - Tên văn bản',
      dataIndex: 'textSampleName',
      key: 'textSampleName',
      render: (text, record, idx) => {
        return (
          <Tooltip
            title={
              <p>
                {record?.textSampleCode} - {text}
              </p>
            }
          >
            {record?.textSampleCode} - {text}
          </Tooltip>
        )
      }
    },
    {
      title: 'Version sử dụng',
      dataIndex: 'version',
      key: 'version',
      width: 200,
      render: (text, record, idx) => {
        return (
          <Tooltip
            title={
              <p>
                Version {text}
                <br />
                Ngày tạo: {moment(record?.createdDate).format(
                  'DD/MM/YYYY'
                )}{' '}
              </p>
            }
          >
            Version {text} (
            <i>{moment(record?.createdDate).format('DD/MM/YYYY')}</i>)
          </Tooltip>
        )
      }
    },
    {
      title: 'Số lượng vị trí chữ ký',
      dataIndex: 'quantityPositionSign',
      key: 'quantityPositionSign',
      align: 'center',
      width: 200
    },
    {
      title: 'Thao tác',
      dataIndex: 'id',
      key: 'id',
      width: 150,
      align: 'center',
      render: (text, record, idx) => {
        return renderListButton(record, idx)
      }
    }
  ]

  const handleDeleteTextSample = () => {
    setDataSource(e => e?.filter(item => openDeleteModal?.key !== item?.key))
    setOpenDeleteModal(undefined)
  }

  const viewVersion = record => {
    if (!record?.textSampleVerGuid) return
    setLoading(true)
    TextSampleApi?.viewVersion(record?.textSampleVerGuid)
      .then(res => {
        if (res?.isError) return
        setBase64(res?.object)
      })
      .finally(() => setLoading(false))
  }

  const renderListButton = (record, index) => {
    return (
      <Space>
        {/* {renderButtonCircle('Cập nhật Văn bản mẫu', 'edit', () => onUpdate(record), true)} */}

        {renderButtonCircle(
          'Xem nội dung Văn bản mẫu',
          'eye',
          () => viewVersion(record),
          true
        )}

        {/* {renderButtonCircle('Xóa Văn bản mẫu', 'bin', () => setOpenDeleteModal(record), true)} */}
      </Space>
    )
  }
  return (
    <>
      <TableTextWrapper className={styles.left} id={`tableTypeInsert`}>
        <DndProvider backend={HTML5Backend}>
          <Table
            loading={loading}
            // components={
            //   dataSource?.length > 1
            //     ? {
            //         body: {
            //           row: DraggableBodyRow
            //         }
            //       }
            //     : null
            // }
            // onRow={(record, index) => ({
            //   index,
            //   moveRow
            // })}
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            rowKey="key"
            tableLayout={'auto'}
            // scroll={{ y: 400 }}
          />
        </DndProvider>
      </TableTextWrapper>
      <ModalDelete
        isOpen={!!openDeleteModal}
        content={{
          title: (
            <>
              <div className="fw-600 text-center" style={{ fontSize: 16 }}>
                Bạn có chắc chắn muốn xóa văn bản mẫu này không?
              </div>
            </>
          )
        }}
        onOk={handleDeleteTextSample}
        onCancel={() => setOpenDeleteModal(undefined)}
      />
      <ModalPreview isOpen={base64} onCancel={() => setBase64('')} />
    </>
  )
}

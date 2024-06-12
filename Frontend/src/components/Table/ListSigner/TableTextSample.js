import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Table, Space } from 'antd'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper'

import { TableTextWrapper } from '../FileSample/styled'
import { renderButtonCircle } from '../../../containers/ProfileTypeContainer/index'
import ModalDelete from 'components/Modal/Delete'
import styles from '../FileSample/styles.module.scss'

import { WORDS } from 'constants/wordUtils'

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

export default function TableTextSample(props) {
  const { setDataSource, dataSource, listProfileType, onUpdate, unitName } =
    props

  const [openDeleteModal, setOpenDeleteModal] = useState()

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
        return <div className="my-2">{idx + 1}</div>
      }
    },
    {
      title: 'Mã đối tượng ký',
      dataIndex: 'code',
      key: 'code',
      width: 200
    },
    {
      title: <div>Loại đối tượng ký</div>,
      dataIndex: 'signerType',
      key: 'signerType',
      render: text => {
        if (text == 1) return `Đơn vị của tôi`
        return `Đối tác`
      },
      width: 200
    },
    {
      title: <div>Tên đối tượng ký</div>,
      dataIndex: 'signerName',
      key: 'signerName',
      render: text => {
        if (text == undefined) return `${unitName}`
        return text
      }
    },
    {
      title: 'Hình thức ký/Xác thực',
      dataIndex: 'typeSignId',
      key: 'typeSignId',
      width: 300,
      render: text => {
        return <div>{listProfileType?.find(j => text === j?.id)?.name}</div>
      }
    }
  ]

  const handleDeleteTextSample = () => {
    setDataSource(e => e?.filter(item => openDeleteModal?.key !== item?.key))
    setOpenDeleteModal(undefined)
  }

  const renderListButton = (record, index) => {
    return (
      <Space>
        {renderButtonCircle(
          'Cập nhật Đối tượng ký',
          'edit',
          () => onUpdate(record),
          true
        )}

        {/* {renderButtonCircle('Xóa Đối tượng ký', 'bin', () => setOpenDeleteModal(record), true)} */}
      </Space>
    )
  }
  return (
    <TableTextWrapper className={styles.left} id={`tableTypeInsert`}>
      <DndProvider backend={HTML5Backend}>
        <Table
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
        />
      </DndProvider>

      <ModalDelete
        isOpen={!!openDeleteModal}
        content={{
          title: (
            <>
              <div className="fw-600 text-center" style={{ fontSize: 16 }}>
                Bạn có chắc chắn muốn xóa Đối tượng ký này không?
              </div>
            </>
          )
        }}
        onOk={handleDeleteTextSample}
        onCancel={() => setOpenDeleteModal(undefined)}
      />
    </TableTextWrapper>
  )
}

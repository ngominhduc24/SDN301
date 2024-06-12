import { List } from "antd"
import { useEffect, useState } from "react"
import SpinCustom from "src/components/Spin"
import { TreeAnchorStyled } from "../styled"

const fakeData = [
  { DepartmentID: 1, DepartmentName: "Cửa hàng A" },
  { DepartmentID: 2, DepartmentName: "Cửa hàng B" },
  { DepartmentID: 3, DepartmentName: "Cửa hàng C" },
  { DepartmentID: 4, DepartmentName: "Cửa hàng D" },
]

const ListAnchor = ({ selectedNode, setSelectedNote }) => {
  const [loading, setLoading] = useState(false)
  const [listDept, setListDept] = useState([])

  useEffect(() => {
    // Simulate fetching data
    setLoading(true)
    setTimeout(() => {
      setListDept(fakeData)
      setSelectedNote(fakeData[0])
      setLoading(false)
    }, 1000)
  }, [setSelectedNote])

  return (
    <TreeAnchorStyled>
      <SpinCustom spinning={loading}>
        <div className="div-all">
          <div className="fs-16 fw-600 mt-0 mb-10">Danh sách cửa hàng</div>
        </div>
        {!!listDept?.length && (
          <List
            dataSource={listDept}
            renderItem={(item, idx) => (
              <List.Item key={idx} onClick={() => setSelectedNote(item)}>
                <List.Item.Meta
                  title={
                    <span className="max-line1">{item.DepartmentName}</span>
                  }
                />
              </List.Item>
            )}
          />
        )}
      </SpinCustom>
    </TreeAnchorStyled>
  )
}

export default ListAnchor


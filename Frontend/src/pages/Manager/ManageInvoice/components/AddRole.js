import React, { useEffect, useState } from "react"
import SpinCustom from "src/components/Spin"
import RoleService from "src/services/RoleService"
import { AddRoleStyled, RoleItemStyled } from "../styled"
import { Checkbox } from "antd"

const RoleItem = ({ item, listFunctionId, setListFunctionId }) => {
  const isCheckAll = () =>
    item?.ListItem?.every(i => listFunctionId?.find(j => j === i?.FunctionID))
  const isDisableAll = () => item?.ListItem?.every(i => i?.IsChecked)

  const onChange = e => {
    const { checked } = e?.target
    const listFunctionId = item?.ListItem?.map(i => i?.FunctionID)
    if (!checked)
      setListFunctionId(i =>
        i?.filter(j => !listFunctionId?.find(a => a === j)),
      )
    else
      setListFunctionId(i =>
        [...i, ...listFunctionId].filter(function (item, pos) {
          return [...i, ...listFunctionId].indexOf(item) == pos
        }),
      )
  }
  return (
    <RoleItemStyled>
      <div className="fw-600 mb-8">{item?.FunctionCategoryName}</div>
      <Checkbox
        disabled={isDisableAll()}
        checked={isCheckAll()}
        onChange={onChange}
      >
        Tất cả
      </Checkbox>
      <Checkbox.Group value={listFunctionId}>
        {item?.ListItem?.map(i => (
          <Checkbox
            disabled={i?.IsChecked}
            key={i?.FunctionID}
            value={i?.FunctionID}
            onChange={() =>
              setListFunctionId(pre =>
                pre?.find(j => j === i?.FunctionID)
                  ? pre?.filter(j => j !== i?.FunctionID)
                  : [...pre, i?.FunctionID],
              )
            }
          >
            {i?.FunctionName}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </RoleItemStyled>
  )
}
const AddRole = ({ id, listFunctionId, setListFunctionId }) => {
  const [listRole, setListRole] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (id) getListRoleById()
  }, [id])

  const getListRoleById = async () => {
    try {
      setLoading(true)
      const res = await RoleService.getByRoleId({ roleId: 1 })
      if (res?.isError) return
      setListRole(res?.Object?.ListRole)
      let listSelected = []
      res?.Object?.ListRole?.forEach(element => {
        element?.ListItem?.forEach(i => {
          if (i?.IsChecked) listSelected = [...listSelected, i?.FunctionID]
        })
      })
      setListFunctionId(listSelected)
    } finally {
      setLoading(false)
    }
  }
  return (
    <AddRoleStyled>
      <SpinCustom spinning={loading}>
        <div className="add-role-title">Chọn quyền</div>
        {listRole?.map(i => (
          <RoleItem
            key={i?.CategoryID}
            item={i}
            listFunctionId={listFunctionId}
            setListFunctionId={setListFunctionId}
          />
        ))}
      </SpinCustom>
    </AddRoleStyled>
  )
}

export default AddRole

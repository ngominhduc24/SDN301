import React, { useState, useEffect } from "react"
import { TreeSelect } from "antd"
import PropTypes from "prop-types"

import { generateRandomString } from "lib/stringsUtils"
import cn from "lib/classnames"

import { OPTION_ALL_VALUE, OPTION_ALL_LABEL } from "constants/constants"

import SvgIcon from "src/components/SvgIcon"
import styles from "./styles.module.scss"
import { TreeSelectWrapper } from "../styled"
import FloatingLabel from "../index"

TreeSelectLoadMore.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node,
  isRequired: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
}

TreeSelectLoadMore.defaultProps = {
  isRequired: false,
  children: null,
  className: "",
  onChange: null,
  onFocus: () => {},
  onBlur: () => {},
}

export default function TreeSelectLoadMore(props) {
  const {
    initSelectedVal,
    totalNode,
    treeData,
    label,
    isRequired,
    className,
    onChange,
    onFocus,
    onBlur,
    showOptionAll,
    bgcolor,
    hideLabel = false,
    value = undefined,
  } = props
  const treeProps = { ...props }
  delete treeProps.showOptionAll
  delete treeProps.isRequired
  delete treeProps.totalNode
  delete treeProps.initSelectedVal

  const [classLabel, setClassLabel] = useState("")
  const [classHover, setClassHover] = useState("")
  const [classError, setClassError] = useState("")
  const [isfocus, setIsFocus] = useState(false)

  const [selectedArray, setSelectedArray] = useState(initSelectedVal)

  let customTreeData = treeData

  if (showOptionAll)
    customTreeData = [
      {
        title: OPTION_ALL_LABEL,
        value: OPTION_ALL_VALUE,
        key: OPTION_ALL_VALUE,
        children: treeData,
      },
    ]

  const randomClass = generateRandomString()

  let rootNode = null
  function findRootNodeByVal(list = [], val = "") {
    list.forEach(item => {
      if (item.value === val) rootNode = item
      findRootNodeByVal(item.children, val)
    })
  }

  let childrenVal = []
  function findChildrenValByRootNode(list = []) {
    if (Array.isArray(list)) {
      list.forEach(item => {
        childrenVal.push(item.value)
        findChildrenValByRootNode(item.children)
      })
    }
  }

  useEffect(() => {
    const valueField = document.querySelector(
      `.h_select-tree_${randomClass} .ant-select-selection-item`,
    )
    if (valueField) {
      setClassLabel("selectHasValue")
    }
  }, [])

  useEffect(() => {
    const valueField = document.querySelector(
      `.h_select-tree_${randomClass} .ant-select-selection-item`,
    )
    if (!valueField) {
      setClassHover("")
    }
  })

  let tProps = {}
  if (totalNode) {
    if (selectedArray?.length === 0 || selectedArray?.length === totalNode) {
      tProps = {
        ...tProps,
        maxTagPlaceholder: OPTION_ALL_LABEL,
        maxTagCount: 0,
      }
    } else if (selectedArray.length > 10) {
      tProps = {
        ...tProps,
        maxTagPlaceholder: () => (
          <span
            style={{ width: 200 }}
          >{`${selectedArray.length}/${totalNode} ${label}`}</span>
        ),
        maxTagCount: 0,
      }
    }
  }
  if (customTreeData.length > 0)
    tProps = {
      ...tProps,
      treeDefaultExpandedKeys: [`${customTreeData[0].key}`],
    }

  return (
    <TreeSelectWrapper
      bgcolor={bgcolor}
      isfocus={isfocus}
      isAll={
        !selectedArray ||
        selectedArray.join() === "0" ||
        selectedArray.join() === "-1"
      }
      className={`${className} ${styles.fieldWrapper} h_select-tree_${randomClass} floating-label`}
    >
      <FloatingLabel
        bgcolor={bgcolor}
        label={!hideLabel && label}
        isRequired={isRequired}
      >
        <TreeSelect
          {...treeProps}
          treeDefaultExpandAll
          showSearch
          treeCheckable
          showArrow
          treeNodeFilterProp="title"
          showCheckedStrategy={TreeSelect.SHOW_PARENT}
          treeData={customTreeData}
          {...tProps}
          dropdownClassName="dropdown-tree-select"
          switcherIcon={<SvgIcon name="arrowDown" />}
          suffixIcon={<SvgIcon name="arrow-down" />}
          value={value ? value : selectedArray}
          onChange={(value, label, extra) => {
            setSelectedArray(value)
            onChange(value)
          }}
          onFocus={() => {
            setIsFocus(true)
            const valueField = document.querySelector(
              `.h_select-tree_${randomClass} .ant-select-selection-item`,
            )
            setClassLabel("labelFocus")
            if (valueField) {
              setClassError("")
            } else {
              setClassError("select-floating-error")
            }
            onFocus()
          }}
          onBlur={() => {
            setIsFocus(false)
            const valueField = document.querySelector(
              `.h_select-tree_${randomClass} .ant-select-selection-item`,
            )
            setClassError("")
            if (valueField) {
              setClassLabel("selectHasValue")
              setClassHover("select-floating")
            } else {
              setClassLabel("")
            }
            onBlur()
          }}
          className="tree-multi-select"
        />
      </FloatingLabel>
    </TreeSelectWrapper>
  )
}

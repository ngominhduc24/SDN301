/* eslint-disable react/no-unstable-nested-components */
import { TreeSelect } from "antd"
import PropTypes from "prop-types"
import { useState } from "react"

import { generateRandomString } from "src/lib/stringsUtils"

import { OPTION_ALL_LABEL, OPTION_ALL_VALUE } from "src/constants/constants"

import SvgIcon from "src/components/SvgIcon"
import FloatingLabel from "../index"
import { TreeSelectWrapper } from "../styled"
import styles from "./styles.module.scss"

export default function FlTreeSelectMulti(props) {
  const {
    initSelectedVal = [],
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

  let tProps = {}
  if (totalNode) {
    if (selectedArray?.length === 0 || selectedArray?.length === totalNode) {
      tProps = {
        ...tProps,
        maxTagPlaceholder: OPTION_ALL_LABEL,
        maxTagCount: 0,
      }
    } else if (selectedArray?.length > 10) {
      tProps = {
        ...tProps,
        maxTagPlaceholder: () => (
          <span
            style={{ width: 200 }}
          >{`${selectedArray?.length}/${totalNode} ${label}`}</span>
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
        value
          ? false
          : !selectedArray ||
            selectedArray?.join() === "0" ||
            selectedArray?.join() === "-1"
      }
      className={`${className} ${styles.fieldWrapper} h_select-tree_${randomClass} floating-label`}
    >
      <FloatingLabel
        bgcolor={bgcolor}
        label={!hideLabel && label}
        isRequired={isRequired}
      >
        <TreeSelect
          treeDefaultExpandAll
          showSearch
          treeCheckable
          showArrow
          // treeCheckStrictly
          treeNodeFilterProp="title"
          showCheckedStrategy={TreeSelect.SHOW_PARENT}
          treeData={customTreeData}
          {...treeProps}
          {...tProps}
          dropdownClassName="dropdown-tree-select"
          // switcherIcon={<SvgIcon name="arrowDown" />}
          suffixIcon={<SvgIcon name="arrow-down" />}
          value={value || selectedArray}
          onChange={value => {
            setSelectedArray(value)
            onChange(value)
          }}
          onFocus={() => {
            setIsFocus(true)

            onFocus()
          }}
          onBlur={() => {
            setIsFocus(false)

            onBlur()
          }}
          className="tree-multi-select"
        />
      </FloatingLabel>
    </TreeSelectWrapper>
  )
}

FlTreeSelectMulti.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node,
  isRequired: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
}

FlTreeSelectMulti.defaultProps = {
  isRequired: false,
  children: null,
  className: "",
  onChange: null,
  onFocus: () => {},
  onBlur: () => {},
}

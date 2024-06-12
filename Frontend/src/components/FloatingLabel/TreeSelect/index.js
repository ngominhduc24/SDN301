import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { TreeSelect } from "antd"

import { generateRandomString } from "src/lib/stringsUtils"
import cn from "src/lib/classnames"
import { TreeSelectStyled } from "./styled"
import { OPTION_ALL_VALUE, OPTION_ALL_LABEL } from "src/constants/constants"

import SvgIcon from "src/components/SvgIcon"
import styles from "./styles.module.scss"
import { TreeSelectWrapper } from "../styled"
import FloatingLabel from "src/components/FloatingLabelv2"

FlTreeSelect.propTypes = {
  styleLabel: PropTypes.object,
  label: PropTypes.string.isRequired,
  children: PropTypes.node,
  isRequired: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
}

FlTreeSelect.defaultProps = {
  isRequired: false,
  styleLabel: { background: "#fff", borderRadius: "4px" },
  children: null,
  className: "",
  onChange: null,
  onFocus: () => {},
  onBlur: () => {},
}

export default function FlTreeSelect(props) {
  const dataProps = { ...props }
  const {
    label,
    isRequired,
    className,
    onChange,
    onFocus,
    onBlur,
    value,
    showOptionAll,
    styleLabel,
    name,
    bgcolor,
  } = props
  const [classLabel, setClassLabel] = useState("")
  const [classHover, setClassHover] = useState("")
  const [classError, setClassError] = useState("")
  const [isFocusSelect, setIsFocusSelect] = useState(false)

  delete dataProps.label
  delete dataProps.styleLabel
  delete dataProps.className
  delete dataProps.isRequired
  delete dataProps.onChange
  delete dataProps.onFocus
  delete dataProps.onBlur
  delete dataProps.name
  delete dataProps.showOptionAll

  if (showOptionAll)
    dataProps.treeData = [
      {
        title: OPTION_ALL_LABEL,
        value: OPTION_ALL_VALUE,
        children: dataProps.treeData,
      },
    ]

  const randomClass = generateRandomString()

  useEffect(() => {
    const valueField = document.querySelector(
      `.h_select-tree_${randomClass} .ant-select-selection-item`,
    )
    if (valueField || props?.value) {
      setClassLabel("selectHasValue")
    }
  }, [props?.value])

  useEffect(() => {
    const valueField = document.querySelector(
      `.h_select-tree_${randomClass} .ant-select-selection-item`,
    )
    if (!valueField) {
      setClassHover("")
    }
  })

  return (
    <FloatingLabel
      isfocus={isFocusSelect}
      bgcolor={bgcolor}
      // label={label}
      isRequired={isRequired}
    >
      {/* <TreeSelectWrapper
        isfocus={isFocusSelect}
        className={`${className} ${styles.fieldWrapper} h_input_${randomClass} floating-label`}
      > */}
      <TreeSelectStyled
        className={`${className} ${styles.fieldWrapper} h_select-tree_${randomClass} floating-label`}
      >
        <TreeSelect
          {...dataProps}
          showSearch
          dropdownClassName="dropdown-tree-select"
          placeholder=" "
          // switcherIcon={<SvgIcon name="arrowDown" />}
          suffixIcon={<SvgIcon name="arrow-down" />}
          onChange={value => {
            if (value === undefined && showOptionAll) value = OPTION_ALL_VALUE
            if (!value && value !== 0) setClassLabel("")
            if (value || value === 0 || value === OPTION_ALL_VALUE)
              setClassLabel("labelFocus")
            onChange(value)
          }}
          onFocus={() => {
            const valueField = document.querySelector(
              `.h_select-tree_${randomClass} .ant-select-selection-item`,
            )
            setClassLabel("labelFocus")
            if (valueField) {
              setClassError("")
            } else {
              setClassError("select-floating-error")
            }
            setIsFocusSelect(true)
            onFocus()
          }}
          onBlur={() => {
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
        />
        {!!label && (
          <label
            className={cn("", {
              [styles[classLabel]]: !!classLabel,
              [classHover]: !!classHover,
              [classError]: !!setClassError,
            })}
          >
            <span style={styleLabel}>{label}</span>
            {isRequired && <span className="red-star">*</span>}
          </label>
        )}
      </TreeSelectStyled>
      {/* </TreeSelectWrapper> */}
    </FloatingLabel>
  )
}

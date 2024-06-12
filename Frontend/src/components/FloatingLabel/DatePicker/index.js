import { DatePicker } from "antd"
import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import SvgIcon from "src/components/SvgIcon"
import cn from "src/lib/classnames"
import { generateRandomString } from "src/lib/stringsUtils"
import styles from "./styles.module.scss"
import { Styled } from "./styled"
import { isArray } from "lodash"
import { useRef } from "react"

FlDatePicker.propTypes = {
  label: PropTypes.any.isRequired,
  isRequired: PropTypes.bool,
  borderbottomonly: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
}

FlDatePicker.defaultProps = {
  isRequired: false,
  className: "",
  onChange: null,
  onFocus: () => {},
  onBlur: () => {},
}

export default function FlDatePicker(props) {
  const dataProps = { ...props }
  const {
    label,
    isRequired,
    className,
    onChange,
    onFocus,
    onBlur,
    style,
    ranger,
    borderbottomonly = false,
  } = props
  const ref = useRef()
  const [classLabel, setClassLabel] = useState("")
  const [classHover, setClassHover] = useState("")
  const [classError, setClassError] = useState("")
  const [open, setOpen] = useState(false)

  delete dataProps.label
  delete dataProps.className
  delete dataProps.isRequired
  delete dataProps.onChange
  delete dataProps.onFocus
  delete dataProps.onBlur

  const randomClass = generateRandomString()

  useEffect(() => {
    const valueField = document?.querySelector(
      `.h_date-picker_${randomClass} .ant-picker-input input`,
    )
    if (
      valueField?.getAttribute("value") ||
      props?.value?.length ||
      props?.defaultValue?.length
    ) {
      setClassLabel("selectHasValue")
    }
  }, [])

  useEffect(() => {
    const valueField = document?.querySelector(
      `.h_date-picker_${randomClass} .ant-picker-input input`,
    )
    if (
      (isArray(props?.value) && props?.value?.length) ||
      (!isArray(props?.value) && props?.value) ||
      props?.defaultValue?.length
    ) {
      setClassLabel("selectHasValue")
    } else {
      valueField.setAttribute("value", "")
      setClassLabel("")
    }
  }, [props?.value])

  useEffect(() => {
    const valueField = document?.querySelector(
      `.h_date-picker_${randomClass} .ant-picker-input input`,
    )
    if (!valueField?.getAttribute("value")) {
      setClassHover("")
    }
  })

  return (
    <Styled
      className={`${className} ${
        styles.fieldWrapper
      } h_date-picker_${randomClass} floating-label
      ${borderbottomonly ? "border-bottom-only" : ""}
      `}
    >
      {React.createElement(ranger ? DatePicker.RangePicker : DatePicker, {
        onChange: value => {
          if (!value?.length) setClassLabel("")
          if (value) setClassLabel("labelFocus")
          onChange(value)
          setOpen(false)
        },
        ref: ref,
        open,
        format: "DD/MM/YYYY",
        placeholder: "",
        changeOnBlur: true,
        // onOpenChange: isOpen => {
        //   setClassLabel(isOpen ? "labelFocus" : "")
        //   props?.onOpenChange && props?.onOpenChange()
        // },
        onFocus: () => {
          const valueField = document.querySelector(
            `.h_date-picker_${randomClass} .ant-picker-input input`,
          )
          setClassHover("selectHasValue")
          setClassLabel("labelFocus")
          if (valueField.getAttribute("value")) {
            setClassError("")
          } else {
            setClassError("select-floating-error")
          }
          onFocus()
          setOpen(true)
        },
        onBlur: () => {
          const valueField = document.querySelector(
            `.h_date-picker_${randomClass} .ant-picker-input input`,
          )
          setClassError("")
          if (valueField.getAttribute("value") || props?.value?.length) {
            setClassLabel("selectHasValue")
            setClassHover("select-floating")
          } else {
            setClassLabel("")
          }
          onBlur()
          setOpen(false)
        },
        suffixIcon: <SvgIcon name="calendar" />,
        ...dataProps,
      })}

      {!!label?.length && (
        <label
          style={style}
          className={cn("", {
            [styles[classLabel]]: !!classLabel,
            [classHover]: !!classHover,
            [classError]: !!setClassError,
          })}
          onClick={() => ref?.current?.focus()}
        >
          {isArray(label) ? label[0] : label}
          {isRequired && <span className="red-star">*</span>}
        </label>
      )}
      {!!isArray(label) && label[1] && (
        <label
          style={{ ...style, left: `calc(50% + 10px)` }}
          className={cn("", {
            [styles[classLabel]]: !!classLabel,
            [classHover]: !!classHover,
            [classError]: !!setClassError,
          })}
          onClick={() => ref?.current?.focus()}
        >
          {isArray(label) ? label[1] : label}
          {isRequired && <span className="red-star">*</span>}
        </label>
      )}
    </Styled>
  )
}

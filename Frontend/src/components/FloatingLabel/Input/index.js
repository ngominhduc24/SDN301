/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import { Input, InputNumber } from "antd"
import PropTypes from "prop-types"
import { useEffect, useRef, useState } from "react"
import SvgIcon from "src/components/SvgIcon"
import { FlWrapper, Label, RedStar } from "../styled"
import styles from "./styles.module.scss"

function FlInput(props) {
  const {
    isanimate,
    label,
    disabled = false,
    isRequired,
    bgcolor,
    defaultValueInput,
    isPass,
    fixlabel = false,
    className,
    onFocus,
    onBlur,
    textArea = false,
    value,
    search = false,
    autoFocus = false,
    inputNum = false,
    borderbottomonly = false,
  } = props
  const FlRef = useRef(null)
  const inputRef = useRef(null)
  const [isFl, setFl] = useState(false)
  const [isfocus, setIsFocus] = useState(false)
  const dataProps = {
    ...props,
    search: !!search ? "true" : "false",
    fixlabel: !!fixlabel ? "true" : "false",
  }
  delete dataProps.label
  delete dataProps.className
  delete dataProps.defaultValueInput
  delete dataProps.isRequired
  delete dataProps.isanimate
  delete dataProps.isPass
  useEffect(() => {
    const inputDom =
      FlRef.current &&
      (FlRef.current.querySelector("input") ||
        FlRef.current.querySelector("textarea"))
    const valueEmptySelect =
      FlRef.current &&
      FlRef.current.querySelector(".ant-select-selection-placeholder")

    inputDom.addEventListener(
      "focus",
      () => {
        setFl(true)
      },
      false,
    )

    inputDom.onclick = () => {
      setFl(true)
    }

    inputDom.onblur = () => {
      const valueSelect =
        FlRef.current &&
        FlRef.current.querySelector(".ant-select-selection-item")
      const valueInput =
        inputDom.getAttribute("value") ||
        FlRef?.current?.querySelector("textarea")?.value
      setFl(!!valueSelect || !!valueInput)
    }

    if (valueEmptySelect) {
      setFl(false)
    }
    if (autoFocus) FlRef?.current?.focus()
    return () => {
      inputDom.removeEventListener(
        "focus",
        () => {
          setFl(true)
        },
        false,
      )
    }
  }, [])

  useEffect(() => {
    const inputDom =
      FlRef.current &&
      (FlRef.current.querySelector("input") ||
        FlRef.current.querySelector("textarea"))
    const valueSelection =
      FlRef.current && FlRef.current.querySelector(".ant-select-selection-item")
    const value = inputDom.getAttribute("value")

    setTimeout(() => {
      if (inputDom.getAttribute("value")) {
        setFl(true)
      }
    })

    if (valueSelection || value || document.activeElement === inputDom) {
      setFl(true)
    }
  })

  useEffect(() => {
    setFl(!!value)
  }, [value])

  const dataElement = { ...props }
  delete dataElement.label
  delete dataElement.isanimate
  delete dataElement.isRequired
  delete dataElement.bgcolor

  const ElementInput = textArea
    ? textArea
      ? Input.TextArea
      : Input
    : inputNum
    ? InputNumber
    : !!search
    ? Input.Search
    : Input

  return (
    <FlWrapper
      disabled={disabled}
      placeholder={dataProps?.placeholder}
      isfocus={isfocus}
      ref={FlRef}
      className={`${className} ${styles.fieldWrapper} ${
        borderbottomonly ? "border-bottom-only" : ""
      }`}
    >
      {!isPass && (
        <ElementInput
          ref={inputRef}
          enterbutton={<SvgIcon name="search-black" />}
          onFocus={() => {
            setIsFocus(true)
            onFocus && onFocus()
          }}
          onBlur={() => {
            setIsFocus(false)
            onBlur && onBlur()
          }}
          style={{ minHeight: 37, maxHeight: 120 }}
          className={`${styles.formControl}`}
          placeholder=" "
          defaultValue={defaultValueInput}
          // eslint-disable-next-line react/jsx-no-useless-fragment
          prefix={dataProps?.placeholder ? <></> : null}
          {...dataProps}
        />
      )}
      {isPass && (
        <Input.Password
          ref={inputRef}
          onFocus={() => {
            setIsFocus(true)
            onFocus && onFocus()
          }}
          onBlur={() => {
            setIsFocus(false)
            onBlur && onBlur()
          }}
          className={`d-flex ${styles.formControl}`}
          placeholder=" "
          defaultValue={defaultValueInput}
          {...dataProps}
        />
      )}
      {!!label && (
        <Label
          onClick={() => inputRef?.current?.focus()}
          bgcolor={
            disabled && !isfocus && !isFl && !fixlabel && !value
              ? "transparent"
              : bgcolor
          }
          isFl={dataProps?.placeholder || isFl || !!fixlabel || !!value}
          className="fl-label"
          style={{ color: disabled && "#A8B1BD" }}
        >
          {!!isanimate ? (!isFl ? label : "") : label}
          {isRequired && <RedStar>*</RedStar>}
        </Label>
      )}
    </FlWrapper>
  )
}

FlInput.propTypes = {
  label: PropTypes.string,
  bgcolor: PropTypes.string,
  isRequired: PropTypes.bool,
  fixlabel: PropTypes.bool,
  search: PropTypes.bool,
  children: PropTypes.node,
  isanimate: PropTypes.bool,
}

FlInput.defaultProps = {
  label: undefined,
  bgcolor: "white",
  isRequired: false,
  fixlabel: false,
  search: false,
  children: null,
  isanimate: false,
}

export default FlInput

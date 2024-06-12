import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { InputNumber } from 'antd'
import styles from './styles.module.scss'
import { generateRandomString } from 'src/lib/stringsUtils'
import cn from 'src/lib/classnames'

FLInputNumber.propTypes = {
  label: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  max: PropTypes.number
}

FLInputNumber.defaultProps = {
  isRequired: false,
  className: '',
  onChange: null,
  onFocus: () => {},
  onBlur: () => {},
  max: 24
}

export default function FLInputNumber(props) {
  const dataProps = { ...props }
  const { label, isRequired, defaultValue, className, onChange, onFocus, onBlur, max } = props
  const [classLabel, setClassLabel] = useState('')
  const [classHover, setClassHover] = useState('')
  const [classError, setClassError] = useState('')
  const [temperature, setTemperature] = useState(
    !!defaultValue && parseFloat(defaultValue) !== 0 ? parseFloat(defaultValue) : null
  )
  delete dataProps.label
  delete dataProps.className
  delete dataProps.isRequired
  delete dataProps.onChange
  delete dataProps.onFocus
  delete dataProps.onBlur

  const randomClass = generateRandomString()

  useEffect(() => {
    const valueField = document?.querySelector(`.h_input-pass_${randomClass} .ant-input-number-input-wrap input`)
    if (valueField?.value) setClassLabel('selectHasValue')
  }, [])

  useEffect(() => {
    const valueField = document?.querySelector(`.h_input-pass_${randomClass} .ant-input-number-input-wrap input`)
    if (!valueField?.value) setClassHover('')
  })

  useEffect(() => {
    handleNumber()
    const inputDom = document?.querySelector(`.${styles.formControl}`)
    inputDom && inputDom.addEventListener('keypress', handleNumber)
    return () => {
      inputDom && inputDom.removeEventListener('keypress', handleNumber)
    }
  }, [])

  const handleNumber = evt => {
    if (
      (evt?.which !== 8 && evt?.which !== 0 && evt?.which !== 13 && evt?.which !== 46 && evt?.which < 48) ||
      evt?.which > 57
    ) {
      evt.preventDefault()
    }
  }

  const stripNonDigits = value => {
    if (!value) return 0
    return value.toString().replace(/[^\d.]/g, '')
  }

  const parseNumberTemperature = (value, maxInputLength, isGreaterThanZero = false) => {
    if (!value) return value

    if (isGreaterThanZero && parseInt(value) === 0) {
      return null
    }

    const newInputValue = stripNonDigits(value)
    const formatTemp = newInputValue.toString().replace(/(\d{2})(?=(\d)+(?!\d))/g, '$1.')

    return maxInputLength ? formatTemp.slice(0, maxInputLength) : formatTemp
  }

  return (
    <div className={`${className} ${styles.fieldWrapper} h_input-pass_${randomClass} floating-label`}>
      <InputNumber
        type="number"
        {...dataProps}
        className={styles.formControl}
        value={temperature}
        size="large"
        onChange={value => {
          if (value && value < 0) {
            setTemperature(0)
            return
          }
          setTemperature(value)
          onChange(value)
        }}
        placeholder=""
        style={{ width: '100%' }}
        parser={value => parseNumberTemperature(value, max)}
        onFocus={() => {
          const valueField = document?.querySelector(`.h_input-pass_${randomClass} .ant-input-number-input-wrap input`)
          setClassLabel('labelFocus')
          if (valueField?.value) {
            setClassError('')
          } else {
            setClassError('select-floating-error')
          }
          onFocus()
        }}
        onBlur={value => {
          if (value && value < 0) {
            setTemperature(0)
            return
          }
          setTimeout(() => {
            const valueField = document?.querySelector(
              `.h_input-pass_${randomClass} .ant-input-number-input-wrap input`
            )
            setClassError('')
            if (valueField && valueField?.value) {
              setClassLabel('selectHasValue')
              setClassHover('select-floating')
            } else {
              setClassLabel('')
              setTemperature('')
            }
            onBlur()
          }, 100)
        }}
      />
      {!!label && (
        <label
          className={cn('', {
            [styles[classLabel]]: !!classLabel,
            [classHover]: !!classHover,
            [classError]: !!setClassError
          })}
        >
          {label}
          {isRequired && <span className={styles.redStar}>*</span>}
        </label>
      )}
    </div>
  )
}

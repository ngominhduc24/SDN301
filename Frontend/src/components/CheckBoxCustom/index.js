import { Checkbox } from "antd"
import { useEffect } from "react"
import { useState } from "react"

const CheckboxCustom = ({ children, ...props }) => {
  const { checkSingleValue, onChangeCustom, onChange, defaultValue } = props
  const [values, setValues] = useState([defaultValue])
  useEffect(() => {
    setValues([defaultValue])
  }, [defaultValue])

  const handleChange = e => {
    if (checkSingleValue) {
      if (e?.length > 1) {
        setValues([e[e?.length - 1]])
        !!onChangeCustom && onChangeCustom(e[e?.length - 1])
      } else {
        setValues(e)
        !!onChangeCustom && onChangeCustom(e[e?.length - 1])
      }
    } else {
      setValues(e)
    }
    if (onChange) onChange(e)
  }
  return (
    <Checkbox.Group
      style={{
        width: "100%",
      }}
      onChange={handleChange}
      value={values}
      {...props}
    >
      {children}
    </Checkbox.Group>
  )
}

export default CheckboxCustom

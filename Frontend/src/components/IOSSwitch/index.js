import React from "react"
import Switch from "@mui/material/Switch" // Assuming you are using Material-UI Switch

const IOSSwitch = ({ checked, onChange }) => {
  return (
    <Switch
      sx={{ m: 1 }}
      checked={checked}
      onChange={onChange}
      inputProps={{ "aria-label": "controlled" }}
    />
  )
}

export default IOSSwitch

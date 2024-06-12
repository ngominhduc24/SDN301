import React from "react"

const Anonymous = props => {
  return (
    <div
      className="w-100 body-cl "
      style={{ minHeight: "calc(-89px + 100vh)" }}
    >
      {props?.children}
    </div>
  )
}

export default Anonymous

import React, { useEffect, useRef, useState } from 'react'
import { Table } from 'antd'

import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'

export default function TableOverlayScroll(props) {
  const inputEl = useRef(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let osInstance = inputEl.current.osInstance()
    osInstance.scroll({ y: scrollY })
  })
  const antTableHeader = document.querySelector('.ant-table-header')

  const handleScroll = (e) => {
    antTableHeader.scrollLeft = e?.target?.scrollLeft
  }

  const components = {
    table: ({ children, ...restProps }) => (
      <OverlayScrollbarsComponent
        ref={inputEl}
        options={{
          scrollbars: { autoHide: 'l' },
          callbacks: {
            onScrollStop: (e) => {
              let target = e.target
              let bottomFade = document.querySelector(`.bottom-fade-table`)
              if (target.scrollHeight === target.scrollTop + target.offsetHeight) bottomFade.style.display = 'none'
              else bottomFade.style.display = 'block'
              setScrollY(target.scrollTop)
            },
            onScroll: handleScroll,
          },
        }}
      >
        <table {...restProps}>{children}</table>
      </OverlayScrollbarsComponent>
    ),
  }

  return <Table components={components} {...props} />
}

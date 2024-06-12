import { Table } from "antd"
import { isEmpty } from "lodash"
import { useContext, useEffect } from "react"
import LoadingOverlay from "src/components/LoadingOverlay"
import SimplePagination from "src/components/SimplePagination"
import cn from "src/lib/classnames"
import { StoreContext } from "src/lib/store"
import styles from "./styles.module.scss"

TableWithSimplePagination.defaultProps = {
  bottomFade: true,
  widthScroll: 900,
  showPagination: true,
}

export default function TableWithSimplePagination(props) {
  const {
    paginationProps,
    columns,
    footerLeft,
    dataSource,
    bottomFade,
    className,
    widthScroll,
    heightScroll,
    showPagination,
    loading,
    textEmpty,
  } = props

  const { ucStore } = useContext(StoreContext)
  const [ucObj] = ucStore

  useEffect(() => {
    const info = document.querySelector(`.ant-table-body`)
    const bottomFade = document.querySelector(`.bottom-fade-table`)

    if (info && bottomFade) {
      info.onscroll = e => {
        if (
          e.target.scrollHeight - e.target.clientHeight ===
          Math.round(e.target.scrollTop)
        )
          bottomFade.style.display = "none"
        else bottomFade.style.display = "block"
      }
    }
  }, [])

  const tableLoading = {
    spinning: typeof loading === "undefined" ? false : loading,
    indicator: <LoadingOverlay isLoadingTable />,
  }

  return (
    <div
      className={cn(styles.left, {
        [styles.padding]: !!showPagination,
      })}
    >
      <div
        className={cn("table-pagination", {
          [styles.tableNonPag]: !showPagination,
        })}
      >
        <div className="table-fade">
          <Table
            {...props}
            className={`table-checkbox-custom ${className} theme-${ucObj?.theme?.color} ant-table-header`}
            columns={columns}
            locale={{ emptyText: textEmpty }}
            dataSource={dataSource}
            pagination={false}
            scroll={
              dataSource
                ? { y: heightScroll || "100%", x: widthScroll || "100%" }
                : {}
            }
            loading={tableLoading}
          />
          {bottomFade && !isEmpty(dataSource) && (
            <div className="bottom-fade-table" />
          )}

          {showPagination && (
            <div className="footer-table-custom">
              {footerLeft}
              {!isEmpty(dataSource) && paginationProps?.total > 10 && (
                <SimplePagination {...paginationProps} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

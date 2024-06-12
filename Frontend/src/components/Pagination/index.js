import { Affix, Pagination, Select } from "antd"
import { PaginationStyled } from "./styled"

const PaginationCustom = ({
  option,
  left = 22,
  right = 23,
  bottom = -8,
  zIndex = 10,
  disabled = false,
}) => {
  const {
    total,
    current,
    pageSize = 20,
    showSizeChanger = true,
    simple = true,
    onChange,
    hideOnSinglePage = false,
    pageSizeOptions = ["10", "20", "50", "100"],
  } = option
  return (
    // <Affix
    //   offsetTop={"calc(100vh - 50px)"}
    //   offsetBottom={0}
    //   target={() => document.getElementById("root")}
    // >
    <PaginationStyled style={{ left, right, bottom, zIndex }}>
      {!hideOnSinglePage ? (
        <>
          {showSizeChanger && (
            <Select
              value={+pageSize}
              onChange={value => onChange(1, value)}
              style={{ width: 70, marginRight: 12 }}
              disabled={disabled}
            >
              {pageSizeOptions.map(i => (
                <Select.Option value={+i}>{i}</Select.Option>
              ))}
            </Select>
          )}
          <Pagination
            disabled={disabled}
            simple={simple}
            current={current}
            total={total}
            pageSize={pageSize}
            responsive={true}
            onChange={(CurrentPage, PageSize) =>
              onChange(CurrentPage, PageSize)
            }
          />
        </>
      ) : (
        <div style={{ height: 40 }} />
      )}
    </PaginationStyled>
    // </Affix>
  )
}

export default PaginationCustom

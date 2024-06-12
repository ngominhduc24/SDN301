import { Table, Empty, ConfigProvider } from "antd"
import { TableCustomStyled } from "./styled"
import modeStyle from "./modeStyle"

function TableCustom(props) {
  const { mode = "isPrimary", ...rest } = props
  return (
    <TableCustomStyled>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              ...modeStyle[mode],
              headerBg: "var(--color-primary)",
              headerColor: "#fff",
              headerBorderRadius: 8,
            },
          },
        }}
      >
        <Table
          bordered
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={props?.textEmpty}
              />
            ),
          }}
          scroll={props?.dataSource ? { x: "100%" } : {}}
          {...rest}
        />
      </ConfigProvider>
    </TableCustomStyled>
  )
}

export default TableCustom

export const SELECTION_COLUMN = Table.SELECTION_COLUMN

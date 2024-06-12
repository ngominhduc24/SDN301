import { Table, Empty } from "antd"
import { TableCustomStyled } from "./styled"

function TableCustom(props) {
  return (
    <TableCustomStyled
      isPrimary={props?.isPrimary}
      showPagination={props?.showPagination}
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
        {...props}
      />
    </TableCustomStyled>
  )
}

export default TableCustom

export const SELECTION_COLUMN = Table.SELECTION_COLUMN

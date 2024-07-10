import { useState } from "react"
import { useSelector } from "react-redux"
import { Row, Col, Select } from "antd"
import FlInput from "src/components/FloatingLabel/Input"
import Button from "src/components/MyButton/Button"
import FadeIn from "react-fade-in/lib/FadeIn"
import FlSelect from "src/components/FloatingLabel/Select"

const { Option } = Select

const SearchAndFilter = ({ pagination, setPagination }) => {
  const [isFilterAdvance, setIsFilterAdvance] = useState(false)

  const handleStatusChange = value => {
    setPagination({
      ...pagination,
      Status: value === "all" ? 0 : parseInt(value, 10), // Parse value to integer if necessary
    })
  }

  return (
    <div>
      <Row gutter={[16, 8]} className="mb-15">
        <Col xl={19} lg={24} md={24} sm={24} xs={24}>
          <FlInput
            onSearch={e => setPagination({ ...pagination, TextSearch: e })}
            search
            allowClear
            label="Tìm kiếm"
          />
        </Col>
        <Col xl={5} lg={24} md={24} sm={24} xs={24}>
          <Button
            btntype="third"
            className="w-100"
            onClick={() => {
              setIsFilterAdvance(!isFilterAdvance)
            }}
            iconName={isFilterAdvance ? "arrow-up" : "arrow-down"}
          >
            {isFilterAdvance ? "Đóng bộ lọc nâng cao" : "Mở bộ lọc nâng cao"}
          </Button>
        </Col>
      </Row>
      {isFilterAdvance && (
        <FadeIn>
          <Row gutter={[16, 0]}>
            <Col span={8}>
              <FlSelect
                onChange={handleStatusChange}
                label="Trạng thái"
                defaultValue="all"
              >
                <Option value="all">Tất cả</Option>
                <Option value="1">Đang hoạt động</Option>
                <Option value="2">Dừng hoạt động</Option>
              </FlSelect>
            </Col>
          </Row>
        </FadeIn>
      )}
    </div>
  )
}

export default SearchAndFilter


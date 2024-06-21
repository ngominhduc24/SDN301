import { useState } from "react"
import { useSelector } from "react-redux"
import { SearchComponentStyle } from "./styled"
import { Col, Row, Select } from "antd"
import FlInput from "src/components/FloatingLabel/Input"
import Button from "src/components/MyButton/Button"
import FadeIn from "react-fade-in/lib/FadeIn"
import FlDatePicker from "src/components/FloatingLabel/DatePicker"
import moment from "moment"
import FlSelect from "src/components/FloatingLabel/Select"
import { getListComboByKey } from "src/lib/utils"
import { SYSTEM_KEY } from "src/constants/constants"

const { Option } = Select

const SearchAndFilter = ({ pagination, setPagination }) => {
  const [isFilterAdvance, setIsFilterAdvance] = useState(false)

  const { listSystemKey } = useSelector(state => state.appGlobal)

  return (
    <SearchComponentStyle>
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
              <FlDatePicker
                label="Thời gian bắt đầu"
                onChange={e =>
                  e
                    ? setPagination({
                        ...pagination,
                        FromDate: moment(e.$d).format("YYYY-MM-DDTHH:mm:ssZ"),
                      })
                    : setPagination({ ...pagination, FromDate: "" })
                }
              />
            </Col>
            <Col span={8}>
              <FlSelect
                onChange={e =>
                  setPagination({ ...pagination, ApproveStatus: e })
                }
                label="Trạng thái duyệt"
              >
                <Option value={0}>Tất cả</Option>
                {getListComboByKey(
                  SYSTEM_KEY?.BOOKING_STATUS_BROWSE,
                  listSystemKey,
                ).map(i => (
                  <Option key={i?.CodeValue} value={i?.CodeValue}>
                    {i?.Description}
                  </Option>
                ))}
              </FlSelect>
            </Col>
            <Col span={8}>
              <FlSelect
                onChange={e => setPagination({ ...pagination, Status: e })}
                label="Trạng thái"
              >
                <Option value={0}>Tất cả</Option>
                {getListComboByKey(
                  SYSTEM_KEY?.BOOKING_STATUS,
                  listSystemKey,
                ).map(i => (
                  <Option key={i?.CodeValue} value={i?.CodeValue}>
                    {i?.Description}
                  </Option>
                ))}
              </FlSelect>
            </Col>
          </Row>
        </FadeIn>
      )}
    </SearchComponentStyle>
  )
}

export default SearchAndFilter


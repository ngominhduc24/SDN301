import React from "react"
import { Input, Tooltip } from "antd"
import PropTypes from "prop-types"

import MyAutoComplete from "src/components/InputField/MyAutoComplete"
import Button from "src/components/MyButton/Button"
import styles from "src/components/InputField/SearchField/styles.module.scss"
import SvgIcon from "src/components/SvgIcon"
import { InputFieldWrapper } from "./styled"

SearchField.propTypes = {
  searchSimple: PropTypes.shape({
    searchSimple: PropTypes.bool,
    onChange: PropTypes.func,
  }),
  hideFilter: PropTypes.bool,
  apiClient: PropTypes.func,
}

SearchField.defaultProps = {
  searchSimple: {
    isSearchSimple: false,
    onChange: () => {},
  },
  hideFilter: false,
  apiClient: () => {},
}

export default function SearchField(props) {
  const {
    onSelect,
    onClick,
    placeholder,
    searchSimple,
    hideFilter,
    apiClient,
    handleSearch,
    ...rest
  } = props

  return (
    <InputFieldWrapper className={styles.rawSearch}>
      {searchSimple?.isSearchSimple ? (
        <div className={styles.searchField}>
          <Input
            placeholder={placeholder}
            size="large"
            value={searchSimple?.value}
            suffix={
              searchSimple?.value?.length === 0 && (
                <SvgIcon name="search" className={styles.iconSearch} />
              )
            }
            onChange={searchSimple?.onChange}
            allowClear
          />
        </div>
      ) : (
        <MyAutoComplete
          className={styles.searchField}
          onSelect={onSelect}
          apiClient={apiClient}
          defaultVal={searchSimple?.defaultValue}
        >
          <Input
            placeholder={placeholder}
            size="large"
            value={searchSimple?.value}
            allowClear
            onChange={searchSimple?.onChange}
            suffix={
              <SvgIcon
                name="search"
                className={styles.iconSearch}
                onClick={handleSearch}
              />
            }
            {...rest}
          />
        </MyAutoComplete>
      )}

      {!hideFilter && (
        <Tooltip
          placement="bottom"
          mouseLeaveDelay={0}
          title="Tìm kiếm nâng cao"
        >
          <Button
            btntype="greyFilter"
            shape="circle"
            iconName="filter-white"
            onClick={onClick}
          />
        </Tooltip>
      )}
    </InputFieldWrapper>
  )
}

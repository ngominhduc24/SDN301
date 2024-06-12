import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { AutoComplete } from 'antd'

import arrow from 'src/assets/images/arrow.svg'
import groupBy from 'lodash/groupBy'
import debounce from 'lodash/debounce'
import styles from './../MyAutoComplete/styles.module.scss'
import { isEmpty } from 'lodash'
import { getMsgClient } from 'src/lib/stringsUtils'
import cn from 'src/lib/classnames'

MyAutoComplete.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  apiClient: PropTypes.func
}

MyAutoComplete.defaultProps = {
  children: null,
  className: '',
  apiClient: () => {}
}

export default function MyAutoComplete(props) {
  const { defaultVal, children, className, apiClient, ...rest } = props
  const [optionsSuggest, setOptionsSuggest] = useState([])

  const [value, setValue] = useState('')

  const renderTitle = title => (
    <div className="d-flex">
      <img src={arrow} />
      <span className={styles.title}>{title}</span>
    </div>
  )

  const replaceAll = (str, find, replace) => {
    if (!str?.includes(find)) return str
    return str.replace(find, replace)
  }

  const renderText = (value, text, item) => {
    if (value === '...') return text
    return `${value}[!|${item?.objectId}_${item.categoryId}|!]`
  }

  const renderItem = (item, textSearch) => ({
    value: renderText(item?.objectName, textSearch, item),
    key: `${item?.objectName}_${item?.objectId}_${item?.categoryId}`,
    label: (
      <span
        className={cn(styles.itemlabel)}
        dangerouslySetInnerHTML={{
          __html: replaceAll(item?.objectName, textSearch, `<b>${textSearch}</b>`)
        }}
        key={`${item?.objectName}_${item.objectId}_${item.categoryId}`}
      />
    ),
    objectid: item.objectId,
    categoryid: item.categoryId,
    object_name: item?.objectName,
    text_search: textSearch
  })

  const searchResult = (textSearch, listSearch) => {
    const result = Object.keys(listSearch).map(item => {
      return {
        label: renderTitle(listSearch[item][0].categoryName),
        options: listSearch[item].map(children => {
          return renderItem(children, textSearch)
        })
      }
    })
    return result
  }

  const handleSuggestSearch = textSearch => {
    const text = textSearch?.trim()
    if (isEmpty(text)) return setOptionsSuggest([])
    let listSearch
    apiClient(text).then(res => {
      if (res.isError) return
      listSearch = groupBy(res.object, 'categoryId')
      setOptionsSuggest(searchResult(text, listSearch))
    })
  }

  return (
    <AutoComplete
      defaultValue={defaultVal}
      dropdownMatchSelectWidth={500}
      options={optionsSuggest}
      onSearch={debounce(handleSuggestSearch, 300)}
      className={className}
      value={getMsgClient(value || '')}
      onChange={setValue}
      {...rest}
    >
      {children}
    </AutoComplete>
  )
}

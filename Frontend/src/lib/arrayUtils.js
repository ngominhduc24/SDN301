import { get, isEmpty } from 'lodash'

export function updateObjectInArray(array, object) {
  const elementIndex = array.findIndex((el) => el.id === object.id)
  const newList = [...array]
  if (elementIndex >= 0) newList.splice(elementIndex, 1, object)
  return newList
}

export function updateObjectInArrayByElement(array, object, element) {
  const elementIndex = array.findIndex((el) => el[element] === object[element])
  const newList = [...array]
  if (elementIndex >= 0) newList.splice(elementIndex, 1, object)
  return newList
}

export function get3dot5(arrSelected = []) {
  const arrJoin = []
  var arrInit = []
  var row

  arrSelected.forEach((selectedRow) => {
    row = []
    for (var key in selectedRow) {
      if (selectedRow[key]) {
        row.push(key)
      }
    }
    if (row) {
      arrJoin.push(row)
    }
  })

  if (arrJoin) {
    arrInit = arrJoin[0]
    arrJoin.forEach((el) => {
      arrInit = el.filter((x) => arrInit.includes(x))
    })
  }

  return arrInit
}

export function extractTreeData(items, root, idName = '', parentIdName = '', arrTitle = [], arrValue = [], splitTitle = ' - ', splitValue = ' - ') {
  var valueIsInt = false
  const listItem =
    items &&
    items.map((x) => {
      var title = '',
        value = ''
      arrTitle.forEach((el) => {
        title += (title ? splitTitle : '') + (!isEmpty(get(x, el)) ? get(x, el) : '')
      })
      arrValue.forEach((el) => {
        valueIsInt = typeof get(x, el) === 'number'
        value += (value ? splitValue : '') + get(x, el)
      })
      return {
        ...x,
        title: title,
        value: valueIsInt ? parseInt(value) : value,
      }
    })
  let t = {}
  listItem &&
    listItem.forEach((item) => {
      t = { ...t, [item[idName]]: { ...(t[item[idName]] || {}), ...item } }
      t[item[parentIdName]] = t[item[parentIdName]] || {}
      t[item[parentIdName]].children = t[item[parentIdName]].children || []
      t[item[parentIdName]].children.push(t[item[idName]])
    })
  if (t[root] && t[root].children) return t[root].children
  return t[root]
}

/**
 * 
 * @param selectedRows mang cac object duoc chon 
 * vidu: [
    {
      Add: false,
      Approve: false,
      ApproveInventory: false,
      CancelInventory: false,
      CancelSendApprove: false,
      ComfirmHandover: false,
      ComfirmReturn: false,
      Delete: true,
      Edit: true,
      Handover: false,
      Inventory: false,
      NoApprove: false,
      NoComfirmReturn: false,
      NoHandover: false,
      Restore: false,
      Return: false,
      Revoke: false,
      SendApprove: true,
      SendApproveInventory: false,
      UpdateInventory: false,
      ViewHistory: true,
      WaitInventory: false,
    },
    {
      Add: false,
      Approve: false,
      ApproveInventory: false,
      CancelInventory: false,
      CancelSendApprove: false,
      ComfirmHandover: false,
      ComfirmReturn: false,
      Delete: true,
      Edit: true,
      Handover: false,
      Inventory: false,
      NoApprove: false,
      NoComfirmReturn: false,
      NoHandover: false,
      Restore: false,
      Return: false,
      Revoke: false,
      SendApprove: true,
      SendApproveInventory: false,
      UpdateInventory: false,
      ViewHistory: true,
      WaitInventory: false,
    }]

  @param fixButtons cac nut luon hien thi 
  vidu: [
    'SendApprove', 
    'Handover', 
    'Inventory', 
    'Return'
  ]
 */
export function kb3dot5(selectedRows = [], fixButtons = []) {
  var enableRow
  var enableRows = []
  var join = []
  var union = []
  var objUnion = {}
  var objReturn = {}
  var objFixButtons = {}

  selectedRows.forEach((selectedRow) => {
    enableRow = []
    for (let key in selectedRow) {
      if (selectedRow[key]) {
        enableRow.push(key)
      }
    }
    if (enableRow) {
      enableRows.push(enableRow)
    }
  })

  if (enableRows) {
    join = enableRows[0]
    enableRows.forEach((el) => {
      union = [...new Set([...union, ...el])]
      join = el.filter((x) => join.includes(x))
    })
  }

  if (join) {
    join.forEach((el) => {
      objReturn[el] = true
    })
  }

  if (union) {
    union.forEach((el) => {
      objUnion[el] = false
    })
  }

  if (fixButtons) {
    fixButtons.forEach((el) => {
      objFixButtons[el] = false
    })
    objReturn = { ...objFixButtons, ...objUnion, ...objReturn }
  }

  return objReturn
}

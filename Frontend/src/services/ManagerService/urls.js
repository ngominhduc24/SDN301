// Product
export const apiGetShopById = id => `api/shop/${id}`
export const apiGetListProductsInShop = id => `api/shop/${id}/product`
export const apiGetListProductsNotInShop = id =>
  `api/shop/${id}/product/unadded/getinfo`
export const apiAddProductsToShop = id => `api/shop/${id}/product`
export const apiUpdateProductsToShop = (shopId, productId) =>
  `api/shop/${shopId}/product/${productId}`
export const apiGetDetailProductsInShop = (shopId, productId) =>
  `api/shop/${shopId}/product/${productId}`

// Staff
export const apiUpdateStatusStaff = id => `api/admin/users/${id}`
export const apiGetStaffDetail = id => `api/admin/users/${id}`
export const apiGetShopList = `api/shop`
export const apiGetListStaff = `api/manager/staff`

// Invoice
export const apiGetAllInvoice = `api/invoice`
export const apiGetInvoiceById = id => `api/invoice/${id}`
export const apiCreateInvoice = `api/invoice`
export const apiUpdateInfoInvoice = id => `api/invoice/${id}`
export const apiUpdateStatusInvoice = id => `api/invoice/status/${id}`
export const apiGetInvoicesByShopId = id => `api/shop/${id}/invoiceTo`
export const apiGetOrdersByShopId = id => `api/shop/${id}/invoiceFrom`
export const apiExportInvoice = id => `api/invoice/export/${id}`
export const apiImportInvoice = `/api/product/get-list-import`

// Request
export const apiUpdateInfoRequest = id => `api/request/${id}`
export const apiUpdateStatusRequest = id => `api/request/status/${id}`
export const apiCreateRequest = `api/request`
export const apiGetRequestWarehouse = `api/request`
export const apiGetRequestShop = id => `api/shop/${id}/request`
export const apiGetRequestById = id => `api/request/${id}`


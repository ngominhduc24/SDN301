export const apiGetInfoWarehouse = `api/shop/warehouse/getinfo`
export const apiGetListProductsWarehouse = id => `api/shop/${id}/product`
export const apiGetListProductsNotInWarehouse =
  id => `api/shop/${id}/product/unadded/getinfo
`
export const apiAddProductsToWarehouse = id => `api/shop/${id}/product
`
export const apiGetShopList = `api/shop`
export const apiUpdateProductsInWarehouse = (shopId, productId) =>
  `api/shop/${shopId}/product/${productId}`
export const apiGetAllInvoice = `api/invoice`
export const apiGetInvoiceById = id => `api/invoice/${id}`
export const apiCreateInvoice = `api/invoice`
export const apiUpdateInfoInvoice = id => `api/invoice/${id}`
export const apiUpdateStatusInvoice = id => `api/invoice/status/${id}`
export const apiGetInvoicesByShopId = id => `api/shop/${id}/invoiceTo`
export const apiGetOrdersByShopId = id => `api/shop/${id}/invoiceFrom`


const CA_NHAN = "ca_nhan"
const ROUTER = {
  SVG_VIEWER: "/svg-viewer",
  HOME: "/dashboard",
  DEFAULT: "/",
  DANG_NHAP: "/dang-nhap",
  DOI_MAT_KHAU: "/doi-mat-khau",
  TEST_PRINT: "/test-print",

  // ADMIN
  DASHBOARD: "/admin/dashboard",
  MANAGE_USER: "/admin/manage-user",
  MANAGE_STORE: "/admin/manage-store",
  MANAGE_PRODUCTS: "/admin/manage-products",
  PROFILE: `/thong-tin-ca-nhan`,

  // USER

  // STAFF
  STAFF_MANAGE_ORDER: "/staff/order",
  STAFF_DASHBOARD: "/staff/dashboard",
  STAFF_PROFILE: `/staff/thong-tin-ca-nhan`,

  // MANAGER
  MANAGER_DASHBOARD: "/manager/dashboard",
  MANAGER_MANAGE_INVOICE: "/manager/manage-invoices",
  MANAGER_MANAGE_STAFF: "/manager/manage-staffs",
  MANAGER_MANAGE_PRODUCTS: "/manager/manage-products",
  MANAGER_PROFILE: `/manager/thong-tin-ca-nhan`,
  // WAREHOUSE MANAGER
  WAREHOUSE_MANAGER_DASHBOARD: "/warehouse-manager/dashboard",
  WAREHOUSE_MANAGER_MANAGE_INVOICE: "/warehouse-manager/manage-invoices",
  WAREHOUSE_MANAGER_MANAGE_WAREHOUSE: "/warehouse-manager/manage-warehouse",
  WAREHOUSE_MANAGER_PROFILE: `/warehouse-manager-thong-tin-ca-nhan`,
  WAREHOUSE_MANAGER_MANAGE_PRODUCT: "/warehouse-manager/manage-product",
  WAREHOUSE_MANAGER_MANAGE_STORE: "/warehouse-manager/manage-store",
}
export default ROUTER


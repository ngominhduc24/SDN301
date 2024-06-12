import QueryString from "qs"
import http from "../index"
import {
  apiChangeImgUser,
  apiChangeInfor,
  apiDeletaAccountUser,
  apiDeleteUser,
  apiDetailUser,
  apiExportGuest,
  apiExportUser,
  apiChangeStatus,
  apiGetAccount,
  apiGetAllAccountUser,
  apiGetAllUserDirectory,
  apiGetInforUser,
  apiGetListGuest,
  apiGetListRecruterByUserID,
  apiGetListUser,
  apiGetListUserInDept,
  apiGetTemplateFileImportGuest,
  apiGetTemplateFileImportUser,
  apiImportGuest,
  apiImportUser,
  apiInsertAccountUser,
  apiInsertGuest,
  apiInsertRecruiter,
  apiInsertUser,
  apiReplacePassword,
  apiUpdateAccount,
  apiUpdateAccountUser,
  apiUpdateUser,
  apiChangeInforOrgan,
  apiGetListRepresentative,
  apiInsertRepresentative,
  apiAddUserRepresentative,
  apiUpdateRepresentative,
  apiCheckTokenUSB,
  apiGetInfoUserRepresentative,
  apiGetListRepresentativeByType,
  apiChangeInforTemp,
  apiChangeInforOrganTemp,
  apiGetListUpdateRequest,
  apiGetDetailChange,
  apiRejectChange,
  apiConfirmChange,
  apiCountListUser,
  apiGetDetailGuest,
  apiGetListDeparmentUser,
  apiResetPassword,
  apiGetAllUserByDept,
} from "./urls"

const updateAccount = body => http.post(apiUpdateAccount, body)

const getAccount = params => http.get(apiGetAccount, { params })
const insertUser = body => http.post(apiInsertUser, body)
const GetAllUserDirectory = body => http.post(apiGetAllUserDirectory, body)
const InsertGuest = body => http.post(apiInsertGuest, body)
const deleteUser = body =>
  http.patch(apiDeleteUser + `?${QueryString.stringify(body)}`)
const changeStatus = body =>
  http.patch(apiChangeStatus + `?${QueryString.stringify(body)}`)
const detailUser = UserID => http.get(`${apiDetailUser}?UserID=${UserID}`)
const updateUser = params => http.post(apiUpdateUser, params)
const importUser = body => http.post(apiImportUser, body)
const getTemplateFileImportUser = body =>
  http.get(apiGetTemplateFileImportUser, body)
const exportUser = params => {
  http.interceptors.request.use(
    async config => {
      config.responseType = "blob"
      return config
    },
    error => Promise.reject(error),
  )
  return http.get(apiExportUser, { params })
}

const importGuest = body => http.post(apiImportGuest, body)
const exportGuest = params => http.get(apiExportGuest, { params })
const templateImportGuest = () => {
  http.interceptors.request.use(
    async config => {
      config.responseType = "blob"
      return config
    },
    error => Promise.reject(error),
  )
  return http.get(apiGetTemplateFileImportGuest)
}

const getListUser = params => http.post(apiGetListUser, params)
const GetListGuest = params => http.post(apiGetListGuest, params)
const replacePassword = body => http.post(apiReplacePassword, body)
const getInforUser = () => http.get(apiGetInforUser)
const changeInfor = body => http.post(apiChangeInfor, body)
const changeInforOrgan = body => http.post(apiChangeInforOrgan, body)
const changeAvatar = params =>
  http.patch(apiChangeImgUser + `?Avatar=${params}`)
const insertRecruiter = body => http.post(apiInsertRecruiter, body)
const getListRecruterByUserID = body =>
  http.post(apiGetListRecruterByUserID, body)
const getAllUserByDept = body => http.post(apiGetAllUserByDept, body)

const getAllAccountUser = body => http.post(apiGetAllAccountUser, body)
const getListUserInDept = params => http.get(apiGetListUserInDept, { params })
const countListUser = body => http.post(apiCountListUser, body)
const insertAccountUser = body => http.post(apiInsertAccountUser, body)
const updateAccountUser = body => http.post(apiUpdateAccountUser, body)
const deleteAccountUser = params =>
  http.patch(apiDeletaAccountUser + `?UserID=${params}`)
const getListRepresentative = body => http.post(apiGetListRepresentative, body)
const insertRepresentative = body => http.post(apiInsertRepresentative, body)
const getInfoUserRepresentative = body =>
  http.post(apiGetInfoUserRepresentative, body)
const addUserRepresentative = body => http.post(apiAddUserRepresentative, body)
const updateRepresentative = body => http.post(apiUpdateRepresentative, body)
const changeInforTemp = body => http.post(apiChangeInforTemp, body)
const changeInforOrganTemp = body => http.post(apiChangeInforOrganTemp, body)
const getListUpdateRequest = body => http.post(apiGetListUpdateRequest, body)
const checkTokenUSB = body => http.post(apiCheckTokenUSB, body)

const getListRepresentativeByType = params =>
  http.get(apiGetListRepresentativeByType + `?Type=${params}`)
const getDetailChange = params => http.get(apiGetDetailChange + `/${params}`)
const confirmChange = params =>
  http.post(
    apiConfirmChange + `/${params?.RequestId}?${QueryString.stringify(params)}`,
  )
const rejectChange = params =>
  http.post(
    apiRejectChange + `/${params?.RequestId}?${QueryString.stringify(params)}`,
  )

const getDetailGuest = body =>
  http.get(apiGetDetailGuest + `?${QueryString.stringify(body)}`)

const getListDepartmentUser = body => http.post(apiGetListDeparmentUser, body)
const resetPassword = body => {
  const params = QueryString.stringify(body)
  return http.patch(`${apiResetPassword}?${params}`)
}

const UserService = {
  getDetailGuest,
  getAllUserByDept,
  resetPassword,
  GetAllUserDirectory,
  InsertGuest,
  updateAccount,
  insertUser,
  getAccount,
  deleteUser,
  detailUser,
  changeStatus,
  updateUser,
  getListUser,
  importUser,
  getTemplateFileImportUser,
  exportUser,
  importGuest,
  exportGuest,
  templateImportGuest,
  GetListGuest,
  getListUserInDept,
  replacePassword,
  getInforUser,
  changeInfor,
  changeAvatar,
  insertRecruiter,
  getListRecruterByUserID,
  getAllAccountUser,
  insertAccountUser,
  updateAccountUser,
  deleteAccountUser,
  changeInforOrgan,
  getListRepresentative,
  insertRepresentative,
  getInfoUserRepresentative,
  addUserRepresentative,
  updateRepresentative,
  checkTokenUSB,
  getListRepresentativeByType,
  changeInforTemp,
  changeInforOrganTemp,
  getListUpdateRequest,
  getDetailChange,
  confirmChange,
  rejectChange,
  countListUser,
  getListDepartmentUser,
}
export default UserService

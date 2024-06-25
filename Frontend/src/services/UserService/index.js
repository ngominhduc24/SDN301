import http from "../index"
import { apiChangePassword, apiGetAllUsers } from "./urls"
// const changePassword = async (id, body) => {
//   const endpoint = apiChangePassword.replace(":id", id)
//   await http.post(endpoint, { ...body })
// }
const getInforUser = (token) => http.get(apiGetAllUsers, token);
const changePassword = (id, body) => {
  http.put(apiChangePassword(id), body);
}

const UserService = {
  changePassword, getInforUser
}

export default UserService;

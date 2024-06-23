import http from "../index"
import { apiChangePassword, apiGetAllUsers } from "./urls"
// const changePassword = async (id, body) => {
//   const endpoint = apiChangePassword.replace(":id", id)
//   await http.post(endpoint, { ...body })
// }
const getAllUsers = () => http.get(apiGetAllUsers);
const changePassword = (id, body) => {
  http.put(apiChangePassword(id), body);
}

const UserService = {
  changePassword, getAllUsers
}

export default UserService;

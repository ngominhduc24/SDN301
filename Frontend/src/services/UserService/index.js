import http from "../index"
import { apiChangePassword, apiGetUserById, apiUpdateProfile } from "./urls"
// const changePassword = async (id, body) => {
//   const endpoint = apiChangePassword.replace(":id", id)
//   await http.post(endpoint, { ...body })
// }
const getUserById = (id) => http.get(apiGetUserById(id));
const changePassword = (id, body) => {
  http.put(apiChangePassword(id), body);
}

const updateProfile = (id, body) => {
  http.put(apiUpdateProfile(id), body);
}


const UserService = {
  changePassword, getUserById, updateProfile
}

export default UserService;

import http from "../index"
import { apiChangeAvatar, apiChangePassword, apiGetUserById, apiUpdateProfile, apiUploadFile } from "./urls"
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

const uploadFile = () => {
  http.post(apiUploadFile, {headers: {
    'Content-Type': 'multipart/form-data',
  }});
}
const changeAvatar = (id, body) => {
  http.put(apiChangeAvatar(id), body, {
    // headers: {'Content-Type': 'multipart/form-data'}
  })
}


const UserService = {
  changePassword, getUserById, updateProfile, changeAvatar, uploadFile
}

export default UserService;

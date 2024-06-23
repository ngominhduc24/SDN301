import axios from "axios"
import http from "../index"
import { apiChangePassword } from "./urls"
import QueryString from "qs"

const changePassword = (id, body) => http.put(apiChangePassword(id), body)
const UserService = {
  changePassword,
}
export default UserService

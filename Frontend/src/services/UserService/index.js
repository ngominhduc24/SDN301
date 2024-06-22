import http from "../index"
import { apiChangePassword } from "./urls"
export const changePassword = async (id, body) => {
  const endpoint = apiChangePassword.replace(":id", id)
  await http.post(endpoint, { ...body })
}

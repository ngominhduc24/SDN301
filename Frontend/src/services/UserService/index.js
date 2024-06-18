import http from "../index"
import {apiChangePassword, apiPersonalProfile} from './urls'
const changePassword = body => http.post(apiChangePassword, body)
import { apiGetByRegionId } from "./urls"
import QueryString from "qs"
import http from "../index"

const getByRegionId = params => http.get(apiGetByRegionId, { params })
const GuestServices = { getByRegionId }

export default GuestServices

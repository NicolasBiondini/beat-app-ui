import axios from "axios";

const BASE_URL = "https://www.beatapp.live/api";
const BASE_URL_PRIVATE = "https://www.beatapp.live/api/private";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL_PRIVATE,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

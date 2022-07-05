import axios from "axios";

const request = axios.create({
  baseURL: "http://42.192.129.12:8000/", // 基础路径
});

export default request;

import request from "@/utils/request";
export const Logins = (data) =>
  request({
    url: "/v1_0/authorizations",
    method: "POST",
    data,
  });
export const getCodes = (mobile) =>
  request({
    url: `v1_0/sms/codes/${mobile}`,
  });

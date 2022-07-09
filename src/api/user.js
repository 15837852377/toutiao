import request from "@/utils/request";
// import store from "@/store";

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

export const fetchUserIfo = () =>
  request({
    url: "/v1_0/user",
    // headers: {
    //   Authorization: `Bearer ${store.state?.user?.token}`,
    // },
  });

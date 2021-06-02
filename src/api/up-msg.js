import { httpRequest } from "@/helpers/request.js";

const URL = {
  GET_UpFansList: "/api3/up",
};

export const apiUpFansList = (
  { page = 1, pageSize = 10 } = { page: 1, pageSize: 10 }
) => {
  return httpRequest(URL.GET_UpFansList, "GET", {
    pageSize,
    page,
    orderKey: "follower",
  });
};

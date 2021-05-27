import { httpRequest } from "@/helpers/request.js";

const URL = {
  GET_UpFansList: "/api/up/fansList",
};

// export interface UpSql {
//   name: string,
//     sign: string,
//     face: string,
//     mid: number,
//     follower: number,
//     archive: number,
//     likes: number,
//     id?: number
//   updated?: string
//   created?: string
//   isFans?: number
//   fans_time?: string
// }

export const apiUpFansList = ({ page = 1, pageSize } = { page: 1 }) => {
  return httpRequest(URL.GET_UpFansList, "GET", { pageSize, page });
};

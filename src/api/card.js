import request from "../network/request";
import globalData from "../global/index";
import dayjs from "dayjs";


export const getCourseCards = (courseId) => {
  const url = `/v1/cardcat`;
  const options = {};
  return request.get(url, {}, options);
};
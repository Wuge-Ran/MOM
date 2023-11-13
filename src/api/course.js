import request from "../network/request";
import globalData from "../global/index";

export const getCourseByDate = () => {
  const url = `/v1/course_by_date`;
  return request.get(url);
};

export const getCourseList = (data) => {
  const url = `/v1/course`;
  return request.get(url,data)
}

export const getCoursesByAllFields = (fromDate, toDate) => {
  const url = `/v1/course`;
  const options = {
    header: {
      "from-date": fromDate,
      "to-date": toDate,
      "fields":"course_id, display_name, description, address, start_time, duration_minutes, max_attenders, current_attenders, waiting_attenders, status, coach_id, coach_nickname",
    },
  };
  return request.get(url,{},options);
};

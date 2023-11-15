import request from "../network/request";
import globalData from "../global/index";

export const getCourseByDate = (courseType,coachId) => {
  const url = `/v1/course_by_date`;
  const options = {
  header: { "course-type": courseType, "coachId": coachId}
 };
  return request.get(url,{},options);
};

export const getCourseList = (data) => {
  const url = `/v1/course`;
  return request.get(url,data)
}

export const getCoursesByAllFields = (fromDate, toDate) => {
  const url = `/v1/course_list`;
  const options = {
    header: {
      "from-date": fromDate,
      "to-date": toDate,
      "fields":"course_id, type, display_name, description, address, start_time, duration_minutes, max_attenders, current_attenders, waiting_attenders, coach_id, coach_nickname, coach_avatar_url, coach_liked_by_user, status",
    },
  };
  return request.get(url,{},options);
};

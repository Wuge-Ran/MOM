import request  from "../network/request";
import globalData from "../global/index";

export const getCourseByDate =()=>{
    const url =`/v1/course_by_date`;
    return request.get(url)
  }
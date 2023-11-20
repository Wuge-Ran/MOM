import request from "../network/request";
import globalData from "../global/index";

export const getCourseByDate = (courseType,coachIds) => {
  const url = `/v1/course_by_date`;
  return request.get(url,{ "course-type": courseType, "coach-id": coachIds});
};

export const getCourseList = (data) => {
  const url = `/v1/course_list`;
  return request.get(url,data)
}

export const getCoursesByAllFields = (fromDate, toDate) => {
  const url = `/v1/course_list`;
  const options = {
    header: {
      "from-date": fromDate,
      "to-date": toDate,
      "fields":"course_id, type, display_name, description, address, start_time, duration_minutes, max_attenders, current_attenders, waiting_attenders, coach_id, coach_nickname, coach_avatar_url, coach_liked_by_user, status,user_can_cancel_reserve,user_can_reserve,user_can_wait",
      //,address_lat,address_long
    },
  };
  return request.get(url,{},options);
};

export const getCourseById = (courseId) => {
  const url = `/v1/course`;
  const options = {
    header: { "course-id": courseId, },
  };
  return request.get(url,{},options);
};

export const getCoachList = ()=>{
    const url = '/v1/coach_list';
    return request.get(url);
}

export const getCoachInfo = (id)=>{
    const url = '/v1/coach';
    return request.get(url,{'coach-id':id});
}

export const likeCoach = (id)=>{
     return request.post('/v1/like_coach',{'coach-id':id})
}

export const disLikeCoach = (id)=>{
    return request.delete('/v1/like_coach',{'coach-id':id})
}


export const cancelBook = (id)=>{
  return request.delete('/v1/reserve_course',{'course-id':id})
}

export const cancelWait = (id)=>{
  return request.delete('/v1/reserve_course',{'course-id':id})
}

export const book = (id)=>{
  return request.delete('/v1/reserve_course',{'course-id':id})
}

export const wait = (id)=>{
  return request.delete('/v1/reserve_course',{'course-id':id})
}
import request from "../network/request";
import globalData from "../global/index";
import dayjs from "dayjs";


export const getCards = () => {
  const url = `/v1/cardcat`;
  const options = {};
  return request.get(url, {}, options);
};

export const getPrepayInfo = (id) => {
  const url = "/v1/buy_cardins_prepay";
  return request.post(url, { "cardcat-id": id });
};

export const postBuyResult = (id) => {
  const url = "/v1/buy_cardins_finish";
  return request.post(url, { "order-id": id });
};

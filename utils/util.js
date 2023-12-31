// string 格式化扩展
String.prototype.format = function () {
  var formatted = this;
  for (var arg in arguments) {
    formatted = formatted.replace("{" + arg + "}", arguments[arg]);
  }
  return formatted;
};

const formatTime = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return `${[year, month, day].map(formatNumber).join("/")} ${[
    hour,
    minute,
    second,
  ]
    .map(formatNumber)
    .join(":")}`;
};

const formatNumber = (n) => {
  n = n.toString();
  return n[1] ? n : `0${n}`;
};

/**
 * 获取当天是周几
 */
export function getDayOfWeek(dateString) {
  // 创建一个 Date 对象
  const date = new Date(dateString);
  // 获取星期几的数字，0 表示星期日，1 表示星期一，以此类推
  const dayOfWeek = date.getDay();

  // 定义星期几的字符串数组
  const daysOfWeek = ["周日","周一", "周二", "周三", "周四", "周五", "周六" ];

  // 返回星期几的字符串
  return daysOfWeek[dayOfWeek];
}
/**
 * 获取下一天的日期
 */
export function getNextDay(dateString) {
  // 创建一个 Date 对象
  const date = new Date(dateString);

  // 获取明日的日期
  date.setDate(date.getDate() + 1);

  // 获取年、月、日
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 补零
  const day = String(date.getDate()).padStart(2, "0"); // 补零

  // 返回明日日期的字符串
  return `${year}-${month}-${day}`;
}

export function queryString(param) {
  return (
    "?" +
    Object.keys(param)
      .map((key) => `${key}=${param[key]}`)
      .join("&")
  );
}

const format = String.prototype.format;
export default format;

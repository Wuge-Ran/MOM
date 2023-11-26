import { getCoachInfo } from "@src/api/course";

Page({
  data: {
    current: 0,
    autoplay: false,
    duration: 500,
    interval: 5000,
    coachInfo: null,
    coachId: null,
  },
  onTap(e) {
    const { index } = e.detail;

    console.log(index);
  },
  onChange(e) {
    const { current, source } = e.detail;

    console.log(current, source);
  },
  onImageLoad(e) {
    console.log(e.detail.index);
  },
  onLoad(options) {
    const { id } = options;
    this.setData({
      coachId: id,
    });
    this.getCoachInfo(id);
  },

  getCoachInfo(id) {
    getCoachInfo(id).then(({ data }) => {
        data.photo_urls =['https://api.catchyrime.com/static/coach.jpeg','https://api.catchyrime.com/static/coach.jpeg','https://api.catchyrime.com/static/coach.jpeg','https://api.catchyrime.com/static/coach.jpeg'];
      this.setData({
        coachInfo: data,
      });
    });
  },
});

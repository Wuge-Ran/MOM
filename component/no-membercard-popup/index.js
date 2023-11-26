Component({
  behaviors: [],
  properties: {
    visible: {
      type: Boolean,
      value: true,
    },
  },
  computed: {},
  lifetimes: {
    created() {},
    attached() {},
    moved() {},
    detached() {},
  },

  methods: {
    onOk() {
      console.log(999);
      this.triggerEvent("onOk", []);
    },
    onCancel() {
      this.triggerEvent("onCancel", []);
    },
  },
});

Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#19abd8",
    list: [
      {
        pagePath: "/pages/index/index",
        text: "首页",
        iconPath: "/images/home.png"
      },
      {
        pagePath: "/pages/circle/circle",
        text: "圈子",
        iconPath: "/images/circle.png"
      },
      {
        pagePath: "/pages/publish/publish",
        iconPath: "/images/publish.png"
      },
      {
        pagePath: "/pages/message/message",
        text: "消息",
        iconPath: "/images/messages.png"
      },
      {
        pagePath: "/pages/personal/personal",
        text: "个人",
        iconPath: "/images/personal.png"
      }
    ]
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset;
      const url = data.path;
      if (data.index === 2) {
        // 发布页面使用 navigateTo
        wx.navigateTo({ url });
      } else {
        // 其他页面使用 switchTab
        wx.switchTab({ url });
        this.setData({
          selected: data.index
        })
      }
    },
    setSelected(index) {
      this.setData({
        selected: index
      });
    }
  }
});

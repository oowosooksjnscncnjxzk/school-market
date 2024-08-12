const request = require('../../utils/request.js');
Page({
  data: {
    userInfo: {
      username: 'bgtree_12586988',
      hometown: '湖南',
      school: '武汉理工大学',
      gender: '男',
      birthdate: '2006年8月6日',
      height: '182cm',
      signature: '这里居然可以签名',
      followers: 35200,
      following: 158,
      likes: 125000
    },
    tabs: ['发布', '收藏', '喜欢'],
    activeTab: 1, // 默认为收藏 tab
    posts: [
      {
        id: 1,
        author: "用户1",
        post_id: 4,
        avatar: "/images/avatar1.png",
        title: "标题: 出二手闲置",
        content: "正文: 百里需要加强了",
        images: ["/images/post1.png", "/images/post2.png"],
        created_at: "2023-01-01",
        type: "二手闲置"
      }
    ]
  },
  handleTabChange(e) {
    this.setData({
      activeTab: e.currentTarget.dataset.index
    });
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 4
      });
    }
  },
  navigateToEditProfile() {
    wx.navigateTo({
      url: '/pages/editProfile/editProfile'
    });
  }
});

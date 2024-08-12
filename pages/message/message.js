const request = require('../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messages:  [
      {
        id: 1,
        userId:122,
        author: '贴吧用户_5NtGS8t',
        avatar: '/images/avatar1.png',
        content: '我也这个专业',
        time: '2022-07-21',
        unread: true // 未读状态
      },
      {
        id: 2,
        userId:122,
        author: '实习ing',
        avatar: '/images/avatar1.png',
        content: '插个眼，学弟可以看眼我的帖子...插个眼，..插个眼，插个眼，学弟可以看眼我的帖zi111123456',
        time: '2022-07-21',
        unread: true // 未读状态
      },
      {
        id: 3,
        userId:122,
        author: 'lwns',
        avatar: '/images/avatar1.png',
        content: '同样是这个专业，也想了解一下？...',
        time: '2022-07-21',
        unread: false // 已读状态
      }
    ]
  },
  markAsRead(e) {
    const messageId = e.currentTarget.dataset.id;
    const updatedMessages = this.data.messages.map(message => {
      if (message.id === messageId) {
        return { ...message, unread: false };
      }
      return message;
    });
    this.setData({ messages: updatedMessages });
  
    // 使用封装好的 request 方法向后端发送请求，标记消息为已读
    request.post('/api/messages/markAsRead', {
      id: messageId
    }).then(res => {
      console.log('消息标记为已读', res);
    }).catch(err => {
      console.error('标记消息为已读失败', err);
    });
  },

  navigateToMentions() {
    wx.navigateTo({
      url: '/pages/mentions/mentions'
    });
  },
  navigateToLikes() {
    wx.navigateTo({
      url: '/pages/likes/likes'
    });
  },
  navigateToComment(){
    wx.navigateTo({
      url: '/pages/comment/comment'
    });
  },
  navigateToPostDetail(e) {
    this.markAsRead;
    const userId = e.currentTarget.dataset.userId;
    wx.navigateTo({
      url: `/pages/postDetail/postDetail?id=${userId}`
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setSelected(3);
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
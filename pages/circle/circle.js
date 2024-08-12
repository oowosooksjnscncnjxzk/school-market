const request = require('../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    posts: [ {
      post_id: 4,
      author: "用户1",
      avatar: "/images/avatar1.png",
      title: "圈子标题1",
      content: "这是圈子的第一条内容",
      images: ["/images/post1.png", "/images/post2.png"],
      created_at: "2023-01-01",
      circle_name: "圈子类型1",
      circle_avatar :"/images/avatar1.png"
    }],
    page: 1,
    size: 5,
    hasMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.loadPosts();
  },
  loadPosts() {
    if (!this.data.hasMore) return;
    const newPosts = [
      {
        
        author: "用户1",
        post_id: 4,
        avatar: "/images/avatar1.png",
        title: "圈子标题1",
        content: "这是圈子的第一条内容加强百里守约标题: 加强百里守约加强百里守约标题: 加强百里守约加强百里守约标题: 加强百里守约加强百里守约标题: 加强百里守约",
        images: ["/images/post1.png", "/images/post2.png"],
        created_at: "2023-01-01",
        circle_name: "圈子类型1",
        circle_avatar :"/images/avatar1.png"
      },
      {
      
        post_id: 4,
        author: "用户2",
        avatar: "/images/avatar1.png",
        title: "圈子标题2",
        content: "这是圈子的第二条内容",
        images: ["/images/post1.png", "/images/post2.png"],
        created_at: "2023-01-02",
        circle_name: "圈子类型1",
        circle_avatar :"/images/avatar1.png"
      },
      {
        
        post_id: 4,
        author: "用户1",
        avatar: "/images/avatar1.png",
        title: "圈子标题1",
        content: "这是圈子的第一条内容加强百里守约标题: 加强百里守约加强百里守约标题: 加强百里守约加强百里守约标题: 加强百里守约加强百里守约标题: 加强百里守约",
        images: ["/images/post1.png", "/images/post2.png"],
        created_at: "2023-01-01",
        circle_name: "圈子类型1",
        circle_avatar :"/images/avatar1.png"
      }
    ];
    this.setData({
      posts: this.data.page === 1 ? newPosts : this.data.posts.concat(newPosts),
      page: this.data.page + 1,
      hasMore: newPosts.length === this.data.size
    });
  },
  loadMore() {
    this.loadPosts();
  },
  navigateToSearch() {
    wx.navigateTo({
      url: '/pages/search/search'
    });
  },
  navigateToPostDetail(e) {
    const postId = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/postDetail/postDetail?id=${postId}` });
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
      this.getTabBar().setSelected(1);
    }
  },
  addcircle(){
    wx.navigateTo({
      url: '/pages/addcircle/addcircle',
    })
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
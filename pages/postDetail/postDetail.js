Page({
  data: {
    post: {
      id: 0,
      author_nickname: "小华",
      author_avatar: "/images/avatar1.png",
      title: "假数据帖子的标题",
      content: "今天的天气真好！今天的天气真好！今天的天气真好！今天的天气真好！",
      created_at: "2024-05-29 20:33:26",
      post_images: [
        "/images/post1.png"
      ],
      like_number: 10,
      collect_number: 5,
      comment_number: 20,
      circle_id: 1,
      circle_avatar: "/images/avatar1.png",
      circle_name: "摄影爱好圈"
    },
    comments: [
      {
        comment: {
          id: 1,
          user_id: 101,
          user_avator: "/images/avatar1.png",
          content: "这张照片拍得真好，构图很棒！",
          user_nickname: "评论用户1",
          time: "2024-05-30 10:00:00",
          like_num: 2,
          comment_num: 1
        },
        subcomment: [
          {
            reply_id: 101,
            id: 1,
            user_id: 102,
            user_avator: "/images/avatar1.png",
            user_nickname: "回复用户1",
            content: "同意！拍得真不错！",
            time: "2024-05-30 11:00:00",
            like_num: 1,
            comment_num: 0
          }
        ]
      }
    ],
    showCommentBox: false,
    newComment: '',
    post_id: null
  },

  onLoad(options) {
    // 这里使用假数据，所以不需要调用 fetchPostDetails 和 fetchComments
    this.setData({ post_id: options.id });
  },

  previewImage(e) {
    const src = e.currentTarget.dataset.src;
    console.log(src);
    wx.previewImage({
      current:src, // 当前显示图片的http链接
      urls: this.data.post.post_images // 需要预览的图片http链接列表 // 需要预览的图片http链接列表
    });
  },

  navigateToHome() {
    wx.switchTab({
      url: '/pages/index/index',
    });
  },

  showCommentInput() {
    this.setData({ showCommentBox: true });
  },

  cancelComment() {
    this.setData({ showCommentBox: false });
  },

  onCommentInput(e) {
    this.setData({ newComment: e.detail.value });
  },

  submitComment() {
    if (this.data.newComment.trim()) {
      // 假数据提交，不实际发送请求
      const newComment = {
        comment: {
          id: new Date().getTime(), // 使用时间戳模拟 ID
          user_id: 103,
          user_avator: "/images/avatar1.png",
          content: this.data.newComment,
          user_nickname: "新评论用户",
          time: "2024-05-30 12:00:00",
          like_num: 0,
          comment_num: 0
        },
        subcomment: []
      };
      this.setData({
        comments: [newComment, ...this.data.comments],
        newComment: '',
        showCommentBox: false
      });
    }
  }
});

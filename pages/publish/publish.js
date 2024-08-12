const request = require('../../utils/request.js');
Page({
  data: {
    title: '',
    content: '',
    images: [],
    canPublish: false
  },
  handleTitleInput(e) {
    this.setData({
      title: e.detail.value
    });
    this.checkCanPublish(); // 调用检查函数
  },
  handleContentInput(e) {
    this.setData({
      content: e.detail.value
    });
    this.checkCanPublish(); // 调用检查函数
  },
  checkCanPublish() {
    const { title, content } = this.data;
    const canPublish = title.length > 0 && content.length > 0;
    this.setData({ canPublish });
  },
  chooseImage() {
    wx.chooseImage({
      count: 6 - this.data.images.length,
      success: (res) => {
        const newImages = this.data.images.concat(res.tempFilePaths);
        this.setData({
          images: newImages.slice(0, 6) // 最多选择4张图片
        });
        this.uploadImage(res.tempFilePaths[0]); // 上传图片
      }
    });
  },
  uploadImage(filePath) {
    const token = wx.getStorageSync('token'); 
    console.log(filePath);
    wx.uploadFile({
      url: 'http://70c07780.r28.cpolar.top/action/upload/img/', // 确保URL中没有空格
      filePath: filePath,
      name: 'img',
      header: {
        'Authorization': `Bearer ${token}`, // 在请求头中添加 Authorization 参数
        'content-type': 'multipart/form-data' // 设置为 multipart/form-data
       },
      success: (res) => {
        const data=res;
        console.log(data);
        let parsedData = JSON.parse(data.data);
        console.log('图片上传成功',parsedData);
      },
      fail: (err) => {
        console.error('图片上传失败', err);
      }
    });
},
  deleteImage(e) {
    const index = e.currentTarget.dataset.index;
    const images = this.data.images;
    images.splice(index, 1);
    this.setData({
      images: images
    });
  },
  selectCircle() {
    wx.navigateTo({
      url: '/pages/addcircle/addcircle'
    });
  },
  publishPost() {
    if (!this.data.canPublish) return;
  
    request.post('/api/publish', {
      title: this.data.title,
      content: this.data.content,
      images: this.data.images
    }).then((res) => {
      wx.showToast({
        title: '发布成功',
        icon: 'success'
      });
  
      // 跳转到详情页面，传递帖子ID
      wx.navigateTo({
        url: `/pages/postDetail/postDetail?id=${res.postId}`
      });
  
      // 清空输入框和图片
      this.setData({
        title: '',
        content: '',
        images: [],
        canPublish: false
      });
    }).catch((err) => {
      wx.showToast({
        title: '发布失败',
        icon: 'none'
      });
    });
  }
  
});

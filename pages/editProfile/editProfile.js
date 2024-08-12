Page({
  data: {
    editMode: false,
    avatar: '',
    nickname: '',
    genderIndex: -1,
    genderOptions: ['男', '女'],
    birthday: '',
    school_id: '',
    school_region_id: '',
    hometown: '',
    height: '',
    avatarValid: true,
    nicknameValid: true,
    genderValid: true,
    images:[]
  },

  toggleEditMode() {
    if (this.data.editMode) {
      // 验证必填项
      if (!this.data.avatar || !this.data.nickname || this.data.genderIndex === -1) {
        this.setData({
          avatarValid: !!this.data.avatar,
          nicknameValid: !!this.data.nickname,
          genderValid: this.data.genderIndex !== -1
        });
        wx.showToast({ title: '请填写完整信息', icon: 'none' });
        return;
      }

      // 提交保存
      this.saveProfile();
    } else {
      this.setData({ editMode: true });
    }
  },

  saveProfile() {
    const profileData = {
      avator: this.data.avatar,
      nickname: this.data.nickname,
      signature: this.data.signature,
      gender: this.data.genderOptions[this.data.genderIndex],
      birthday: this.data.birthday,
      school_id: this.data.school_id,
      school_region_id: this.data.school_region_id,
      hometown: this.data.hometown,
      height: this.data.height
    };

    request.post('/api/user/updateProfile', profileData)
      .then(() => {
        wx.showToast({ title: '保存成功', icon: 'success' });
        this.setData({ editMode: false });
      })
      .catch(() => {
        wx.showToast({ title: '保存失败', icon: 'none' });
      });
  },

  onInputChange(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({ [field]: e.detail.value });
  },

  onGenderChange(e) {
    this.setData({ genderIndex: e.detail.value });
  },

  onDateChange(e) {
    this.setData({ birthday: e.detail.value });
  },
  chooseImage() {
    wx.chooseImage({
      count: 1 - this.data.images.length,
      success: (res) => {
        const newImages = this.data.images.concat(res.tempFilePaths);
        const images=this.data.images;
        if(!!images[0]){
          console.log(images[0]);
          this.setData({
            images:[]
          });
        };
        console.log(images[0]);
        this.setData({
          images: newImages.slice(0, 1) // 最多选择1张图片
        });
        this.uploadImage(res.tempFilePaths[0]); // 上传图片
      }
    });
  },
  uploadImage(filePath) {
    const token = wx.getStorageSync('token'); 
    console.log(filePath);
    wx.uploadFile({
      url: 'http://127.0.0.1:4523/m1/4932002-4589328-default/action/upload/img/', // 确保URL中没有空格
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
});

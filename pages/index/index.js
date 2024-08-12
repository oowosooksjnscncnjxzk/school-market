const request = require('../../utils/request.js');
Page({
  data: {
    posts: [],
    navItems: [
      { id: 1, label: '二手闲置', icon: '/images/secondhand.png', url: '/pages/category/category?type=secondhand' },
      { id: 2, label: '打听求助', icon: '/images/help.png', url: '/pages/category/category?type=help' },
      { id: 3, label: '经验分享', icon: '/images/share.png', url: '/pages/category/category?type=share' },
      { id: 4, label: '校园地图', icon: '/images/map.png', url: '/pages/map/map' }
    ],
    page: 1,
    size: 5,
    hasMore: true
  },
  onLoad() {
    const token = wx.getStorageSync('token');
    console.log(token);
    if(!token){
      wx.login({
        success: res => {
          if (res.code) {
            const code = res.code;
            console.log('Login code:', code);
      
            // 确保立即使用 code 发起请求
            wx.request({
              //url: 'http://localhost:3001/login',
              //method: 'GET',
              url:'http://70c07780.r28.cpolar.top/login/',
              method: 'POST',
              data: {
                code: code
              },
              header: {
                'content-type': 'application/json' // 设置请求头为JSON格式
              },
              success(res) {
                console.log(res.data);
                console.log('请求成功:', res.data.data.token);
                wx.setStorageSync('token', res.data.data.token);
              },
              fail(err) {
                console.error('请求失败:', err);
                wx.showToast({
                  title: '请求失败，请稍后重试',
                  icon: 'none'
                });
              }
            });
          } else {
            console.log('Failed to login:', res.errMsg);
            wx.showToast({
              title: '登录失败，请重试',
              icon: 'none'
            });
          }
        },
        fail(err) {
          console.error('wx.login 调用失败：', err);
          wx.showToast({
            title: '无法连接到服务器，请稍后再试',
            icon: 'none'
          });
        }
      });    
    }
   
  },
  onShow() {
    this.loadPosts();
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      });
    }
  },
  async loadPosts() {
    if (!this.data.hasMore) return;

    wx.showLoading({
      title: '加载中...',
    });

    try {

      const res = await new Promise((resolve, reject) => {
        wx.request({
          url: 'http://70c07780.r28.cpolar.top/post/list/', // 替换为你的后端 API 地址
          method: 'GET',
          data: {
            page: this.data.page,
            size: this.data.size
          },
          header: {
            'content-type': 'application/json'
          },
          success: resolve,
          fail: reject
        });
      });

      // 检查 res.data 是否存在，并且处理其中的 posts 数组
      const newPosts = (res.data && res.data.data && Array.isArray(res.data.data.posts)) 
        ? res.data.data.posts.map(post => {
          return {
            post_id: post.id,  // 原始的 post id
            author: post.author_nickname || '匿名用户',
            avatar: post.author_avator || '/images/default_avatar.png',  // 修正字段名为 author_avator
            title: post.title || '无标题',
            content:post.content,
            images: !!post.post_images.length ? post.post_images : ['/images/default_post_image.png'],
            created_at: post.created_at,  // 只保留日期部分
            circle_name: post.circle_name || '未知圈子',
            circle_avatar: post.circle_avatar || '/images/default_circle_avatar.png'
          };
        }) : []; // 如果 posts 不存在或不是数组，则返回空数组
      this.setData({
        posts: this.data.posts.concat(newPosts),
        page: this.data.page + 1,
        hasMore: newPosts.length === this.data.size
      });

      wx.hideLoading();

    } catch (error) {
      wx.hideLoading();
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      });
      console.error('请求失败:', error);
    }
},

  onReachBottom() {
    this.loadPosts();
  },
  navigateToSearch() {
    wx.navigateTo({
      url: '/pages/search/search'
    });
  },
  navigate(event) {
    const { url } = event.currentTarget.dataset;
    wx.navigateTo({
      url: url
    });
  }
});



// Page({
//   data: {
//     posts: [],
//     navItems: [
//       { id: 1, label: '二手闲置', icon: '/images/secondhand.png', url: '/pages/category/category?type=secondhand' },
//       { id: 2, label: '打听求助', icon: '/images/help.png', url: '/pages/category/category?type=help' },
//       { id: 3, label: '经验分享', icon: '/images/share.png', url: '/pages/category/category?type=share' },
//       { id: 4, label: '校园地图', icon: '/images/map.png', url: '/pages/map/map' }
//     ],
//     page: 1,
//     size: 5,
//     hasMore: true
//   },
//   onLoad() {
//     this.loadPosts();
//   },
//   onShow() {
//     if (typeof this.getTabBar === 'function' && this.getTabBar()) {
//       this.getTabBar().setData({
//         selected: 0
//       });
//     }
//   },
//   async loadPosts() {
//     if (!this.data.hasMore) return;

//     wx.showLoading({
//       title: '加载中...',
//     });

//     try {
//       const res = await wx.request({
//         url: 'http://70c07780.r28.cpolar.top/post/list/', // 替换为你的后端 API 地址
//         method: 'GET',
//         data: {
//           page: this.data.page,
//           limit: this.data.size
//         },
//         header: {
//           'content-type': 'application/json'
//         },
//         success(e){
//           console.log(e.data);
//         },
//         fail(e){
//           console.log(e.data);
//         }

//       });

//       const newPosts = res.data.posts || []; // 假设后端返回的数据结构为 { posts: [] }

//       this.setData({
//         posts: this.data.posts.concat(newPosts),
//         page: this.data.page + 1,
//         hasMore: newPosts.length === this.data.size
//       });

//       wx.hideLoading();

//     } catch (error) {
//       wx.hideLoading();
//       wx.showToast({
//         title: '加载失败',
//         icon: 'none'
//       });
//     }
//   },
//   onReachBottom() {
//     this.loadPosts();
//   },
//   navigateToSearch() {
//     wx.navigateTo({
//       url: '/pages/search/search'
//     });
//   },
//   navigate(event) {
//     const { url } = event.currentTarget.dataset;
//     wx.navigateTo({
//       url: url
//     });
//   }
// });


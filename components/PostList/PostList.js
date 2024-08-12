Component({
  properties: {
    posts: {
      type: Array,
      value: []
    }
  },
  methods: {
    navigateToDetail(event) {
      const { post_id } = event.currentTarget.dataset;
      wx.navigateTo({
        url: `/pages/postDetail/postDetail?id=${post_id}`
      });
    }
  }
});

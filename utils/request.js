const baseUrl = 'http://70c07780.r28.cpolar.top';

const request = (url, method, data = {}, header = {}) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + url,
      method: method,
      data: data,
      header: {
        'Content-Type': 'application/json',
        ...header
      },
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(res.data);
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
};

module.exports = {
  get: (url, data, header) => request(url, 'GET', data, header),
  post: (url, data, header) => request(url, 'POST', data, header),
  put: (url, data, header) => request(url, 'PUT', data, header),
  delete: (url, data, header) => request(url, 'DELETE', data, header),
};

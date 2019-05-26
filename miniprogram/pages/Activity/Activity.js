// miniprogram/pages/Activity/Activity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      array: [{
        mode: 'scaleToFill',
        text: 'scaleToFill：不保持纵横比缩放图片，使图片完全适应'
      }, {
        mode: 'center',
        text: 'center：不缩放图片，只显示图片的中间区域',
      }],
      src: '../../images/1.jpg',
      open: false,
      mark: 0,
      newmark: 0,
      istoright: true,
      
  },
  click_ToActivityDetail: function (e) {
    var id = e.currentTarget.dataset.id;
    let activity = JSON.stringify(this.data.Activity_list[id])
    wx.navigateTo({
      url: '../ActivityDetail/ActivityDetail?activity='+activity,
    })//点击跳转
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //创建一个变量来保存页面Page示例中的this,方便后续使用
    var _this = this;
    const db = wx.cloud.database({
      env: 'testdemo-cba87d'
    })
    db.collection('ActivityApply').get({
      success: res => {
        this.setData({
          Activity_list: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
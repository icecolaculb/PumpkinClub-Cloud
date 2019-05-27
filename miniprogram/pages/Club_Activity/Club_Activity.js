// miniprogram/pages/Club_Activity/Club_Activity.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  click_ToActivityDetail: function (e) {
    var id = e.currentTarget.dataset.id;
    let activity = JSON.stringify(this.data.Activity_list[id])
    wx.navigateTo({
      url: '../ActivityDetail/ActivityDetail?activity=' + activity,
    })//点击跳转
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var openid = options.openid
    this.setData({
      openid:openid
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const db = wx.cloud.database()
    db.collection('ActivityApply').where({
      Clubopenid: this.data.openid
    })
      .get({
        success: res => {
          this.setData({
            Activity_list:res.data
          })
        }
      })
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
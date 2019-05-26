// miniprogram/pages/Activitymanage/Activitymanage.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  Add:function(){
    wx.navigateTo({
      url: '../EP/EP',
    })
  },
  Update: function () {

  },
  Delete: function () {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
getactivitylist(){
  const db = wx.cloud.database()
  db.collection('ActivityAply').where({
    Clubopenid: app.OPENID
  })
    .get({
      success: res => {
        this.setData({
          Activity_list: res.data
        })
      }
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
    this.getactivitylist()
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
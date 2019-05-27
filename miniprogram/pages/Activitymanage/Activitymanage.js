// miniprogram/pages/Activitymanage/Activitymanage.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Activity_list:[]
  },
  Add:function(){
    wx.navigateTo({
      url: '../EP/EP',
    })
  },
  click_ToActivityDetail: function (e) {
    var id = e.currentTarget.dataset.id;
    var list = JSON.stringify(this.data.Activity_list[id]);
    wx.navigateTo({
      url: '../Activity_D_or_U/Activity_D_or_U?list='+list,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
getactivitylist(){
  // 查询
  wx.cloud.callFunction({
    name: 'runDB',
    data: {
      type: "get", //指定操作是get
      db: "ActivityApply", //指定操作的数据表
      condition: { // 指定查询条件
        Clubopenid: app.OPENID
      },
      limit: 20, // 查询条数
      skip: 0 // 忽略之前的椰树， 比如查询第20到第40条，则指定 1
    },
    success: res => {
      this.setData({
        Activity_list: res.result.data
      })
    },
    fail: err => {
      console.error('[云函数] [insertDB] 增加Subject失败', err)
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
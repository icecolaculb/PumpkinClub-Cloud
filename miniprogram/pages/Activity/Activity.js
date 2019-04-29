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
      Activity: [
        {
          ActivityName: "死命肝",
          ActivityDetail: "死命肝的简介",
          src: "../../images/1.jpg",

        },
        {
          ActivityName: "活动A",
          ActivityDetail: "活动A的简介",
          src: "../../images/1.jpg",

        },
        {
          ActivityName: "活动B",
          ActivityDetail: "活动B的简介",
          src: "../../images/1.jpg",

        },
        {
          ActivityName: "活动C",
          ActivityDetail: "活动C的简介",
          src: "../../images/1.jpg",

        },
        {
          ActivityName: "活动D",
          ActivityDetail: "活动D的简介",
          src: "../../images/1.jpg",
        },
        {
          ActivityName: "活动E",
          ActivityDetail: "活动E的简介",
          src: "../../images/1.jpg",
        },
        {
          ActivityName: "活动F",
          ActivityDetail: "活动F的简介",
          src: "../../images/1.jpg",
        },
        {
          ActivityName: "活动G",
          ActivityDetail: "活动G的简介",
          src: "../../images/1.jpg",
        }
      ],
  },
  click_ToActivityDetail: function () {
    wx.navigateTo({
      url: '../ActivityDetail/ActivityDetail',
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
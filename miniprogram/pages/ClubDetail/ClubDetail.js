// miniprogram/pages/ClubDetail/ClubDetail.js
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
    club:[],
    ClubName:'',
    ClubIntroduction:'',
    Clubuserinformation:'',
    ClubCollege:'',
    ClubLogo:''
  },
  
  btn_Join_click: function () {
    wx.navigateTo({
      url: '../ClubJoin/ClubJoin',
    })//点击跳转
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this
    var arr = JSON.parse(options.Club)
    this.setData({
      club:arr
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      ClubLogo: this.data.club.ClubLogo,
      ClubName: this.data.club.ClubName,
      ClubIntroduction: this.data.club.ClubIntroduction,
      Clubuserinformation: this.data.club.ClubMember,
      ClubCollege: this.data.club.CollegeID,
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
// miniprogram/pages/AE/AE.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    college:'',
    spciality:'',
    studentnumber:'',
    QQ:'',
    tel:'',
    photosrc:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    var arr = JSON.parse(options.user)
    var openid= options._openid
    this.setData({
      user: arr,
      openid:openid,
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
    this.setData({
      name: this.data.user.Name,
      college: this.data.user.College,
      spciality: this.data.user.Speciality,
      studentnumber: this.data.user.StudentNumber,
      QQ: this.data.user.qq,
      tel: this.data.user.tel,
      photosrc: this.data.user.Photosrc,
    })
  },
  Yes:function(){
      const db=wx.cloud.database()
      const _=db.command
      db.collection('Club').doc(this.data.user.Club_id).update({
        data:{
          ClubMember:_.push([
            {
              userid: this.data.user.Userid,
              username: this.data.user.Name,
              userpost: '会员',
            }
          ]),
        }
      })
      this.update()
      this.ApplyDelete()
  },
  No: function () {
    this.ApplyDelete()
  },
  update(){
    wx.cloud.callFunction({
      name: 'runDB',
      data: {
        type: "update", //指定操作是update
        db: "User", //指定操作的数据表
        indexKey: this.data.user.Userid, // 指定要更新的 _id
        data: { //指定update的数据
          FavoriteClubID:app.favoriteclubid
        }
      },
      success: res => {
      },
      fail: err => {
        console.error('[云函数] [insertDB] 增加Subject失败', err)
      }
    })
  },
  ApplyDelete(){
    wx.cloud.callFunction({
      name: 'runDB',
      data: {
        type: "delete", //指定操作是delete
        db: "ClubApply", //指定操作的数据表
        condition: { // 指定删除条件
          Name: this.data.name,
          Speciality: this.data.spciality,
          qq: this.data.QQ,
          tel: this.data.tel,
          exist: false,
        }
      },
      success: res => {
        wx.navigateBack({
          delta: 1,
        })
      },
      fail: err => {
        console.error('[云函数] [insertDB] 增加Subject失败', err)
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
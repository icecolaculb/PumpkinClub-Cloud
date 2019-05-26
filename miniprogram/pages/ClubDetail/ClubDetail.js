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
    ClubLogo:'',
    clubopenid:'',
    openid:'',
    Length:'',
    xx:[],//用户个人信息
  },
  btn_Activity_click:function(){
    var openid = this.data.clubopenid
    wx.navigateTo({
      url: '../Club_Activity/Club_Activity?openid='+openid,
    })
  },
  btn_Join_click: function () {
    var xxid=this.data.xx._id
    var memberid=this.data.club.ClubMember
    var exist=false
    for(var i in memberid){
      if(memberid[i].userid==xxid){
        exist=true
      }
    }
    if (this.data.Length == 0) {
      wx.showModal({
        title: '提醒',
        content: '请先填写个人信息',
        cancelText: '关闭',
        confirmText: '前往填写',
        success(res) {
          if (res.confirm) {
            let arr1 = []
            wx.navigateTo({
              url: '../ClubJoin/ClubJoin?arr=' + arr1,
            })
          }
        }
      })
    }
    else {
      if (exist == true) {
        wx.showToast({
          title: '你已加入该社团',
          icon: 'loading'
        })
      }
      else {
        this.Add();
      }
    }
    
    
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
    this.getOpenid();
  },
  Add() {
    wx.cloud.callFunction({
      name: 'runDB',
      data: {
        type: "insert", //指定操作是insert  
        db: "ClubApply", //指定操作的数据表
        data: {
          Userid:this.data.xx._id,
          Name:this.data.xx.UserName,
          qq:this.data.xx.ContactInformation.QQ,
          tel:this.data.xx.ContactInformation.tel,
          StudentNumber:this.data.xx.StudentNumber,
          College: this.data.xx.UserCollege,
          Speciality: this.data.xx.UserSpeciality,
          Photosrc: this.data.xx.Photosrc,
          Clubopenid: this.data.clubopenid,
          Club_id:this.data.club._id,
          exist:false,
        }
      },
      success: res => {
        wx.showToast({
          title: '请等待社长审核',
        })
      },
      fail: err => {
        console.error('[云函数] [insertDB] 增加Club失败', err)
      }
    })
  },
  Get(){
    const db = wx.cloud.database()
    db.collection('User').where({
      _openid: this.data.clubopenid,
    }).get({
      success: res => {
        console.log(res.data)
        this.setData({
          Length:res.data.length,
          xx:res.data[0]
        })
        console.log(this.data.Length)
      }
    })
  },
  // 获取用户openid
  getOpenid() {
    let that = this;
    wx.cloud.callFunction({
      name: 'getOpenID',
      complete: res => {
        var openid = res.result.openId;
        that.setData({
          openid: openid
        })
      }
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
      clubopenid:this.data.club._openid,
    });
    this.Get();

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
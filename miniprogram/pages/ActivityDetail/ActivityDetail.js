// miniprogram/pages/ActivityDetail/ActivityDetail.js
var app=getApp()
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
    src: '../../images/1.jpg'
  },
  btn_Join_click: function () {
    wx.showToast({
      title: '关注成功',
    })
    const db = wx.cloud.database()
    const _ = db.command
    let a_id = this.data.activity._id
    let joinnumber = this.data.activity.JoinNumber+1
    let favoriteActivity = this.data.user.FavoriteActivityID
    let exist = false
    for (var i in favoriteActivity){
      if (a_id == favoriteActivity[i]){
        exist=true
      }
    }
    console.log(joinnumber)
   if(exist==false){
     db.collection('User').doc(this.data.user._id).update({
       data: {
         FavoriteActivityID: _.unshift(this.data.activity._id),
       }
     })
     db.collection('ActivityApply').doc(a_id).update({
       data: {
         JoinNumber: 5,
       }
     })
   }
   else{
     wx.showToast({
       title: '已关注该活动',
     })
   }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    var arr = JSON.parse(options.activity)
    this.setData({
      activity: arr
    })
    // 查询
    
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
    //创建一个变量来保存页面Page示例中的this,方便后续使用
    var _this = this;
    const db = wx.cloud.database({
      env: 'testdemo-cba87d'
    })
    db.collection('Club').where({
      _openid:this.data.activity.Clubopenid
      }).get({
      success: res => {
        this.setData({
          club: res.data[0]
        })
      }
    })
    db.collection('User').where({
      _openid: app.OPENID
    }).get({
      success: res => {
        this.setData({
          user: res.data[0]
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
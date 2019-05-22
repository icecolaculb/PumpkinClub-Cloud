//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    name: '',
    openid: '',
    text:'个人信息',
    xx:[],
    _id:'',
    personurl:'',
    PMurl:'',
    mycluburl:'../MyClub/MyClub',
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
        this.setData({
          PMurl: '../PM/PM?_openid=' + openid,
        })
      }
    })
  },
  onLoad: function () {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
    this.getOpenid();

  },
  onShow:function(){
    let _this = this
    
    const db = wx.cloud.database()
    db.collection('User').where({
      _openid: this.data.openid,
    })
      .get({
        success: res => {
          
          if(res.data.length==0){
            let arr1=[]
            this.setData({
              personurl: '../ClubJoin/ClubJoin?arr='+arr1,
            })
          }else{
            this.setData({
              xx: JSON.stringify(res.data[0]),
              _id:res.data[0]._id,
            })
            let arr = this.data.xx;
            let id = this.data._id
            let Clubid = JSON.stringify(res.data[0].FavoriteClubID)
            this.setData({
              personurl: '../ClubJoin/ClubJoin?arr=' + arr,
              mycluburl:'../MyClub/MyClub?_id=' + id + '&Clubid='+Clubid,
            })
          }
        }
      })
  },

  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },
})

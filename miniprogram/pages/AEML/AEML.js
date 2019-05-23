// miniprogram/pages/AEML/AEML.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _openid:'',
    clubid:'',
    user_list:[],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var openid = options._openid
    this.setData({
      _openid: openid
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  click_ToClubDetail: function (e) {
    var id = e.currentTarget.dataset.id;
    let _openid=this.data._openid
    let user_list = JSON.stringify(this.data.user_list[id])
    const db=wx.cloud.database()
    db.collection('User').doc(this.data.user_list[id].Userid).get({
      success:res=>{
        this.setData({
          clubid:res.data.FavoriteClubID
        })
        var clubID = this.data.clubid
        clubID.push(this.data._openid)
        app.favoriteclubid=clubID
      }
    })
    wx.navigateTo({
      url: '../AE/AE?user=' + user_list + '&_openid=' + _openid ,
    })//点击跳转
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _this = this;
    // 查询
    wx.cloud.callFunction({
      name: 'runDB',
      data: {
        type: "get", //指定操作是get
        db: "ClubApply", //指定操作的数据表
        condition: { // 指定查询条件
          Clubopenid:this.data._openid,
          exist:false
        },
        limit: 20, // 查询条数
        skip: 0 // 忽略之前的椰树， 比如查询第20到第40条，则指定 1
      },
      success: res => {
        this.setData({
          user_list:res.result.data
          
        })
        var list=this.data.user_list
        var arr=[]
        arr.push(list[0])
        for (var i in list) {
          for(var index in arr){
            if ( arr[index].Userid != (list[i].Userid)){
           
              arr.push(list[i])
           }
          }
         this.setData({
           user_list:arr
         })
        }
      },
      fail: err => {
        console.error('[云函数] [insertDB] 增加Subject失败', err)
      }
    })
    wx.cloud.callFunction({
      name: 'runDB',
      data: {
        type: "get", //指定操作是get
        db: "ClubApply", //指定操作的数据表
        condition: { // 指定查询条件
          Clubopenid:this.data._openid,
          exist:false
        },
        limit: 20, // 查询条数
        skip: 0 // 忽略之前的椰树， 比如查询第20到第40条，则指定 1
      },
      success: res => {
        this.setData({
          user_list:res.result.data
        })
      },
      fail: err => {
        console.error('[云函数] [insertDB] 增加Subject失败', err)
      }
    })
    wx.cloud.callFunction({
      name: 'runDB',
      data: {
        type: "get", //指定操作是get
        db: "ClubApply", //指定操作的数据表
        condition: { // 指定查询条件
          Clubopenid:this.data._openid,
          exist:false
        },
        limit: 20, // 查询条数
        skip: 0 // 忽略之前的椰树， 比如查询第20到第40条，则指定 1
      },
      success: res => {
        this.setData({
          user_list:res.result.data
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

  },
  
})
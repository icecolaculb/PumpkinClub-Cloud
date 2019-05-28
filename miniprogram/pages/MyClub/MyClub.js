// miniprogram/pages/MyClub/MyClub.js
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
    Club:[],
    Club_list:[],
  },
  click_ToClubDetail: function (e) {
    var id = e.currentTarget.dataset.id;
    let club_list = JSON.stringify(this.data.Club[id])
    wx.navigateTo({
      url: '../ClubDetail/ClubDetail?Club=' + club_list,
    })//点击跳转
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _id= options._id
    var Clubid = JSON.parse(options.Clubid)
    this.setData({
      id:_id,
      Club_list:Clubid,
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
    let club = this.data.Club_list
    for (var index in club) {
      const db = wx.cloud.database()
      db.collection('Club').where({
        _openid: club[index]
      })
        .get({
          success: res => {
            let Club1 = this.data.Club
            Club1.push(res.data[0])
            this.setData({
              Club: Club1
            })
          }
        })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      Club:[]
    })
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
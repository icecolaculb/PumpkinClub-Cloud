// miniprogram/pages/Club/Club.js
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
      open: false,
      mark: 0,
      newmark: 0,
      istoright: true,
      Club_list:[],
      College: [
        { CollegeName: "全部社团" },
        { CollegeName: "校级社团" },
        { CollegeName: "计算机学院" },
        { CollegeName: "衡阳医学院" },
        { CollegeName: "核科学技术学院", },
        { CollegeName: "机械工程学院", },
        { CollegeName: "设计艺术学院", },
        { CollegeName: "化学化工学院", },
        { CollegeName: "数理学院", },
        { CollegeName: "语言文学学院", },
        { CollegeName: "体育学院", },
        { CollegeName: "船山学院", },
        { CollegeName: "电气工程学院", },
        { CollegeName: "资源环境与安全学院", },
        { CollegeName: "土木工程学院", },
        { CollegeName: "药学院", },
        { CollegeName: "护理学院", },
        { CollegeName: "经济管理与法学学院", },
        { CollegeName: "马克思主义学院", },
        { CollegeName: "国际学院", },
        { CollegeName: "公共卫生学院", },
        { CollegeName: "继续教育学院", },
        { CollegeName: "国防科学技术学院", },
        { CollegeName: "创新创业学院", },
        { CollegeName: "建筑学院", }
      ],
  },
    click_ToClubDetail: function (e) {
      var id = e.currentTarget.dataset.id;
      let club_list=JSON.stringify(this.data.Club_list[id])
      wx.navigateTo({
        url: '../ClubDetail/ClubDetail?Club='+club_list,
      })//点击跳转
    },
    click_Club: function () {
      wx.navigateTo({
        url: '',
      })
    },
    tap_ch: function (e) {
      if (this.data.open) {
        this.setData({
          open: false
        });
      } else {
        this.setData({
          open: true
        });
      }
    },
    tap_start: function (e) {
      // touchstart事件 
      this.data.mark = this.data.newmark = e.touches[0].pageX;
    },
    tap_drag: function (e) {
      // touchmove事件 

      /* 
       * 手指从左向右移动 
       * @newmark是指移动的最新点的x轴坐标 ， @mark是指原点x轴坐标 
       */
      this.data.newmark = e.touches[0].pageX;
      if (this.data.mark < this.data.newmark) {
        this.istoright = true;
      }
      /* 
       * 手指从右向左移动 
       * @newmark是指移动的最新点的x轴坐标 ， @mark是指原点x轴坐标 
       */
      if (this.data.mark > this.data.newmark) {
        this.istoright = false;

      }
      this.data.mark = this.data.newmark;

    },
    tap_end: function (e) {
      // touchend事件 
      this.data.mark = 0;
      this.data.newmark = 0;
      if (this.istoright) {
        this.setData({
          open: true
        });
      } else {
        this.setData({
          open: false
        });
      }
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
    //创建一个变量来保存页面Page示例中的this,方便后续使用
    var _this = this;
    const db = wx.cloud.database({
      env: 'testdemo-cba87d'
    })
    db.collection('Club').where({
      exist:true
    }).get({
      success: res => {
        this.setData({
          Club_list: res.data
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
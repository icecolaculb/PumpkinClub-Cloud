// miniprogram/pages/Activity_D_or_U/Activity_D_or_U.js
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
    src: 'cloud://testdemo-cba87d.7465-testdemo-cba87d/photo.jpg',
    ActivityName: '',
    ActivityStartTime: '',
    ActivityEndTime: '',
    ActivityIntroduction: '',//活动简介
    open_id: '',

  },
  btn_Join_Click: function () {
    wx.showToast({
      title: '修改成功',
    })
  },
  gotoShow: function () {
    var _this = this
    wx.chooseImage({
      count: 9, // 最多可以选择的图片张数，默认9
      sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success(res) {
        wx.showLoading({
          title: '上传中',
        });
        //选择完成会先返回一个临时地址保存备用
        let filePath = res.tempFilePaths[0];
        const name = Math.random() * 1000000;
        const cloudPath = name + filePath.match(/\.[^.]+?$/)[0]
        //将照片上传至云端需要刚才存储的临时地址
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success(res) {
            //上传成功后会返回永久地址
            console.log(res.fileID)
            that.setData({
              src: res.fileID,//云存储图片路径,可以把这个路径存到集合，要用的时候再取出来
            });
          },
          complete: () => {
            wx.hideLoading()
          }

        })
      }
    })
  },
  ActivityNameInput: function (e) {
    this.setData({
      ActivityName: e.detail.value,
    })
  },

  ActivityStartTime: function (e) {
    this.setData({
      ActivityStartTime: e.detail.value,
    })
  },

  ActivityEndTimeInput: function (e) {
    this.setData({
      ActivityEndTime: e.detail.value,
    })
  },

  ActivityIntroduction: function (e) {
    this.setData({
      ActivityIntroduction: e.detail.value,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    var arr = JSON.parse(options.list)
    this.setData({
      activity: arr,
      ActivityName: arr.ActivityName,
      ActivityStartTime: arr.ActivityStartTime,
      ActivityEndTime: arr.ActivityEndTime,
      ActivityIntroduction: arr.ActivityIntroduction,
      src:arr.src,
    })
  },
  btn_Update_Click:function(){
    // 更新
    wx.cloud.callFunction({
      name: 'runDB',
      data: {
        type: "update", //指定操作是update
        db: "ActivityApply", //指定操作的数据表
        indexKey: this.data.activity._id, // 指定要更新的 _id
        data: { //指定update的数据
          src: this.data.src,
          ActivityName: this.data.ActivityName,
          ActivityStartTime: this.data.ActivityStartTime,
          ActivityEndTime: this.data.ActivityEndTime,
          ActivityIntroduction: this.data.ActivityIntroduction,
        }
      },
      success: res => {
        wx.navigateBack({
          delta: 1,
          success: function () {
            wx.showToast({
              title: '修改成功',
            })
          }
        })
      },
      fail: err => {
        console.error('[云函数] [insertDB] 增加Subject失败', err)
      }
    })
  },
  btn_Delete_Click:function(){
    // 删除
    wx.cloud.callFunction({
      name: 'runDB',
      data: {
        type: "delete", //指定操作是delete
        db: "ActivityApply", //指定操作的数据表
        condition: { // 指定删除条件
          _id: this.data.activity._id
        }
      },
      success: res => {
        wx.navigateBack({
          delta: 1,
          success: function () {
            wx.showToast({
              title: '删除成功',
            })
          }
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
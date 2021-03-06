// miniprogram/pages/CreateClub/CreateClub.js
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
    usex: ['男', '女'],
    user_array: [
      {
        id: 0,
        name: '男'
      },
      {
        id: 1,
        name: '女'
      }
    ], 
    College: ['校级社团', '计算机学院', '衡阳医学院', '核科学技术学院', '机械工程学院', '设计艺术学院', '化学化工学院', '数理学院', '语言文学学院', '体育学院', '船山学院', '电气工程学院', '资源环境与安全学院', '土木工程学院', '药学院', '护理学院', '经济管理与法学学院', '马克思主义学院', '国际学院', '公共卫生学院', '继续教育学院', '国防科学技术学院', '创新创业学院', '建筑学院',],
    College_array: [
      { id: 0, name: "校级社团" },
      { id: 1, name: "计算机学院" },
      { id: 2, name: "衡阳医学院" },
      { id: 3, name: "核科学技术学院", },
      { id: 4, name: "机械工程学院", },
      { id: 5, name: "设计艺术学院", },
      { id: 6, name: "化学化工学院", },
      { id: 7, name: "数理学院", },
      { id: 8, name: "语言文学学院", },
      { id: 9, name: "体育学院", },
      { id: 10, name: "船山学院", },
      { id: 11, name: "电气工程学院", },
      { id: 12, name: "资源环境与安全学院", },
      { id: 13, name: "土木工程学院", },
      { id: 14, name: "药学院", },
      { id: 15, name: "护理学院", },
      { id: 16, name: "经济管理与法学学院", },
      { id: 17, name: "马克思主义学院", },
      { id: 18, name: "国际学院", },
      { id: 19, name: "公共卫生学院", },
      { id: 20, name: "继续教育学院", },
      { id: 21, name: "国防科学技术学院", },
      { id: 22, name: "创新创业学院", },
      { id: 23, name: "建筑学院", }
    ],
    College_index:0,
    usex_index:0,
    src: '',//社团logo地址
    clubname:'',//社团名称
    clubusername:'',//社长姓名
    clubintroduction:'',//社团简介
    clubuserinformation:'',//联系方式
    chaptersrc:''//校章文件地址
  },
  bindPickerChange_College: function (e) {
    this.setData({   //给变量赋值
      College_index: e.detail.value,  //每次选择了下拉列表的内容同时修改下标然后修改显示的内容，显示的内容和选择的内容一致
    })
  },
  bindPickerChange_usex: function (e) {
    this.setData({   //给变量赋值
      usex_index: e.detail.value,  //每次选择了下拉列表的内容同时修改下标然后修改显示的内容，显示的内容和选择的内容一致
    })
  },
  //建立社团名称的数据
  clubnameinput: function (e) {
    this.setData({
      clubname: e.detail.value,
    })
  },
  //建立社长姓名的数据
  clubusernameinput:function(e){
    this.setData({
      clubusername:e.detail.value,
    })
  },
  //建立社团简介的数据
  bindTextAreainput:function (e) {
    this.setData({
      clubintroduction: e.detail.value,
    })
  },
  //建立联系方式的数据
  clubuserinformationinput:function(e){
    this.setData({
      clubuserinformation:e.detail.value,
    })
  }, 
  btn_Join_Click: function () {
    onAdd:{
      const db = wx.cloud.database()
      db.collection('Club').add({
        data: {
          ClubIntroduction: this.data.clubintroduction,
          ClubLevel: 4,
          ClubLogo: this.data.src,
          Clubchapter: this.data.chaptersrc,
          ClubMember: [
              {
                userid:1,
                username: this.data.clubusername,
                userpost: '社长',
              }
          ],
          ClubName: this.data.clubname,
          CollegeID: this.data.College[this.data.College_index],
          ClubInformations: this.data.clubuserinformation,
          exist:false,
          read:false,
        },
        success: res => {
          wx.navigateBack({
            delta: 2,
            success: function () {
              wx.showToast({
                title: '提交成功',
              })
            }
          })
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '提交失败'
          })
          console.error('[数据库] [新增记录] 失败：', err)
        }
      })
    }
  },
  gotoShow1: function () {
    let that=this;
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album','camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success(res) {
        wx.showLoading({
          title: '上传中',
        });
        //选择完成会先返回一个临时地址保存备用
        let filePath = res.tempFilePaths[0];
        const name = Math.random()*1000000;
        const cloudPath = name + filePath.match(/\.[^.]+?$/)[0]
        //将照片上传至云端需要刚才存储的临时地址
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success(res) {
            //上传成功后会返回永久地址
            that.setData({
              src: res.fileID,//云存储图片路径,可以把这个路径存到集合，要用的时候再取出来
            });
          },
          
        })
      },
          fail: e => {
            console.error('[上传图片] 失败：', e)
          },
          complete: () => {
            wx.hideLoading()
          }
        })
      
  },
  gotoShow2: function () {
    let that = this;
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
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
            that.setData({
              chaptersrc: res.fileID,//云存储图片路径,可以把这个路径存到集合，要用的时候再取出来
            });
          },

        })
      },
      fail: e => {
        console.error('[上传图片] 失败：', e)
      },
      complete: () => {
        wx.hideLoading()
      }
    })
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
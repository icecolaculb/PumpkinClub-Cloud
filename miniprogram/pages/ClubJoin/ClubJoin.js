// miniprogram/pages/ClubJoin/ClubJoin.js
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
      src: '../../Images/photo.jpg',
    College: [ '计算机学院', '衡阳医学院', '核科学技术学院', '机械工程学院', '设计艺术学院', '化学化工学院', '数理学院', '语言文学学院', '体育学院', '船山学院', '电气工程学院', '资源环境与安全学院', '土木工程学院', '药学院', '护理学院', '经济管理与法学学院', '马克思主义学院', '国际学院', '公共卫生学院', '继续教育学院', '国防科学技术学院', '创新创业学院', '建筑学院',],
    College_array: [
      { id: 0, name: "计算机学院" },
      { id: 1, name: "衡阳医学院" },
      { id: 2, name: "核科学技术学院", },
      { id: 3, name: "机械工程学院", },
      { id: 4, name: "设计艺术学院", },
      { id: 5, name: "化学化工学院", },
      { id: 6, name: "数理学院", },
      { id: 7, name: "语言文学学院", },
      { id: 8, name: "体育学院", },
      { id: 9, name: "船山学院", },
      { id: 10, name: "电气工程学院", },
      { id: 11, name: "资源环境与安全学院", },
      { id: 12, name: "土木工程学院", },
      { id: 13, name: "药学院", },
      { id: 14, name: "护理学院", },
      { id: 15, name: "经济管理与法学学院", },
      { id: 16, name: "马克思主义学院", },
      { id: 17, name: "国际学院", },
      { id: 18, name: "公共卫生学院", },
      { id: 19, name: "继续教育学院", },
      { id: 20, name: "国防科学技术学院", },
      { id: 21, name: "创新创业学院", },
      { id: 22, name: "建筑学院", }
    ],
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
    usex_index: 0,
    College_index: 0,
    QQ:'',            //qq
    PhoneNumber:'',   //手机号
    StudentNumber:'', //学号
    UserSpeciality:'',//专业
    UserName:'',      //姓名
    Clubid:'',        //加入的社团的_id
    openid:'',        //用户openid
    Mumbersum:'',     //社团会员人数
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
  //建立手机号的数据
  PhoneNumberinput: function (e) {
    this.setData({
      PhoneNumber: e.detail.value,
    })
  },
  //建立qq的数据
  QQinput: function (e) {
    this.setData({
      QQ: e.detail.value,
    })
  },
  //建立学号的数据
  StudentNumberinput:function(e){
    this.setData({
      StudentNumber:e.detail.value,
    })
  },
  //建立姓名的数据
  UserNameinput:function(e){
    this.setData({
      UserName:e.detail.value,
    })
  },
  //建立专业的数据
  UserSpecialityinput:function(e){
    this.setData({
      UserSpeciality: e.detail.value,
    })
  },

    btn_Join_Click: function () {
    this.upDate()

    onAdd: {
      const db = wx.cloud.database()
      db.collection('User').add({
        data: {
          ContactInformation: [
            [
              'QQ',this.data.QQ
            ],
            [
              '手机号', this.data.PhoneNumber
            ]
          ],
          FavoriteActivityID:[],
          FavoriteClubID: [
            this.data.Clubid
          ],
          Photosrc: this.data.src,
          StudentNumber:this.data.StudentNumber,
          UserCollege: this.data.College[this.data.College_index],
          UserName:this.data.UserName,
          UserSpeciality: this.data.UserSpeciality,
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
  upDate(){
    
    wx.cloud.callFunction({
      name: 'runDB',
      data: {
        type: "update", //指定操作是insert  
        db: "Club", //指定操作的数据表
        data: { //指定insert的数据
          indexKey: this.data.Clubid,
          ClubMember: [
            [
              ['用户编号', parseInt(this.data.Membersum) + 1],
              ['姓名', this.data.UserName],
              ['性别', this.data.usex[this.data.usex_index]],
              ['职位', '会员'],
              ['联系方式', this.data.QQ]
            ]
          ]
          
        }
      },
      success: res => {
        console.log('[云函数] [insertDB] 已增加Subjcts信息' + res.result._id)
      },
      fail: err => {
        console.error('[云函数] [insertDB] 增加Subject失败', err)
      }
    })
  },
  onLoad: function (options) {
    var _this=this
    var clubid = options._id
    var membersum = options.membersum
    this.setData({
        Clubid:clubid,
        Membersum:membersum,
    }),
      this.getOpenid();
    
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

  gotoShow: function () {
    let that = this;
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success(res) {
        wx.showToast({
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
    gotoShow: function () {
      var _this = this
      wx.chooseImage({
        count: 9, // 最多可以选择的图片张数，默认9
        sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album'], // album 从相册选图，camera 使用相机，默认二者都有
        success: function (res) {
          // success
          console.log(res)
          _this.setData({
            src: res.tempFilePaths
          })
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
    },
    
  
})
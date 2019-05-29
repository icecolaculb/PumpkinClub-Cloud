// pages/databaseGuide/databaseGuide.js

const app = getApp()

Page({

  data: {
    step: 1,
    counterId: '',
    openid: '',
    count: null,
    queryResult: '',
    
  },

  onLoad: function (options) {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
  },

  onAdd: function () {
     const db = wx.cloud.database()
     db.collection('Club').add({
       data: {
         ClubID: 1,
         ClubIntroduction: '社团简介哦，厉害了，牛逼',
         ClubLevel: 4,
         ClubLogo: 'cloud://testdemo-cba87d.7465-testdemo-cba87d/1.jpg',
         ClubMember: [
           [
             [
               '用户编号',
                2
             ],
             [
               '姓名',
               '程钰斌'
             ],
             [
               '性别',
               '女'
             ],
             [
               '职位',
               '社长'
             ],
             [
               '联系方式',
               '无'
             ]
           ]
         ],
         Activity:[
           [
             [
               '活动编号',
               1
             ],
             [
               '具体内容文件',
               '真正的内容'
             ],
             [
               '发布时间',
               '2019-1-1'
             ],
             [
               '截至时间',
               '2019-2-2'
             ],
             [
               '排序有限度',
               '111'
             ]
           ]
         ]
         ,
         ClubName: '什么东西',
         CollegeID: '计算机学院',
       },
       success: res => {
         // 在返回结果中会包含新创建的记录的 _id
         this.setData({
           
           counterId: res._id,
         })
         wx.showToast({
           title: '新增记录成功',
         })
         console.log('[数据库] [新增记录] 成功，记录社团信息: ', res._id)
       },
       fail: err => {
         wx.showToast({
           icon: 'none',
           title: '新增记录失败'
         })
         console.error('[数据库] [新增记录] 失败：', err)
       }
     })
  },

  onQuery: function() {
     const db = wx.cloud.database()
     // 查询当前用户所有的 counters
     db.collection('Club').where({
       _openid: this.data.openid
     }).get({
       success: res => {
         this.setData({
           queryResult: JSON.stringify(res.data, null, 2)
         })
         console.log('[数据库] [查询记录] 成功: ', res)
       },
       fail: err => {
         wx.showToast({
           icon: 'none',
           title: '查询记录失败'
         })
         console.error('[数据库] [查询记录] 失败：', err)
       }
     })
  },

  onCounterInc: function() {
     const db = wx.cloud.database()
     const newCount = this.data.count + 1
     db.collection('Club').doc(this.data.ClubId).update({
       data: {
         count: newCount
       },
       success: res => {
         this.setData({
           count: newCount
         })
       },
       fail: err => {
         icon: 'none',
         console.error('[数据库] [更新记录] 失败：', err)
       }
     })
  },

  onCounterDec: function() {
     const db = wx.cloud.database()
     const newCount = this.data.count - 1
     db.collection('counters').doc(this.data.counterId).update({
       data: {
         count: newCount
       },
       success: res => {
         this.setData({
           count: newCount
         })
       },
       fail: err => {
         icon: 'none',
         console.error('[数据库] [更新记录] 失败：', err)
       }
     })
  },

  onRemove: function() {
    // if (this.data.counterId) {
    //   const db = wx.cloud.database()
    //   db.collection('counters').doc(this.data.counterId).remove({
    //     success: res => {
    //       wx.showToast({
    //         title: '删除成功',
    //       })
    //       this.setData({
    //         counterId: '',
    //         count: null,
    //       })
    //     },
    //     fail: err => {
    //       wx.showToast({
    //         icon: 'none',
    //         title: '删除失败',
    //       })
    //       console.error('[数据库] [删除记录] 失败：', err)
    //     }
    //   })
    // } else {
    //   wx.showToast({
    //     title: '无记录可删，请见创建一个记录',
    //   })
    // }
  },

  nextStep: function () {
    // 在第一步，需检查是否有 openid，如无需获取
    if (this.data.step === 1 && !this.data.openid) {
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          app.globalData.openid = res.result.openid
          this.setData({
            step: 2,
            openid: res.result.openid
          })
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '获取 openid 失败，请检查是否有部署 login 云函数',
          })
          console.log('[云函数] [login] 获取 openid 失败，请检查是否有部署云函数，错误信息：', err)
        }
      })
    } else {
      const callback = this.data.step !== 6 ? function() {} : function() {
        console.group('数据库文档')
        console.log('https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database.html')
        console.groupEnd()
      }

      this.setData({
        step: this.data.step + 1
      }, callback)
    }
  },

  prevStep: function () {
    this.setData({
      step: this.data.step - 1
    })
  },

  goHome: function() {
    const pages = getCurrentPages()
    if (pages.length === 2) {
      wx.navigateBack()
    } else if (pages.length === 1) {
      wx.redirectTo({
        url: '../index/index',
      })
    } else {
      wx.reLaunch({
        url: '../index/index',
      })
    }
  }

})
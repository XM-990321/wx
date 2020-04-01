// pages/category/category.js
import {request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftList:[],
    rightContent:[],
    currentIndex:0,
    // 右侧商品滚动条到顶部的距离
    scrollTop:0
  },
  Cates:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getCates();

    /* 使用缓存技术
    1 判断本地有没有旧的数据
    2 没有就数据直接发送请求
    3 如果有旧的数据且没有过期 就使用本地存储的旧数据
    */
    
    // 1.获取本地存储的数据
    const Cates=wx.getStorageSync("haha");
    // 2.判断
    if(!Cates){
      this.getCates();
    }else{
      // 有旧数据 假设定义一个过期时间 10s
      if(Date.now()-Cates.times>1000*10){
        // 超过10s 重新发送请求
        this.getCates();
      }else{
        //可以使用
        // console.log("keyi");
        this.Cates=Cates.data;
        let leftList=this.Cates.map(v=>v.cat_name);
        let rightContent=this.Cates[0].children;
        this.setData({
          leftList,
          rightContent
        })
      }
    }
  },
  async getCates(){
    // request({
    //   // url:"https://api-hmugo-web.itheima.net/api/public/v1/categories"
    //   url:"/categories"
    // })
    // .then(res=>{
    //   this.Cates=res.data.message;

    //   // 把接口的数据存入到本地存储中
    //   wx.setStorageSync("haha", {time:Date.now(),data:this.Cates});
        

    //   // 构造左侧菜单
    //   let leftList=this.Cates.map(v=>v.cat_name);
    //   // 构造右侧商品
    //   let rightContent=this.Cates[0].children;
    //   this.setData({
    //     leftList,
    //     rightContent
    //   })
    // })

    const res=await request({url:"/categories"})
    // this.Cates=res.data.message;
    this.Cates=res;

    // 把接口的数据存入到本地存储中
    wx.setStorageSync("haha", {time:Date.now(),data:this.Cates});
      

    // 构造左侧菜单
    let leftList=this.Cates.map(v=>v.cat_name);
    // 构造右侧商品
    let rightContent=this.Cates[0].children;
    this.setData({
      leftList,
      rightContent
    })
  },
  handleItemTap(e){
    // console.log(e);
    const {index}=e.currentTarget.dataset;
    let rightContent=this.Cates[index].children;
    this.setData({
      currentIndex:index,
      rightContent,
      // 重新设置scroll-view标签到顶部的距离
      scrollTop: 0
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
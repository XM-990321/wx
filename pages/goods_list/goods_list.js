/*
用户上滑页面 滚动条触底 开始加载下一页数据
  1.找到滚动条触底事件 
  2.判断有无数据
    1.获取总页数
    总页数=Math.ceil（总条数/页容量pagesize）
    2.获取当前页码
    3.判断当前页码是否大于等于总页数
  3.有 加载下一页  无 提示
*/
/*
下拉刷新页面
  1 触发下拉刷新事件 需要在页面的json文件中开启一个配置项
    找到 触发下拉刷新的事件
  2 重置 数据 数组 
  3 重置页码 设置为1
  4 重新发送请求
  5 数据请求回来 需要手动的关闭 等待效果
*/
import {request} from "../../request/index.js"

// pages/goods_list/goods_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      }
    ],
    goodsList:[]
  },
  QueryParams:{
    query:"",
    cid:"",
    pagenum: 1,
    pagesize:10
  },
  // 总页数
  totalPages:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    this.QueryParams.cid=options.cid;
    this.getGoodsList();
  },
  //获取商品列表数据
  async getGoodsList(){
    const res=await request({url:"/goods/search",data:this.QueryParams});
    // 获取总条数
    const total=res.total;
    //计算总页数
    this.totalPages=Math.ceil(total/this.QueryParams.pagesize);
    // console.log(this.totalPages);
    
    this.setData({
      goodsList:[...this.data.goodsList,...res.goods]
    })
    // 关闭下拉刷新的窗口 如果没有调用下拉刷新的窗口 直接关闭也不会报错  
    wx.stopPullDownRefresh();
  },
  // 标题点击事件
  handleTabsItemChange(e){
    // console.log(e);
    // 获取被点击的标题的索引
    const {index}=e.detail;
    // 修改原数组
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
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
    //判断还有无下一页
    if(this.QueryParams.pagenum >= this.totalPages){
      wx.showToast({title:"没有了"});
    }else{
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },
   // 下拉刷新事件 
   onPullDownRefresh(){
    // 1 重置数组
    this.setData({
      goodsList:[]
    })
    // 2 重置页码
    this.QueryParams.pagenum=1;
    // 3 发送请求
    this.getGoodsList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
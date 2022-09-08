<template>
     <header>
        <div class="header-main">
            <div class="header-l">
                <h1 class="logo">
                    <img src="@/assets/img/logo.png" alt="">
                </h1>
                <ul>
                    <li 
                        v-for="item in topbar" :key="item.id"
                        :class="currentId==item.id ? 'active' : '' " 
                        @click="tabBar(item)"
                    >{{item.title}}</li>
                    
                </ul>
            </div>
            <div class="header-r">
                <div class="search">
                    <input type="text" placeholder="搜索内容">
                    <el-icon><Search /></el-icon>
                </div>
                <div class="shop" @click="goShop">
                    <el-icon :size="20"><ShoppingCart /></el-icon>
                </div>
                <div class="login" v-if="!isLogin">
                  <router-link to="/login">  登录/注册</router-link>
                </div>
                <div class="content-login-success" v-if="isLogin">
                    <div style="cursor:pointer">我的课程</div>
                    <div @mouseenter="isShow=true" >
                        <img 
                        class="avator"
                         :src="userInfo.avatar" 
                         alt="" 
                         v-if="userInfo.avatar">
                        <img v-else class="avator" src="../../assets/img/course.png" alt="">
                    </div>
                </div>
                <div class="user-info" v-if="isShow" @mouseleave="isShow=false">
                    <div class="user-info-top">
                        <div class="u-i-t-top">
                            <img 
                            class="avator"
                            :src="userInfo.avatar" 
                             v-if="userInfo.avatar"
                            alt="">
                            <img v-else class="avator" src="../../assets/img/course.png" alt="">
                            <div class="avator-info">
                                <p>{{userInfo.nickName}}</p>
                            </div>
                            <div class="vip" v-if="vipInfo">
                                <div class="vipImg">
                                    <img :src="vipInfo.vipIcon" 
                                        :class="vipEndtime<0 ? 'qray':''"
                                    alt="">
                                </div>
                                <div class="vipName">{{vipInfo.vipName}}</div>
                                <div class="endTime" v-if="vipInfo.isExpired===0">{{endTimeVip}}天</div>
                                <div class="endTime" v-else>已过期{{Math.abs(vipEndtime)}}天</div>
                            </div>
                        </div>
                        <div class="u-i-i-bottom">
                            <div>
                                <router-link to="'/'">
                                    <div class="info-item">
                                        <img src="../../assets/img/course.png" alt="">
                                        <p>我的课程</p>
                                    </div>

                                </router-link>
                            </div>
                            <div>
                                <router-link to="'/'">
                                    <div class="info-item">
                                        <img src="../../assets/img/course.png" alt="">
                                        <p>订单中心</p>
                                    </div>

                                </router-link>
                            </div>
                        </div>
                        <div class="user-info-bottom">
                            <div class="logout" @click="outLogin">退出登录</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     </header>

</template>
<script setup>
import { ElMessageBox,ElMessage } from 'element-plus';
import {Search,ShoppingCart} from '@element-plus/icons-vue'
import { onBeforeMount } from 'vue';

import { createToken } from '../../utils/api/token';
import { getInfo,logout } from '../../utils/api/login';
import { useUserStore } from '../../store/use';
const router=useRouter()
const userStore=useUserStore()
//  登录切换
let isLogin=ref(false)
let isShow=ref(false)
// 用户信息
let userInfo=ref({})
// 用户vip信息
let vipInfo=ref({})
// vip到期时间
let endTimeVip=ref()


// 退出登录
const outLogin=()=>{
    ElMessageBox.confirm('确定退出登录吗？','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
    }).then(()=>{
        logout().then(res=>{
            if(res.meta.code=='200'){
                ElMessage.success({
                message:'退出成功'
            })
            // 清楚token
            userStore.clearToken()
            // 退出登录后清楚用户信息
            // 刷新页面
            router.go(0)
            }
        }).catch(()=>{
            ElMessage.info({
                message:'已取消'
            })
        })    
    })
}

// 进入购物车页面
const goShop=()=>{
    router.push({
        path:'/cart'
    })
}
    
onBeforeMount(()=>{
    createToken().then(res=>{
        getInfo({token:res.data.token}).then(res=>{
            // 登录的状态，获取到了用户的信息
            if(res.meta.code=='200'){
              
                isLogin.value=true
                userInfo.value=res.data.data
                // console.log(res.data.data);
                let vip=res.data.data.vipInfo
                vipInfo.value=res.data.data.vipInfo
                // 计算会员到期时间
                let now=new Date().getTime()
                let endt=vip.endTime-now
                endTimeVip.value=Math.floor(endt/1000/60/60/24)

            }
        })
    })
})

// topbar
let topbar=ref([
    {id:1,title:'首 页',name:'Home'},
    {id:2,title:'课 程',name:'Course'},
    {id:3,title:'会 员',name:'Vip'}
])

// 切换topbar
let currentId=ref(1)
const tabBar=(item)=>{
    currentId.value=item.id
    router.push({
       name:item.name
    })
}

// 监听路由
watch(()=>router.currentRoute.value.name,(toPath)=>{
       if(toPath=='Home'){
        currentId.value=1
    }else if(toPath=='Course'){
        currentId.value=2
    }else if(toPath=='Vip'){
        currentId.value=3
        
    }
},{immediate:true})


</script>

<style scoped>
header{
    width: 100%;
    height: 80px;
    z-index: 999;
}
.header-main{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width:1000px;
    height: 80px;
    margin: 0 auto;
}
.header-l,.header-r{
    display: flex;
    align-items: center;
}
.header-l .logo{
    width:140px ;
    height:56px ;
    margin-right:90px ;        
}
.header-l ul{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 240px;
}

.header-l ul li{
    line-height: 50px;
    cursor: pointer;
}
.header-l ul li + li{
    color: #808080;
}
.header-l ul li.active{
    position: relative;
    color: #3585ff;
    font-weight: 500;
}
.header-l ul li.active:after{
    content: '';
    position: absolute;
    width: 140%;
    left: -20%;
    bottom: 0px;
    height: 3px;
    background-color: #3585ff;
}
.header-r .search{
    width:200px ;
    height: 40px;
    background-color: #F0F2F4;
    border-radius: 10px;
}
.search input{
    width: 85%;
    height: 100%;
    outline: none;
    background-color: transparent;
    border: none;
}
.shop{
    margin:0 40px;
    color: #808080;
}
.login{
    cursor: pointer;
}
.content-login-success{
    height: 53px;
	color: #808080;
	text-align: center;
	width: 180px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 18px;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: #707070;
}
.avator {
	height: 53px;
	width: 53px;
	cursor: pointer;
	border-radius: 50%;
}
.user-info {
	width: 200px;
	height: 194px;
	background-color: #fff;
	border: 1px solid rgba(248, 250, 252, 1);
	box-shadow: 0px 5px 15px 3px #888888;
	position: absolute;
	top: 75px;
	right: -40px;
	z-index: 999;
	display: block;
	border-radius: 10px;
}
.user-info-top {
	display: flex;
	width: 100%;
	height: 160px;
	border-bottom: 1px solid rgba(248, 250, 252, 1);
	flex-direction: column;
}
.u-i-t-top {
	display: flex;
	height: 80px;
	width: 100%;
	align-items: center;
}
.u-i-t-top img {
	width: 40px;
	height: 40px;
	margin: 0 10px;
	cursor: pointer;
}
.avator-info {
	width: 120px;
	height: 60px;
	font-size: 14px;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: #333333;
	display: flex;
	flex-direction: column;
	/*align-items: center;*/
}
/*有会员了之后高度微调*/
.avator-info p {
	height: 40px;
	line-height: 40px;
	cursor: pointer;
}
.u-i-i-bottom {
	display: flex;
	height: 100px;
	width: 200px;
	margin-top: 10px;
	flex-wrap: wrap;
	justify-content: space-around;
}
.u-i-i-bottom a{
	text-decoration: none;
}
.info-item {
	width: 90px;
	height: 30px;
	display: flex;
	justify-content: space-around;
	align-items: center;
	font-size: 12px;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: #333333;
	border-radius: 3px;
	cursor: pointer;
	background-color: rgba(0, 0, 0, 0.1) !important;
}
.info-item img {
	width: 14px;
	height: 16px;
}
.user-info-bottom {
	position: relative;
	width: 100%;
	height: 30px;
}
.logout {
	line-height: 30px;
	position: absolute;
	top: 0;
	right: 10px;
	font-size: 12px;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: #93999f;
	cursor: pointer;
}
/*vip开始*/
.vip{
  display: flex;
  flex-direction: row;
  /*flex-wrap: wrap;*/
  width: 100%;
  height: 30px;
  margin-left: -105px;
  margin-top: 18px;
  font-size: 12px;
  line-height:30px;
}
.vipImg{
  width: 15px;
  height: 15px;
  margin-right: 12px;
}
.vipImg img{
  width: 100% !important;
  height: 100% !important;
}
.vipName{
  color: #93999F;
}
.endTime{
  padding-left: 2px;
  color:#FF0000 ;
  position: absolute;
  top: 45px;
  left: 73px;
  font-size: 12px;
}
</style>


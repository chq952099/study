<template>
    <Header></Header>
    <div class="detail-title">
        <div class="detail-main">
            <div class="detail-map">
                <el-breadcrumb :separator-icon="ArrowRight">
                    <el-breadcrumb-item>课程</el-breadcrumb-item>
                    <el-breadcrumb-item>会员课</el-breadcrumb-item>
                    <el-breadcrumb-item>{{detailList.courseName}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="detail-name">{{detailList.courseName}}</div>
            <div class="detail-content">难度 入门</div>
        </div>
    </div>
    <div class="detail-container">
        <div class="tab-name">
            <ul>
                <li :class="isActive==1 ? 'active' : ''" @click="isActive=1" >课程章节</li>
                <li :class="isActive==2 ? 'active' : ''" @click="isActive=2">下载笔记代码</li>
            </ul>
        </div>
        <!-- 章节显示 -->
        <div class="tab-chapters" v-if="isActive==1">
            <div class="tab-txt">
                <div class="text-content">{{ charpterDescription ? charpterDescription : '暂无简介介绍' }}</div>
                <div class="buy">
                    <div class="nowBuy" >立即购买</div>
                    <div class="cartBuy"  @click="addCart">加入购物车</div>

                </div>
            </div>
            <div class="detail-list">
                <div class="item" v-for="item in chaptersList" :key="item.id">
                    <div class="item-title">
                        <div>{{item.chapterName}}</div>
                        <div>{{item.description}}</div>
                    </div>
                    <div class="vedio-list">
                        <ul >
                            <li v-for="video in item.children" :key="video.id">
                                <div class="video-title">
                                    <el-icon :size="16"><VideoCameraFilled /></el-icon>
                                    <div style="margin-left:8px">视频：{{video.chapterName}}</div>
                                </div>
                                <div class="startStudy" @click="studyBtn(item,video.chapterId)">开始学习</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- 下载显示 -->
        <div class="tab-download" v-if="isActive==2">
            <ul class="item-box">
                <li class="item download" v-for="item in coursedata" :key="item.id">
                    <div class="load-title">
                        <el-icon><UploadFilled /></el-icon>
                        <div>{{item.attachmentName}}</div>
                    </div>
                    <div class="startStudy" @click="loadBtn(item)">下载资料</div>
                </li>
              
            </ul>
        </div>
    </div>

    <Footer></Footer>
</template>

<script setup>
    // 导入element-icon
import { ArrowRight,VideoCameraFilled,UploadFilled } from '@element-plus/icons-vue'
import Header from '../components/common/header.vue'
import Footer from '../components/common/footer.vue'

// 详情数据api
import {courseDetail,courseCheckAuth,downloadAttachment} from '@/utils/api/newCourse'
import { onBeforeMount } from 'vue';
import {useUserStore} from '../store/use'
import {createToken} from '../utils/api/token'
import {addShopCar} from '../utils/api/cart'
import { ElMessage } from 'element-plus';
// 章节和下载代码切换
let isActive=ref(1)
// 路由
let route=useRoute()
let router=useRouter()
 


// 详情数据  章节信息  简介
let detailList=ref([])
let chaptersList=ref([])
let charpterDescription=ref('')

// 课程资料
let coursedata=ref([])

// 生命周期函数
onBeforeMount(()=>{
    courseDetail({
        courseId:route.query.id
    }).then(res=>{
        let data=res.data.data
        detailList.value=data
        charpterDescription.value=data.bizCourseDetail.description
        console.log(data.bizCourseAttachments);
        chaptersList.value=res.data.data.bizCourseChapters
        coursedata.value=data.bizCourseAttachments
    })
})

let userStore=useUserStore()
// 下载资料点击
const loadBtn=(item)=>{
    if(!userStore.token){
        alert('请先登录')
        router.push('/login')
        return
    }
    else{
        // 判断是否有权限下载
        courseCheckAuth({
            courseId:item.courseId
        }).then(res=>{
            // 没有下载权限
           if(!res.data.data.hasAuth){
            alert('请先购买该课程，才能进行下载')
            return
        }
        else{
            // 有权限下载
            downloadAttachment({
                courseId:item.courseId,
                attachmentId:item.id
            }).then(res=>{
                // Blob以随机存取块的形式存储任何种类的二进制数据
                const blob=new Blob([res])
                console.log(blob);
                let fileName=item.attachmentName
                let fileUrl=item.attachmentUrl
                const extname=fileUrl.substring(fileUrl.lastIndexOf('.'))
                fileName=fileName+extname
                console.log(fileName);
                const link=document.createElement('a')
                link.download=fileName
                link.target='_blank'
                link.style.display='none'
                link.href=URL.createObjectURL(blob)
                document.body.appendChild(link)
                link.click()
                URL.revokeObjectURL(link.href)
                document.body.removeChild(link)
            })
        }
        })
    }
}

// 点击开时学习
const studyBtn=(item,chapterId)=>{
    // console.log(captchaId);
    if(!userStore.token){
        alert('请先登录')
        router.push('/login')
        return
    }
    else{
        // 判断是否有权限下载
        courseCheckAuth({
            courseId:item.courseId
        }).then(res=>{
            // 没有下载权限
           if(!res.data.data.hasAuth){
            alert('请先购买该课程，才能进行下载')
            return
        }
        else{
            // 有权限
            router.push({
                path:'/course-play/'+item.courseId+'/'+chapterId
            })
            
        }
        })
    }
}

// 加入购物车
const addCart=()=>{
    createToken().then(res=>{
        let token=res.data.token
        addShopCar({
            courseId:route.query.id,
            memberId:userStore.userInfo.id
        },token).then(res=>{
            if(res.meta.code=='200'){
                ElMessage.success({
                    message:'加入购物车成功'
                })
                return
            }else{
                ElMessage.info({
                    message:'添加失败  购物车中已存在'
                })
                
            }
        })
    })
}
</script>

<style scoped>
.detail-title {
    width: 100%;
    height: 183px;
    background: url(../assets/img/courseInfobg1920.png) no-repeat;
    background-size: 100% 100%;
}

.detail-main {
    width: 1000px;
    height: 80%;
    margin: 0 auto;
    padding: 25px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

:deep .el-breadcrumb__inner{
    color: #fff;
}
:deep .el-breadcrumb__separator{
    color: #fff;
}
:deep .el-breadcrumb__item:last-child .el-breadcrumb__inner, .el-breadcrumb__item:last-child .el-breadcrumb__inner a, .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover, .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover{
    color: #fff;
}
.detail-name{
    color: #fff;
    font-size: 27px;
    font-weight: 500;
}
.detail-content{
    font-size: 12px;
    color: #fff;
}


.tab-name{
    width: 100%;
    height: 57px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0,0,0,0.16); 
}
.tab-name ul{
    height: 57px;
    width: 1000px;
    align-items: center;
    display: flex;
    margin: 0 auto;
}
.tab-name li{
    cursor: pointer;
}
.tab-name ul li +li{
    margin-left: 67px;
}
.tab-name ul li.active{
    position: relative;
    color:#388fff ;
    font-weight: blod;
}
.tab-name ul li.active:after{
    content: '';
    position: absolute;
    width: 80%;
    left: 10%;
    bottom: -10px;
    height: 3px;
    background-color: #388fff;
    border-radius: 1px;
}
.tab-chapters{
    width: 1000px;
    margin: 0 auto;
}

.tab-txt{
    margin: 29px 0;
    width: 100%;
    height: 147px;
    background: #fff;
    box-shadow: 0 2px 4px rgba(0,0,0,0.09);
    border-radius: 5px;

}
.text-content{
    padding: 24px 27px;
}
.buy{
    display: flex;
    justify-content: flex-end;
}
.nowBuy,.cartBuy{
    width: 90px;
    height: 30px;
    background-color:crimson ;
    border-radius: 15px;
    color: #fff;
    margin-right: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 13px;
}
.cartBuy{
    color:crimson ;
    border-radius: 0;
   background-color: #f1d1d1;
}
.item{
    width: 100%;
    margin-bottom: 15px;
    background: #fff;
    box-shadow: 0 2px 4px rgba(0,0,0,0.09);
    border-radius: 5px;
}
.item-title{
  padding: 16px 27px;
}
.item-title div:first-child{
    font-weight: bold;
    font-size: larger;
}
.item-title div:nth-child(2){
    font-size: small;
    color: #555;
    margin-top: 10px;
}
.detail-list ul>li{
    display: flex;
    justify-content: space-between;
    padding: 16px 27px;
    
}
.video-title{
    display: flex;
}
.startStudy{
    width: 80px;
    height: 30px;
    line-height: 30px;
    background-color: #388fff;
    color: #fff;
    text-align: center;
    border-radius: 12px;
}
.item-box{
    margin-top: 50px;
}
.tab-download{
    width: 1000px;
    margin: 0 auto;
}
.download{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 10px;
}
.load-title{
    display: flex;
}
.load-title>div{
    margin-left: 10px;
}
</style>
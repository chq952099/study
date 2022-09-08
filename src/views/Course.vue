<template>
    <Header></Header>
    <div class="course-filter">
        <div class="filter-main">
            <div class="item-filter">
                <div class="item-title">课程方向 <el-icon color="#888">
                        <CaretRight />
                    </el-icon>
                </div>
                <ul>
                    <li class="fliter-all">全部</li>
                    <li 
                    v-for="item in firstList" 
                    :key="item.id"
                    @click="evtFirst(item.id)"
                    :class="(currentId==item.id) ? 'fliter-all' : ''"
                    >{{ item.categoryName }}</li>
                </ul>
            </div>
            <div class="item-filter">
                <div class="item-title">课程分类 <el-icon color="#888">
                        <CaretRight />
                    </el-icon>
                </div>
                <ul>
                    <li class="fliter-all">全部</li>
                    <li 
                    v-for="item in sencondList" 
                    :key="item.id"
                    @click="evtSecond(item.id)"
                    :class="(currentId==item.id) ? 'fliter-all' : ''"
                    >{{ item.categoryName }}</li>
                </ul>
            </div>
            <div class="item-filter">
                <div class="item-title">课程难度 <el-icon color="#888">
                        <CaretRight />
                    </el-icon>
                </div>
                <ul>
                    <li class="fliter-all">全部</li>
                    <li 
                    v-for="item in courseLevel" 
                    :key="item.id" @click="evtLevel(item.id)" 
                    :class="(currentId==item.id) ? 'fliter-all' : ''">{{item.name}}</li>

                </ul>
            </div>
        </div>
    </div>
    <div class="course-main">
        <!-- 课程导航 -->
        <div class="course-nav">
            <ul>
                <li 
                v-for="item in courseNav" 
                :key="item.id"
                :class="(item.id!==4) ? 'line' : ''"
                @click="evtCourseNav(item.id,item.way)"
                ><span :class="(item.id==currentIdx) ? 'active' : ''">{{item.name}}</span>
                <div v-if="item.id===4" class="priceCaret">
                        <el-icon :size="8"  :color="item.way=='price-asc' ? '#2c81ff' :''">
                            <CaretTop />
                        </el-icon>
                        <el-icon :size="8" :color="item.way=='price-desc' ? '#2c81ff' :''">
                            <CaretBottom />
                        </el-icon>
                    </div>
            </li>
                   

            </ul>
           <div>
                <el-radio-group v-model="radio" @change="tabCourse">
                    <el-radio :label="1">免费课程</el-radio>
                    <el-radio :label="2">会员免费课程</el-radio>
                </el-radio-group>
           </div>
        </div>
        <!-- 课程数据列表 -->
        
            <ul class="new-course-b">
                <li v-for="item in courseNewList" 
                :key="item.id"
                @click="goDetail(item.id)"
                >
                    <img :src="item.courseCover" alt="">
                    <div class="course-list">
                        <h3>{{item.courseName}}</h3>
                        <div>{{ courseTypeFn( item.courseLevel ) }} {{item.clicks}}人报名</div>
                        <div class="price">
                            <div class="price-vip">会员专享</div>
                            <div class="price-total"> ￥{{item.discountPrice}}</div>
                        </div>
                    </div>
                </li>
            </ul>
        
        <!-- 课程分页 -->
        <div class="course-footer">
            <el-pagination background layout="prev-text, pager, next-text" :total="courseTotal" 
                @current-change="currentChange"
            />
        </div>
    </div>

    <Footer></Footer>

</template>

<script setup>
// 导入element
import { CaretRight, CaretTop, CaretBottom } from '@element-plus/icons-vue'
// 导入组件
import Header from '@/components/common/header.vue'
// api
import { getFirstCategorys, getSecondCategorys, courseSearch } from '@/utils/api/newCourse';

import { courseType } from '@/mixins/courseType.js'
import { reactive } from 'vue';
import router from '../router';
// mixin混入一个功能，判断课程等级
let { courseTypeFn }=courseType()


// 一级分类数据  、、二级分类数据  课程数据  总的课程数
let firstList = ref([])
let sencondList = ref([])
let courseNewList = ref([])
let courseTotal=ref(0)

// 分类的当前点击的id
let currentId=ref(null)


// 课程难度等级数据
const courseLevel=ref([
    {name:'初级',id:1},
    {name:'中级',id:2},
    {name:'高级',id:3}
])

// 获取课程数据列表的传参
let courseParams=reactive({
    pageNum: 1,
            pageSize: 8,
            entity:{
                firstCategory:'',
                secondCategory:'',
                courseLevel:'',
                sortBy:'',
                isMember:'',
                isFree:''
            }

})

// 生命周期
onBeforeMount(() => {
    // 获取一级分类数据
    getFirstCategorys().then(res => {
        // console.log(res);
        firstList.value = res.data.list
    }),
        secondCategory({
            categoryId: -1
        }),
        getCourseList(courseParams)
})
// 获取二级分类
let secondCategory = (params) => {
    getSecondCategorys(params).then(res => {
        sencondList.value = res.data.list
       
    })
}
// 获取课程数据
let getCourseList = (params) => {
    courseSearch(params).then(res => {
        courseNewList.value = res.data.pageInfo.list
       courseTotal.value=res.data.pageInfo.total
    
    })
}

// 点击一级分类的函数
const evtFirst=(id)=>{
    currentId.value=id
     // 每次改变一级分类时二级分类和课程跟随改变
    secondCategory({
            categoryId: id
        })
        // 获取课程是三个分类参数都可能参与
        courseParams.entity.firstCategory=id
        courseParams.entity.secondCategory=''
        courseParams.entity.courseLevel=''
        courseParams.entity.isMember=''
        courseParams.entity.isFree=''
        getCourseList(courseParams)
}

// 点击二级分类函数
const evtSecond=(id)=>{
    currentId.value=id
    courseParams.entity.secondCategory=id
    courseParams.entity.courseLevel=''
    courseParams.entity.isMember=''
    courseParams.entity.isFree=''
    getCourseList({
            pageNum: 1,
            pageSize: 8,
            entity:{
                secondCategory:id
            }
        })
}

// 点击等级函数
const evtLevel=(id)=>{
    currentId.value=id
    courseParams.entity.courseLevel=id
    courseParams.entity.isMember=''
    courseParams.entity.isFree=''
    getCourseList(courseParams)
}


// 课程导航条数据
const courseNav=ref([
    {id:1,name:'综合'},
    {id:2,name:'最新课程'},
    {id:3,name:'最多购买'},
    {id:4,name:'价格',way:'price-asc'}
])

// 当前点击的导航条id
let currentIdx=ref(1)

// 点击课程导航条
const evtCourseNav=(id,way)=>{
    currentIdx.value=id
    courseParams.entity.isMember=''
    courseParams.entity.isFree=''
    if(id==1){
       courseParams.entity.sortBy=''
     
    }else if(id==2){
        // 时间正序
        courseParams.entity.sortBy='time-desc'
        courseNav.value[3].way=''
    }else if(id==3){
        courseParams.entity.sortBy='clicks-desc'
        courseNav.value[3].way=''
    }else if(id==4){

       if(way=='' || way=='price-desc'){
        courseParams.entity.sortBy='price-asc'
       
        courseNav.value[3].way='price-asc'
        way='price-asc'
     }else{
        courseParams.entity.sortBy='price-desc'
        courseNav.value[3].way='price-desc'
        way='price-desc'
    }
    }
    getCourseList(courseParams)
}

// 免费课程和会员免费课程的选项
let radio=ref(3)

let tabCourse=(val)=>{
  if(val==1){
    courseParams.entity.isMember='',
    courseParams.entity.isFree='1'
    }else if(val==2){
        courseParams.entity.isMember='1',
        courseParams.entity.isFree=''
    }
    getCourseList(courseParams)
}

// 点击切换当前页
const currentChange=(val)=>{
    courseParams.pageNum=val
    getCourseList(courseParams)
}

// 跳转到课程闲情页面
const goDetail=(id)=>{
    router.push({
        path:'/course/detail',
        query:{
            id
        }
    })
}
</script>

<style scoped>
/* 课程大纲选择 */
.course-filter {
    width: 100%;
    height: 197px;
    background: #f3f5f9;
}

.filter-main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 160px;
    width: 1000px;
    margin: 0 auto;
    padding-top: 20px;

}


.filter-main ul {
    display: flex;
    align-items: center;
}

.filter-main ul li {
    font-size: 14px;
    margin-right: 30px;
    color: #515759;
    font-weight: 400;
    cursor: pointer;
}

.item-filter {
    display: flex;
    align-items: center;
    margin-left: 20px;
}


.item-title {
    font-size: 14px;
    font-weight: 600;
}

.fliter-all {
    line-height: 25px;
    color: #388fff;
    text-decoration: none;
    background: rgba(44, 128, 255, .1);
    border-radius: 5px;
    padding: 0 10px;
    margin: 5px;
}

/* 课程视屏区 */
.course-main {
    width: 1000px;
    margin: 0 auto;
}

.course-nav {
    display: flex;
    justify-content: space-between;
    margin: 20px;
}
.course-nav li{
    display: flex;
    cursor:pointer;
    font-size: 14px;
    color: #515759;
  
}
.course-nav li +li{
    margin-left: 16px;
}

.course-nav li.line{
    position: relative;
}
.course-nav li.line::after{
    content: '';
    position: absolute;
    right: -16px;
    top:0;
    width: 1px;
    height: 100%;
    background-color: #dbd9d9;
}
.course-nav li .active{
    color: #2c81ff;
}


.priceCaret {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.course-main ul {
    display: flex;
    align-items: center;
}

.course-main ul li {
    margin-right: 20px;
}

.pricestyle{
    display: flex;
    align-items: center;
}

.priceCaret {
    display: flex;
    flex-direction: column;
    margin-left: 5px;
    justify-content: center;
}


.new-course-b {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin: 20px 0;
}

.new-course-b li{
    display: flex;
    flex-direction: column;
    width: 230px;
    height: 275px;
    margin-right: 22px;
    margin-bottom: 20px;
    transition: margin-top  0.2s;
}
.new-course-b li:hover{
   margin-top: -10px;
}
.new-course-b li:nth-child(4n){
    margin-right: 0;
}
.new-course-b li img {
    width: 230px;
    height: 153px;
}

.course-list {
    height: 110px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 7px 16px;
    font-size: 12px;
}

.course-list>div {
    color: #808080;
}

.price {
    display: flex;
}

.price-vip {
    width: 64px;
    height: 16px;
    background: linear-gradient(90deg, #ff928e 0%, #fe7062 100%);
    border-radius: 16px 0px 16px 0px;
    text-align: center;
    color: #fff;
    line-height: 16px;
}

.price-total {
    color: #ff727f;

}
.new-course-b li {
    box-shadow: 1px 1px 10px rgb(27 39 94 / 40%)
}

</style>
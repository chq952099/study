<template>
    <div class="nav-swiper">
        <div class="nav-swiper-main">
            <div class="swiper-t">
                <ul  @mouseleave="mouseOut">
                    <li 
                     v-for="item in categoryList" 
                     :key="item.id" 
                     @mouseenter="mouseHover(item.id)"
                      :class="item.id===currentId ? 'active' : ''" 
                      >
                        <span>{{item.categoryName}}</span>
                        <el-icon>
                            <ArrowRight />
                        </el-icon>
                    </li>
                   
                    <div class="active-r"   v-if="isShow">
                        <div class="active-r-t">
                            <div>
                                <h3 class="active-title">基础知识</h3>
                            </div>
                            <div>
                                <div>知识点:</div>
                                <ul>
                                    <li>Vue.js</li>
                                    <li>TypeScript</li>
                                    <li>React.js</li>
                                    <li>Html/css</li>
                                    <li>Vue.js</li>
                                    <li>Vue.js</li>
                                </ul>
                            </div>
                        </div>
                        <div class="active-r-b">
                            <ul>
                                <li v-for="item in courseList" :key="item.id">
                                    <img :src="item.courseCover" alt="">
                                   <div class="text">
                                        <div> <h3 class="active-content">{{item.courseName}}</h3></div>
                                        <div class="active-type">{{ courseTypeFn(item.courseLevel)}}  {{item.clicks}}人报名</div>
                                        <div class="active-price">免费学习</div>
                                   </div>
                                </li>
                               
                            </ul>
                        </div>
                    </div>
                </ul>
                <div class="zmd">
                    <el-carousel :interval="3000" arrow="always" v-if="swiperData.length > 0">
                        <el-carousel-item v-for="item in swiperData" :key="item.id">
                            <img :src="item.imageUrl" alt="">
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
            <div class="swiper-b">
                <ul>

                    <li>
                        <h3>
                            <img src="@/assets/img/chuji.png" alt="">
                        </h3>
                        <div>
                            <h4>初级课程</h4>
                            <span>入门快，岗位多</span>
                        </div>
                    </li>

                    <li>
                        <h3>
                            <img src="@/assets/img/chuji.png" alt="">
                        </h3>
                        <div>
                            <h4>初级课程</h4>
                            <span>入门快，岗位多</span>
                        </div>
                    </li>

                    <li>
                        <h3>
                            <img src="@/assets/img/chuji.png" alt="">
                        </h3>
                        <div>
                            <h4>初级课程</h4>
                            <span>入门快，岗位多</span>
                        </div>
                    </li>

                    <li>
                        <h3>
                            <img src="@/assets/img/chuji.png" alt="">
                        </h3>
                        <div>
                            <h4>初级课程</h4>
                            <span>入门快，岗位多</span>
                        </div>
                    </li>

                    <li>
                        <h3>
                            <img src="@/assets/img/chuji.png" alt="">
                        </h3>
                        <div>
                            <h4>初级课程</h4>
                            <span>入门快，岗位多</span>
                        </div>
                    </li>

                </ul>
            </div>
        </div>
    </div>
</template>


<script setup>
// element
import { ArrowRight } from '@element-plus/icons-vue';

// api
import { getSliders } from '@/utils/api/slider';

import {getFirstCategorys,getSecondCategorys,courseSearch} from '@/utils/api/newCourse'


import { courseType } from '@/mixins/courseType.js'

// mixin混入一个功能，判断课程等级
let { courseTypeFn }=courseType()


// 轮播图数据
let swiperData = ref([])

// 侧边栏目录
let categoryList=ref([])

// 右侧切换数据
let isShow=ref(false)

// 控制li的显示类active
let currentId=ref('')

onBeforeMount(() => {

    getSliders().then(res => {
        swiperData.value = res.data.list
        // console.log(swiperData);
    }),
    getFirstCategorys().then(res=>{
        categoryList.value=res.data.list
    })
})

// 二级目录数据
let secondList=ref([])

// 课程数据
let courseList=ref([])

// 鼠标移入
const mouseHover=(id)=>{
    isShow.value=true
    currentId.value=id
    getSecondCategorys({
        categoryId:id
    }).then(res=>{
        console.log(res.data.list);
        console.log(isShow);
        secondList.value=res.data.list
    })

    // 查询课程
    courseSearch({
        pageNum:1,
        pageSize:4,
        entity:{
            firstCategory:id
        }

    }).then(res=>{
        console.log(res.data.pageInfo.list);
        courseList.value=res.data.pageInfo.list
    })
}


// 鼠标移出
const mouseOut=()=>{
    isShow.value=false
}
</script>
<style scoped>
.nav-swiper-main {
    width: 1000px;
    padding: 47px 0;
    margin: 0 auto;
}

.swiper-t {
    display: flex;
    height: 373px;
    border-radius: 11px 11px 0px 0px;
}

.swiper-t>ul {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 160px;
    height: 100%;
    background-color: #2B283D;
   
}

.swiper-t>ul>li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    width: 120px;
    font-size: 16px;
    height: 37px;
    margin-top: 35px;
    color: #f2f2f2;
    cursor: pointer;
}

/* 侧边栏选中后出现的模块 */
.active {
    background: linear-gradient(90deg, rgb(63, 229, 255), transparent);

}

.active-r {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    top: 0;
    left: 160px;
    width: 724px;
    height: 373px;
    background-color: #fff;
    border-radius: 0px 11px 0px 0px;
    z-index: 99;
}

/* 上部分 */
.active-r-t{
    padding:23px 30px;
}
.active-r-t>div{
    display: flex;
    margin-top: 11px;
}
.active-r-t>div ul{
    display: flex;
    margin-left: 7px;
    flex-wrap: wrap;
}

.active-r-t>div ul li +li{
    margin-left:20px ;
}

/* 下部分 */
.active-r-b{
    display: flex;
    width: 724px;
    height: 217px;
    background-color: #f3f5f6;
}
.active-r-b>ul{
    display: flex;
    flex-wrap: wrap;
    padding: 0 30px;
    height: 100%;
    align-items: center;
}
.active-r-b>ul li{
    display: flex;
    /* align-items: center; */
    justify-content: center;
   
    width: 50%;

}
.active-r-b>ul li img{
    width: 140px;
    height: 81px;
}
.active-r-b>ul  .text{
    display: flex;
    margin-left: 4px;
    flex-direction: column;
    justify-content: space-between;
}

.active-content{
    font-size: 14px;
    color: #333;
}
.active-type{
    font-size: 12px;
    color: #808080;
}
.active-price{
    font-size: 12px;
    color: #3586ff;
}
:deep .el-carousel__container {
    height: 373px;
}

.el-carousel__item h3 {
    color: #475669;
    line-height: 373px;
}

.el-carousel__item img {
    width: 100%;
    height: 373px;
}

.zmd {
    flex: 1;
    height: 373px;
}

.swiper-b ul {
    display: flex;
}

.swiper-b li {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 213px;
    height: 133px;
    background: #fff;
    border-radius: 0 0 0 11px;
}

.swiper-b li img {
    width: 64px;
    height: 64px;
}

.swiper-b li div {
    margin-left: 11px;
}

.swiper-b li div h4 {
    font-size: 16px;
    color: #333;
}

.swiper-b li div span {
    font-size: 12px;
    color: #808080;
}
</style>

<template>
    <div>
        <ul class="new-course-b">
                <li 
                v-for="item in newCourse" 
                :key="item.id"
                @click="goDetail(item.id)"
                >
                    <img :src="item.courseCover" alt="">
                    <div class="course-content">
                        <h3>{{item.courseName}}</h3>
                        <div>{{ courseTypeFn( item.courseLevel ) }} {{item.clicks}}人报名</div>
                        <div class="price">
                            <div class="price-vip">会员专享</div>
                            <div class="price-total"> ￥{{item.discountPrice}}</div>
                        </div>
                    </div>
                </li>
            </ul>
    </div>
</template>

<script setup>
import { mostNew } from '@/utils/api/newCourse';
import { courseType } from '@/mixins/courseType.js'
// mixin混入一个功能，判断课程等级
let { courseTypeFn }=courseType()
let newCourse = ref([])
onBeforeMount(() => {
    mostNew({
        pageNUm: 1,
        pageSize: 8,

    }).then(res => {
        newCourse.value = res.data.pageInfo.list
    })
})

// 路由器
const router=useRouter()
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
.new-course-b {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin: 20px 0;
}

.new-course-b li{
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

.course-content {
    height: 110px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 7px 16px;
    font-size: 12px;
}

.course-content>div {
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
</style>
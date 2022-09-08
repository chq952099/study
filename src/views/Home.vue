<template>
  <Header></Header>
  <NavSwiper></NavSwiper>
  <div ref="target">
    <NewCourse v-if="targetIsVisible"></NewCourse>
  </div>

  <Footer></Footer>
</template>

<script setup>
// 异步组件
import {useIntersectionObserver} from '@vueuse/core'

import Header from '@/components/common/header.vue'
import NavSwiper from '../components/home/NavSwiper.vue';
import Footer from '../components/common/footer.vue';
import { defineAsyncComponent } from 'vue';

// 引用异步组件
const NewCourse=defineAsyncComponent(()=>
    import('@/components/home/newCourse.vue')
)

const target=ref(null)
const targetIsVisible=ref(false)
const {stop}=useIntersectionObserver(
    target,
    ([{isIntersecting}])=>{
        if(isIntersecting){
            targetIsVisible.value=isIntersecting
        }
    }
)
</script>
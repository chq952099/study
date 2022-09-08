import {createRouter,createWebHistory} from "vue-router"
import Home from '../views/Home.vue'
// pinia ==store==vuex
import { useUserStore } from "../store/use"

const routes=[
    {
        path:'/',
        name:'Home',
        component:Home
    },
    {
        path:'/about',
        name:'About',
        component:()=>
        import("../views/About.vue")
    },
    {
        path:'/course',
        name:'Course',
        component:()=>
        import("../views/Course.vue")
    },
    {
        path:'/course/detail',
        name:'Detail',
        component:()=>
        import("../views/Detail.vue")
    },
    {
        path:'/login',
        name:'Login',
        component:()=>
        import("../views/Login.vue")
    },
    {
        path:'/course-play/:courseId/:chapterId',
        name:'course-play',
        component:()=>
            import('../views/CoursePlay.vue')    
        
    },
    {
        path:'/cart',
        name:'Cart',
        component:()=>
            import('../views/Cart.vue'),
            // 进入该页面时进行导航守卫拦截，判断是否是登录状态
            beforeEnter:(to,from,next)=>{
                if(useUserStore().userInfo.id){
                    next()
                }else{
                    next('/login')
                }
            }
        
    },{
        path:'/confirmOrder',
        name:'ConfirmOrder',
        component:()=>
            import('../views/ConfirmOrder.vue'),
             // 进入该页面时进行导航守卫拦截，判断是否是登录状态
             beforeEnter:(to,from,next)=>{
                if(useUserStore().userInfo.id){
                    next()
                }else{
                    next('/login')
                }
            }

    }
]

const router=createRouter({
    history:createWebHistory(),
    routes, 
})

export default router
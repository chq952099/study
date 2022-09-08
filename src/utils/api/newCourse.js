import request from '@/utils/request'

export function mostNew(data){
    return request({
        url:'/api/course/mostNew',
        method:'post',
        data
    })
}

// 获取一级分类
export function getFirstCategorys(){
    return request({
        url:'/api/course/category/getFirstCategorys'
    })
}

// 获取二级分类

export function getSecondCategorys(params) {  
    return request({
        url:'/api/course/category/getSecondCategorys',
        params
    })
}

// 查询课程
export function courseSearch(data) {
    return request({
        url:'/api/course/search',
        method:'post',
        data
    })
}

// 课程详情
export function courseDetail(params) {
    return request({
        url:'/api/course/getDetail',
        params
    })
}

// 下载权限
export function courseCheckAuth(params) {
    return request({
        url:'/api/course/checkAuth',
        params
    })
}

// 下载内容
export function downloadAttachment(params) {
    return request({
        url:'/api/course/downloadAttachment',
        params,
        responseType:'blob'
    })
}

//播放课程
export function player(params) {
    return request({
        url:'/api/player/play',
        params
    })
}

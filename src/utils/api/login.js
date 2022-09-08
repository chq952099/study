import request from '../request'

// 用户名和密码
export function loginByJson(data){
    return request({
        url:'/api/u/loginByJson',
        method:'POST',
        data
    })
}

// 发送验证码
export function sendCaptcha(params){
    return request({
        url:'/api/sms/sendRegisterOrLoginCaptcha',
        params
    })
}

// 手机验证码登录
export function loginByMobile(data){
    return request({
        url:'/api/u/loginByMobile',
        method:'POST',
        data
    })
}

// 获取个人信息
export function getInfo(params){
    return request({
        url:'/api/member/getInfo',
        params
    })
}

// 退出登录
export function logout(){
    return request({
        url:'/api/u/logout',
    })
}
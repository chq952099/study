import request from '../request'

// 获取购物车的课程数据
export function getShopCarList(){
    return request({
        url:'/api/shopcar/getShopCarList',
    })
}

// 删除购物车
export function deleteShopCar(params,token){
    return request({
        url:'/api/shopcar/deleteShopCar',
        params,
        headers:{
            token
        },
    })
}
//  加入购物车
export function addShopCar(data,token){
    return request({
        url:'/api/shopcar/addShopCar',
        method:'post',
        data,
        headers:{token}
    })
}

// 结算的商品数据
export function settlement(data){
    return request({
        url:'/api/order/settlement',
        method:'post',
        data
    })
}

// 微信结算
export function wxpayOrder(data){
    return request({
        url:'/api/pay/wxpay/createOrder',
        method:'post',
        data
    })
}
// 支付宝结算
export function zfbpayOrder(data){
    return request({
        url:'/api/pay/alipay/createOrder',
        method:'post',
        data
    })
}

// 查询支付宝订单状态
export function queryZfbOrder(params){
    return request({
        url:'/api//pay/alipay/queryOrder',
       params
    })
}
// 查询微信支付订单状态
export function queryWxOrder(params){
    return request({
        url:'/api//pay/wxpay/queryOrder',
       params
    })
}

// 批量删除购物车商品
export function deleteShopCars(data,token){
    return request({
        url:'/api/shopcar/deleteShopCars',
        method:'post',
        data,
        headers:{token}
    })
}
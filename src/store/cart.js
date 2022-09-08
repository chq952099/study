import { defineStore } from 'pinia'

export const useCartStore = defineStore({
  id: 'cart',
  state: () => {
    return {
        cartList:[],//购物车数据
        select:[],//选中的商品id
        orderList:[]//结算商品的参数，课程id和数量
    }
  },
  getters:{
    isChecked(){
        return this.select.length== this.cartList.length
    },
    // 总价和数量
    total(){
        this.orderList=[]
        let total={
            price:0,
            num:0
        }
        this.cartList.forEach(v=>{
            if(this.select.indexOf(v.id) != -1){
                total.price+=v.discountPrice*v.counter
                total.num=this.select.length
                this.orderList.push({
                    id:v.courseId,
                    number:1
                })
            }
        })
        return total
    }
},
  actions:{
    // 存储购物车数据
    addCart(list){
        this.select=[]
       list.forEach(element => {
            // 每一个数据都添加一个check属性，默认为选中状态
            element['check']=true
            this.select.push(element.id)
        });
        this.cartList=list
    },
    // 全选
    all(){
        this.select=this.cartList.map(v=>{
            v['check']=true
            return v.id
        })
    },
    // 全不选
    unAll(){
       this.cartList.forEach(v=>{
            v['check']=false
        })
        this.select=[]
    },
    // 单选后自动取消全选
    itemChecked(index){
        // 当前点击的id
        let id=this.cartList[index].id
        // 查看select数组中是否有该id
        let idx=this.select.indexOf(id)
        if(idx>-1){
            // 存在的话,说明当前为选中状态需要移除，并且将该项数据的check改为false
            this.cartList[index].check=false
            this.select.splice(idx,1)
        }else{
            this.cartList[index].check=true
            this.select.push(id)
        }
    }
    }

 
})
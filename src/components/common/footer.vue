<template>
    <footer>
        <div class="foot-main">
            <div class="logo">
            <img class="logo02" src="@/assets/img/logo02.png" alt="">
            <img class="factory" src="@/assets/img/foot-factory.png" alt="">
        </div>
        <div class="content">
            <ul>
                <li>关于我们</li>
                <li> | </li>
                <li>联系我们</li>
                <li> | </li>
                <li>意见反馈</li>
                <li> | </li>
                <li>版权声明</li>
            </ul>
            <div>Copyright © 2018~2038 小鹿线 www.xuexiluxian.cn 24小时服务热线：010-86483040</div>
        </div>
        <div class="wx">
            <ul>
                <li>
                    <img class="wx1" src="@/assets/img/wx.jpg" alt="">
                    <span>官方微信</span>
                </li>
                <li>
                    <img  class="wx2" src="@/assets/img/wx2.jpg" alt="">
                    <span>指导老师微信</span>
                </li>
            </ul>
        </div>
        </div>
    </footer>

</template>

<style scoped>
footer{
    width: 100%;
   
    background: #3483ff;
}
.foot-main{
    display: flex;
    width: 1000px;
    margin: 0 auto;
    height: 187px;
    justify-content: center;
    align-items: center;
}
.logo{
    display: flex;
    align-items: center;
}
.logo02{
    width: 127px;
    height: 50px;
}
.factory{
    width: 130px;
    height: 110px;
}
.content{
    padding: 0 31px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 12px;

}
.content ul {
    display: flex;
    margin-bottom: 10px;

}
.content ul li + li{
    margin-left: 10px;
}
.wx ul{
    display: flex;
    color: white;
    font-size: 12px;
    align-items: center;
}

.wx ul li{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.wx ul li +li{
    margin-left: 50px;
}
.wx img{
    width: 70px;
    height: 70px;
}

.wx span{
    margin-top: 10px;
}
</style>
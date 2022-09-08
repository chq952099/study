<template>
    <div class="new-course">
        <div class="new-course-main">
            <div class="new-course-t">
                <div class="title-hot">
                    <div class="hot">HOT</div>
                    <div class="hot-c"></div>
                </div>
                <div class="title-txt">新上好课</div>
            </div>
           <Course></Course>
        </div>

    </div>

</template>

<script setup>
import Course from '../common/course.vue';
</script>
<style scoped>
.new-course {
    margin: 39px;
}

.new-course-main {
    width: 1000px;
    margin: 0 auto;

}

.title-hot,
.new-course-t {
    display: flex;
}

.hot {
    width: 70px;
    height: 40px;
    color: white;
    background-color: indianred;
    border-radius: 10px 0 10px 10px;
    text-align: center;
    line-height: 40px;
}

.hot-c {
    width: 0;
    height: 0;
    border: 4px solid indianred;
    border-bottom-color: white;
    border-right-color: white;
}

.title-txt {
    position: relative;
    margin-left: 11px;
    height: 40px;
    font-size: 23px;
    line-height: 40px;
}

.title-txt:after {
    content: '';
    position: absolute;
    width: 120%;
    left: -5%;
    bottom: 0;
    height: 9px;
    background: linear-gradient(90deg, #fbf84f 0%, #fea935 100%);
    z-index: -1;
    border-radius: 5px;
}

</style>
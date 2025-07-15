<template>
    <div class="main">
        <!-- <div class="main">我是MAIN</div>
        <div @click="handleExitClick">退出登录</div> -->
        <el-container class="main-content">
            <el-aside :width="isFold ? '60px' : '240px'"><main-menu :is-fold="isFold" /></el-aside>
            <el-container>
                <el-header height="50px">
                    <main-header @menu-state-toggle="menuStateToggle" />
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup>
import useMainStore from '@/store/user';
import { useRouter } from 'vue-router';
import MainMenu from '@/components/main-menu/main-menu.vue';
import MainHeader from '@/components/main-header/main-header.vue';
import { ref } from 'vue';

const mainStore = useMainStore();

const router = useRouter();
const isFold = ref(false);

console.log('没有这个store吗难道', mainStore.name);

function handleExitClick() {
    console.log('退出登录---------------');
    // 删除token
    localStorage.removeItem('token');
    // 跳转登录页
    router.push('/login');
}

function menuStateToggle(value) {
    console.log('父组件中监听到啦', value);
    isFold.value = value;
}
</script>

<style lang="less" scoped>
.main {
    height: 100vh;
}
.main-content {
    height: 100%;

    .el-aside {
        overflow-x: hidden;
        overflow-y: auto;
        line-height: 200px;
        text-align: left;
        cursor: pointer;
        background-color: #001529;
        transition: width 0.3s linear;
        scrollbar-width: none;
        -ms-overflow-style: none;

        &::-webkit-scrollbar {
            display: none;
        }
    }

    .el-header {
        padding: 0;
    }

    .el-container {
        background-color: aliceblue;
    }
}
</style>

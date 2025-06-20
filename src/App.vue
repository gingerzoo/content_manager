<template>
    <div class="app-wrapper">
        <router-link to="/login">登录</router-link>

        <!-- 占位组件 -->
        <router-view></router-view>
    </div>
</template>
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<style scoped>
.app-wrapper {
    width: 100vw;
    height: 100vh;
    background-color: white;
}
</style>

<template>
    <div class="app-wrapper">
        <el-config-provider :locale="zhCn">
            <!-- 占位组件 -->
            <router-view></router-view>
        </el-config-provider>
    </div>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router';
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
</script>

<style scoped>
.app-wrapper {
    width: 100vw;
    height: 100vh;
    background-color: white;
}
</style>

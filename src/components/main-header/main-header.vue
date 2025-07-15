<template>
    <div class="main-header">
        <div class="menu-icon" @click="handleMenuIconClick">
            <el-icon size="30px">
                <component :is="isFold ? 'Expand' : 'Fold'" />
            </el-icon>
        </div>
        <div class="content">
            <div class="breadcrumb">
                <bread-crumb />
            </div>
            <div class="info">
                <header-info />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import HeaderInfo from './c-cpns/header-info.vue';
import breadCrumb from './c-cpns/bread-crumb.vue';
const emit = defineEmits(['menuStateToggle']);
const isFold = ref(false);
function handleMenuIconClick() {
    console.log('我被点击了-------');
    isFold.value = !isFold.value;
    console.log('当前是否展开--------', isFold.value);
    emit('menuStateToggle', isFold.value);
}
</script>

<style lang="less" scoped>
.main-header {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 15px;
    background-color: white;
    color: black;

    .content {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-left: 10px;
    }
}
</style>

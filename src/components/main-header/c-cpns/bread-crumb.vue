<template>
    <div class="bread-crumb">
        <el-breadcrumb :separator-icon="CaretRight">
            <template v-for="item in breadcrumb" :key="item.name">
                <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
            </template>
        </el-breadcrumb>
    </div>
</template>

<script lang="ts" setup>
import { mapPathToBreadcrumb } from '@/utils/mapMenus';
import { useRoute } from 'vue-router';
import useLoginStore from '@/store/login/login';
import { computed } from 'vue';

const route = useRoute();
const loginStore = useLoginStore();

const breadcrumb = computed(() => {
    return mapPathToBreadcrumb(route.path, loginStore.userMenus);
});
console.log('当前面包屑----------', breadcrumb);
</script>

<style lang="less" scoped></style>

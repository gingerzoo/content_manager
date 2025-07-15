<template>
    <div class="main-menu">
        <div class="logo">
            <img src="@/assets/img/logo.svg" alt="" class="img" />
            <h2 v-if="!isFold" class="title">贝卡管理系统</h2>
        </div>
        <div class="menu">
            <el-menu
                :collapse="isFold"
                :default-active="defaultActive"
                text-color="#b7bdc3"
                background-color="#001529"
                active-text-color="#fff"
            >
                <template v-for="item in userMenus" :key="item.id">
                    <el-sub-menu :index="item.id + ''">
                        <template #title>
                            <el-icon>
                                <component :is="formatAcriveIcon(item.icon)" />
                            </el-icon>
                            <span>{{ item.name }}</span>
                        </template>
                        <template v-for="subitem in item.children" :key="subitem.id">
                            <el-menu-item
                                :index="subitem.id + ''"
                                @click="handleMenuItemClick(subitem)"
                            >
                                {{ subitem.name }}
                            </el-menu-item>
                        </template>
                    </el-sub-menu>
                </template>
            </el-menu>
        </div>
    </div>
</template>

<script lang="ts" setup>
import useLoginStore from '@/store/login/login.ts';
import { useRouter, useRoute } from 'vue-router';
import { ref, computed } from 'vue';
import { firstMenu, mapPathToMenu } from '@/utils/mapMenus';

const router = useRouter();
const route = useRoute();
const loginStore = useLoginStore();
const userMenus = loginStore.userMenus;

const defaultActive = computed(() => {
    // elmenu的默认菜单
    const curPathId = mapPathToMenu(route.path, userMenus);
    return curPathId.id + '';
});

console.log('defaultActive-------', defaultActive);

const props = defineProps<{
    isFold: boolean;
}>();
function formatAcriveIcon(str) {
    return str.split('-icon-')[1];
}

function handleMenuItemClick(item) {
    console.log('点击菜单的某一项------', item);
    router.push(item.url);
}
</script>

<style lang="less" scoped>
.main-menu {
    height: 100%;
    background-color: #001529;
}
.logo {
    display: flex;
    align-items: center;
    height: 28px;
    padding: 12px 10px 8px 10px;
    overflow: hidden;

    .img {
        height: 100%;
        margin: 0 10px;
    }

    .title {
        font-size: 16px;
        font-weight: 700;
        color: white;
        white-space: nowrap;
    }
}
.el-menu {
    border-right: none;
}

.el-sub-menu {
    .el-menu-item {
        padding-left: 50px !important;
        background-color: #0c2135;

        &:hover {
            color: #fff;
        }

        // &.is-active {
        //     background-color: #0a60bd;
        // }
    }

    .el-menu-item.is-active {
        background-color: #0a60bd;
    }
}
</style>

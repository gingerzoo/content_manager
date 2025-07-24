<template>
    <div class="role">
        <page-search
            :search-config="searchConfig"
            @filter-click="handlePagelistFilter"
            @reset-click="handlePagelistReset"
        />
        <page-content
            ref="contentRef"
            :content-config="contentConfig"
            @create-click="handleNewPageCreate"
            @edit-click="handlePageEdit"
        />
        <page-modal ref="modalRef" :modal-config="modalConfig" :other-info="otherInfo">
            <template #menulist>
                <el-tree
                    ref="treeRef"
                    :data="entireMenus"
                    show-checkbox
                    node-key="id"
                    :props="{
                        children: 'children',
                        label: 'name'
                    }"
                    @check="handleTreeCheck"
                />
            </template>
        </page-modal>
    </div>
</template>

<script lang="ts" setup>
import PageSearch from '@/components/page-search/page-search.vue';
import PageContent from '@/components/page-content/page-content.vue';
import PageModal from '@/components/page-modal/page-modal.vue';
import searchConfig from './config/search.config';
import contentConfig from './config/content.config';
import modalConfig from './config/modal.config';

import usePageContent from '@/hooks/usePageContent';
import usePageModal from '@/hooks/usePageModal';
import useMainStore from '@/store/main/main';
import mapMenuListToIds from '@/utils/map-menus';
import { storeToRefs } from 'pinia';
import { ref, nextTick } from 'vue';
import type { ElTree } from 'element-plus';
const { contentRef, handlePagelistFilter, handlePagelistReset } = usePageContent();

const { modalRef, handleNewPageCreate, handlePageEdit } = usePageModal(editCallback);

const treeRef = ref<InstanceType<typeof ElTree>>();

const mainStore = useMainStore();
const { entireMenus } = storeToRefs(mainStore);
const otherInfo = ref({});

function handleTreeCheck(data1: any, data2: any) {
    console.log('handleCheck-------', data2);
    const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys];
    otherInfo.value = {
        menuList
    };
    console.log('otherInfo---------', otherInfo);
}

function editCallback(itemData: any) {
    console.log('给回调函数传递的参数----', itemData);
    nextTick(() => {
        const menuIds = mapMenuListToIds(itemData.menuList);
        console.log('menuIds-----------', menuIds, itemData.menuList);
        treeRef.value?.setCheckedKeys(menuIds);
    });

    console.log('editCallback-------', itemData);
}
</script>

<style lang="less" scoped></style>

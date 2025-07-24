<template>
    <div class="department">
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
        <page-modal ref="modalRef" :modal-config="modalConfigRef" />
    </div>
</template>

<script setup lang="ts" name="department">
// import PageSearch from './c-cpns/page-search.vue';
import PageSearch from '@/components/page-search/page-search.vue';
// import PageContent from './c-cpns/page-content.vue';
import PageContent from '@/components/page-content/page-content.vue';
import PageModal from '@/components/page-modal/page-modal.vue';
import { ref, computed } from 'vue';
import searchConfig from './config/search.config';
import contentConfig from './config/content.config';
import modalConfig from './config/modal.config';
import useMainStore from '@/store/main/main';
import usePageContent from '@/hooks/usePageContent';
import usePageModal from '@/hooks/usePageModal';

const modalConfigRef = computed(() => {
    const mainStore = useMainStore();
    const departments = mainStore.entireDepartments.map((item) => ({
        label: item.name,
        value: item.id
    }));
    console.log('整理后的部门-----', departments);
    // 这一步是保证初始化数据时modal的默认部门已就位
    modalConfig.formItems.forEach((item) => {
        if (item.prop === 'parentId') {
            item.options.push(...departments);
        }
    });

    console.log('整理后的modalConfig------', modalConfig);

    return modalConfig;
});

const { contentRef, handlePagelistFilter, handlePagelistReset } = usePageContent();

const { modalRef, handleNewPageCreate, handlePageEdit } = usePageModal();

// function handleNewPageCreate() {
//     console.log('新建页面数据---', pageModalRef);
//     pageModalRef.value?.handleModalToggle();
// }

// function handlePageEdit(pageInfo) {
//     console.log('编辑页面数据');
//     pageModalRef.value?.handleModalToggle(false, pageInfo);
// }
</script>

<style scoped>
.department {
}
</style>

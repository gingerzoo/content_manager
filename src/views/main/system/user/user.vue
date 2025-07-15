<template>
    <div class="user">
        <user-search @filter-list="handleUserlistFilter" @reset-list="handleUserlistReset" />
        <user-content ref="userContentRef" @create-user="handleNewUserCreate" />
        <user-modal ref="userModalRef" />
    </div>
</template>

<script lang="ts" setup>
import UserSearch from './c-cpns/user-search.vue';
import UserContent from './c-cpns/user-content.vue';
import UserModal from './c-cpns/user-modal.vue';

import { ref } from 'vue';

const userContentRef = ref<InstanceType<typeof UserContent>>();

const userModalRef = ref<InstanceType<typeof UserModal>>();

function handleUserlistFilter(formInfo) {
    console.log('传递过来的formInfo---------', formInfo);
    userContentRef.value?.fetchPageListData(formInfo);
}

function handleUserlistReset() {
    userContentRef.value?.fetchPageListData();
}

function handleNewUserCreate() {
    userModalRef.value?.handleModalToggle();
}
</script>

<style lang="less" scoped>
.user {
    border-radius: 16px;
    overflow: hidden;
}
</style>

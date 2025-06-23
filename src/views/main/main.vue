<template>
    <div class="main">我是MAIN</div>
</template>

<script setup>
import useMainStore from '@/store/user';

const mainStore = useMainStore();
console.log('没有这个store吗难道', mainStore.name);
</script>

<style lang="less" scoped></style>

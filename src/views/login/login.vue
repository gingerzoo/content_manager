<template>
    <div class="login-wrapper">
        <login-panel />
    </div>
</template>

<script lang="ts" setup>
import LoginPanel from './c-cpns/login-panel.vue';
</script>

<style lang="less" scoped>
.login-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    color: black;
}
</style>

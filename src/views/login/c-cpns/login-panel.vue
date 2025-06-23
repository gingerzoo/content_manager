<template>
    <div class="login-panel">
        <h1 class="title">后台管理系统</h1>
        <div class="panel-tabs">
            <el-tabs v-model="loginMode" type="border-card" stretch>
                <el-tab-pane name="account">
                    <template #label>
                        <span class="tab-item">
                            <el-icon><UserFilled /></el-icon>
                            <span class="tab-text">帐号登录</span>
                        </span>
                    </template>
                    <pane-account ref="acountElRef" />
                </el-tab-pane>
                <el-tab-pane name="phone">
                    <template #label>
                        <span class="tab-item">
                            <el-icon><Iphone /></el-icon>
                            <span class="tab-text">手机登录</span>
                        </span> </template
                    ><pane-phone
                /></el-tab-pane>
            </el-tabs>
        </div>
        <div class="pwd-oper">
            <el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
            <el-link class="forget-pwd">忘记密码</el-link>
        </div>
        <el-button type="primary" class="login-btn" @click="handleLoginBtnClick">
            立即登录
        </el-button>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { UserFilled, Iphone } from '@element-plus/icons-vue';
import type { FormInstance, FormRules } from 'element-plus';
import PaneAccount from './pane-account.vue';
import PanePhone from './pane-phone.vue';
const isRemPwd = ref(false);
const loginMode = ref('account');
const acountElRef = ref<InstanceType<typeof PaneAccount>>();

function handleLoginBtnClick() {
    console.log('点我-------------', loginMode);
    if (loginMode.value === 'account') {
        console.log('帐号登录-------------------');
        acountElRef.value?.loginAction();
    } else {
        console.log('手机登录---------');
    }
}
</script>

<style lang="less" scoped>
.login-panel {
    // display: flex;
    // align-items: center;
    // justify-content: center;
    // flex-direction: column;
    width: 380px;

    .title {
        text-align: center;
        margin-bottom: 20px;
    }

    .panel-tabs {
        .tab-item {
            display: flex;
            align-items: center;

            .tab-text {
                margin-left: 3px;
            }
        }
    }

    .pwd-oper {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .forget-pwd {
            color: #409eff;
        }
    }

    .login-btn {
        width: 100%;
    }
}
</style>

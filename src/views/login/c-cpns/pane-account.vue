<template>
    <div class="pane-account">
        <el-form
            label-width="60px"
            class="demo-ruleForm"
            :model="account"
            :rules="accountRules"
            status-icon
            ref="accountFormRef"
        >
            <el-form-item label="帐号" prop="name">
                <el-input type="text" autocomplete="off" v-model="account.name" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input
                    type="password"
                    autocomplete="off"
                    :suffix-icon="View"
                    v-model="account.password"
                />
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { View } from '@element-plus/icons-vue';
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules, ElForm } from 'element-plus';
import { ElMessage } from 'element-plus';
import { accountLogin } from '@/service/login/login';
import useLoginStore from '@/store/login/login';
import type { Iaccount } from '@/types/index';

const account = reactive<Iaccount>({
    name: '',
    password: ''
});

const accountFormRef = ref<InstanceType<typeof ElForm>>();
const loginStore = useLoginStore();

const accountRules: FormRules = {
    name: [
        {
            required: true,
            message: '请输入帐号信息',
            trigger: 'blur'
        },
        {
            pattern: /^[a-z0-9]{6,20}$/,
            message: '必须是6~20位数字或字母组成',
            trigger: 'change'
        }
    ],
    password: [
        {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
        },
        {
            pattern: /^[a-z0-9]{6,20}$/,
            message: '必须是6~20位数字或字母组成',
            trigger: 'change'
        }
    ]
};
function loginAction(lal?: string) {
    console.log('pane-account login action function exection', account.name, account.password);
    accountFormRef.value?.validate((isValidated) => {
        console.log('校验是否通过-------', isValidated);
        if (isValidated) {
            console.log('校验通过----------');

            const { name, password } = account;
            loginStore.loginAccountAction({ name, password });
        } else {
            console.log('校验不通过');
            ElMessage({
                message: '登录信息错误，请检查后输入！',
                type: 'error'
            });
        }
    });
}

defineExpose({
    loginAction
});
</script>

<style lang="less" scoped></style>

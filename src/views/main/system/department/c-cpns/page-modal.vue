<template>
    <div class="user-modal">
        <el-dialog
            v-model="dialogVisible"
            :title="isCreateNew ? '新建部门' : '编部门'"
            width="30%"
            center
        >
            <div class="form">
                <el-form :modal="formData" label-width="80px" size="large">
                    <el-form-item label="用户名" prop="name">
                        <el-input v-model="formData.name" placeholder="请输入用户名" />
                    </el-form-item>
                    <el-form-item label="真实姓名" prop="realname">
                        <el-input v-model="formData.realname" placeholder="请输入真实姓名" />
                    </el-form-item>
                    <el-form-item v-if="isCreateNew" label="密码" prop="password">
                        <el-input
                            v-model="formData.password"
                            placeholder="请输入密码"
                            show-password
                        />
                    </el-form-item>
                    <el-form-item label="电话号码" prop="cellphone">
                        <el-input v-model="formData.cellphone" placeholder="请输入电话号码" />
                    </el-form-item>
                    <el-form-item label="选择角色" prop="roleId">
                        <!-- <el-input v-model="formData.roleId" placeholder="请选择角色" /> -->
                        <el-select
                            v-model="formData.roleId"
                            placeholder="请选择角色"
                            style="width: 100%"
                        >
                            <template v-for="role in entireRoles" :key="role.id">
                                <el-option :label="role.name" :value="role.id"></el-option>
                            </template>
                            <!-- <el-option label="足球" value="2"></el-option> -->
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选择部门" prop="department">
                        <el-select
                            v-model="formData.departmentId"
                            placeholder="请选择角色"
                            style="width: 100%"
                        >
                            <template v-for="department in entireDepartments" :key="department.id">
                                <el-option
                                    :label="department.name"
                                    :value="department.id"
                                ></el-option>
                            </template>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="handleConfirmBtnClick"> 确定 </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import useMainStore from '@/store/main/main';
import useSystemStore from '@/store/main/system/system';
import { storeToRefs } from 'pinia';

const dialogVisible = ref(false);
const formData = reactive({
    name: '',
    realname: '',
    password: '',
    cellphone: '',
    roleId: '',
    departmentId: ''
});

// 获取角色数据
const mainStore = useMainStore();
const { entireRoles, entireDepartments } = storeToRefs(mainStore);

const systemStore = useSystemStore();

const isCreateNew = ref(false);
let editUserInfo = ref();

// const departmentsList = ref(mainStore.entireDepartments);

function handleModalToggle(isNew = true, userInfo?: any) {
    dialogVisible.value = !dialogVisible.value;

    if (!isNew) {
        // 编辑处理
        isCreateNew.value = false;
        editUserInfo.value = userInfo;
        for (const key in userInfo) {
            formData[key] = userInfo[key];
        }
    } else {
        // 新建处理
        isCreateNew.value = true;
        editUserInfo.value = null;
        for (const key in formData) {
            formData[key] = '';
        }
    }
}

function handleConfirmBtnClick() {
    dialogVisible.value = false;
    console.log('确认的数据---------', formData);
    if (isCreateNew.value) {
        systemStore.createNewUserAction(formData);
    } else {
        systemStore.editUserInfoAction(editUserInfo.value.id, formData);
    }
}

defineExpose({
    handleModalToggle
});
</script>

<style lang="less" scoped>
.user-modal {
    :deep(.el-dialog) {
        padding: 16px 32px;
    }
}
</style>

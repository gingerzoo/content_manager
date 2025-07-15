<template>
    <div class="user-modal">
        <el-dialog v-model="dialogVisible" title="新建用户" width="30%" center>
            <div class="form">
                <el-form :modal="formData" label-width="80px" size="large">
                    <el-form-item label="用户名" prop="name">
                        <el-input v-model="formData.name" placeholder="请输入用户名" />
                    </el-form-item>
                    <el-form-item label="真实姓名" prop="realname">
                        <el-input v-model="formData.realname" placeholder="请输入真实姓名" />
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
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
                    <el-button type="primary" @click="dialogVisible = false"> 确定 </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import useMainStore from '@/store/main/main';
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

// const departmentsList = ref(mainStore.entireDepartments);

function handleModalToggle() {
    dialogVisible.value = !dialogVisible.value;
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

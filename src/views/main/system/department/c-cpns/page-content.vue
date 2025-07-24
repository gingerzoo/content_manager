<template>
    <div class="user-content">
        <div class="header">
            <h3>用户列表</h3>
            <el-button type="primary" @click="handleUserCreate">新建用户</el-button>
        </div>
        <div class="user-table">
            <el-table :data="pageList" border style="width: 100%">
                <el-table-column type="selection" align="center" width="70" />
                <el-table-column type="index" align="center" label="序号" width="70" />
                <el-table-column prop="name" align="center" label="部门名称" width="160px" />
                <el-table-column prop="leader" align="center" label="部门领导" width="160px" />
                <el-table-column prop="parentId" align="center" label="上级部门" width="150px" />
                <el-table-column prop="createAt" align="center" label="创建时间">
                    <template #default="scope"> {{ formatUTC(scope.row.createAt) }} </template>
                </el-table-column>
                <el-table-column prop="updateAt" align="center" label="更新时间">
                    <template #default="scope"> {{ formatUTC(scope.row.updateAt) }} </template>
                </el-table-column>

                <el-table-column align="center" label="操作" width="180px">
                    <template #default="scope">
                        <el-button
                            size="small"
                            text
                            type="primary"
                            icon="Edit"
                            @click="handleEditBtnClick(scope.row)"
                            >编辑</el-button
                        >
                        <el-button
                            size="small"
                            text
                            type="danger"
                            icon="Delete"
                            @click="hanleDeleteBtnClick(scope.row.id)"
                        >
                            删除</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pagnination">
            <el-pagination
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                :page-sizes="[10, 20, 30, 40]"
                size="small"
                layout="sizes, prev, pager, next, jumper,total"
                :total="pageTotalCount"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import useSystemStore from '@/store/main/system/system';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { formatUTC } from '@/utils/format';
import { ref } from 'vue';
import { deleteUserById } from '@/service/main/system/system';

const systemStore = useSystemStore();
// systemStore.getUserListAction();

// 展示数据
// 因为接口请求是异步的，所以要将usesList变为响应式的
const { pageList, pageTotalCount } = storeToRefs(systemStore);

const currentPage = ref(1);
const pageSize = ref(10);
fetchPageListData();

function handleSizeChange() {
    console.log('handleSizeChange-----', pageSize.value);
    fetchPageListData();
}

function handleCurrentChange() {
    console.log('handleCurrentChange----', currentPage.value);
    fetchPageListData();
}

// 要暴露要暴露 否则上级组件拿不到这个方法
function fetchPageListData(formData: any = {}) {
    const size = pageSize.value;
    const offset = (currentPage.value - 1) * pageSize.value;
    const params = {
        offset,
        size,
        ...formData
    };
    console.log('params--------', params);

    systemStore.getPageListAction('department', params);
}

function hanleDeleteBtnClick(userId) {
    console.log('点击删除按钮-------', userId);
    systemStore.deletePageAction('department', userId);
}

const emit = defineEmits(['create-user', 'edit-user']);

function handleUserCreate() {
    console.log('新建用户----------------');
    emit('create-user');
}

function handleEditBtnClick(userInfo) {
    console.log('编辑--------------', userInfo);
    emit('edit-user', userInfo);
}

defineExpose({
    fetchPageListData
});
</script>

<style lang="less" scoped>
.user-content {
    margin-top: 20px;
    padding: 20px;
    background-color: white;

    .header {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: 30px;
        font-size: 18px;
    }

    .user-table {
        :deep(.el-table__cell) {
            padding: 12px 0;
        }

        .el-button {
            padding: 5px 8px;
        }
    }
}

.user-table {
    .el-table__cell {
        padding: 12px 0;
    }
}

.pagnination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
</style>

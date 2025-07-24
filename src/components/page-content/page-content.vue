<template>
    <div class="content">
        <div class="header">
            <h3>{{ props.contentConfig.header.title }}</h3>
            <el-button v-if="isCreate" type="primary" @click="handleUserCreate">{{
                props.contentConfig.header.btnTitle
            }}</el-button>
        </div>
        <div class="table">
            <el-table
                :data="pageList"
                border
                style="width: 100%"
                role-key="id"
                v-bind="contentConfig.childrenTree"
            >
                <template v-for="item in contentConfig.pageList">
                    <template v-if="item.type === 'timer'">
                        <el-table-column align="center" v-bind="item">
                            <template #default="scope">
                                {{ formatUTC(scope.row[item.prop]) }}
                            </template>
                        </el-table-column>
                    </template>
                    <template v-else-if="item.type === 'handler'">
                        <el-table-column align="center" v-bind="item">
                            <template #default="scope">
                                <el-button
                                    v-if="isUpdate"
                                    size="small"
                                    text
                                    type="primary"
                                    icon="Edit"
                                    @click="handleEditBtnClick(scope.row)"
                                    >编辑</el-button
                                >
                                <el-button
                                    v-if="isDelete"
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
                    </template>
                    <template v-else-if="item.type === 'custom'">
                        <el-table-column align="center" v-bind="item">
                            <template #default="scope">
                                <slot :name="item.slotName"></slot>
                            </template>
                        </el-table-column>
                    </template>
                    <template v-else>
                        <el-table-column align="center" v-bind="item"> </el-table-column>
                    </template>
                </template>
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
import useLoginStore from '@/store/login/login';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { formatUTC } from '@/utils/format';
import { ref } from 'vue';
import { deleteUserById } from '@/service/main/system/system';
import usePermissions from '@/hooks/usePermissions';

interface IProps {
    contentConfig: {
        header: {
            title?: string;
            btnTitle?: string;
        };
        pageList: any[];
        pageName: string;
        childrenTree?: any;
    };
}
const props = defineProps<IProps>();

const systemStore = useSystemStore();
// systemStore.getUserListAction();

// 展示数据
// 因为接口请求是异步的，所以要将usesList变为响应式的
const { pageList, pageTotalCount } = storeToRefs(systemStore);
console.log('pageList------------', pageList);

const currentPage = ref(1);
const pageSize = ref(10);

function handleSizeChange() {
    console.log('handleSizeChange-----', pageSize.value);
    fetchPageListData();
}

function handleCurrentChange() {
    console.log('handleCurrentChange----', currentPage.value);
    fetchPageListData();
}

// 获取用户是否有对应的增删改查的权限

const isCreate = usePermissions(`${props.contentConfig.pageName}:create`);
const isDelete = usePermissions(`${props.contentConfig.pageName}:delete`);
const isUpdate = usePermissions(`${props.contentConfig.pageName}:update`);
const isQuery = usePermissions(`${props.contentConfig.pageName}:query`);

fetchPageListData();

// 要暴露要暴露 否则上级组件拿不到这个方法
function fetchPageListData(formData: any = {}) {
    // 先判断是否有查询数据
    if (!isQuery) return;
    const size = pageSize.value;
    const offset = (currentPage.value - 1) * pageSize.value;
    const params = {
        offset,
        size,
        ...formData
    };
    console.log('params--------', params);
    systemStore.getPageListAction(props.contentConfig.pageName, params);
}

function hanleDeleteBtnClick(userId) {
    console.log('点击删除按钮-------', userId);
    systemStore.deletePageAction(props.contentConfig.pageName, userId);
}

const emit = defineEmits(['create-click', 'edit-click']);

function handleUserCreate() {
    console.log('新建用户----------------');
    emit('create-click');
}

function handleEditBtnClick(userInfo) {
    console.log('编辑--------------', userInfo);
    emit('edit-click', userInfo);
}

defineExpose({
    fetchPageListData
});
</script>

<style lang="less" scoped>
.content {
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

    .table {
        :deep(.el-table__cell) {
            padding: 12px 0;
        }

        .el-button {
            padding: 5px 8px;
        }
    }
}
.table {
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

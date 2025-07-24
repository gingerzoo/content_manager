<template>
    <div class="user-search">
        <!-- <h2>user-search</h2> -->
        <el-form label-width="80px" :model="searchForm" ref="formRef">
            <el-row :gutter="80">
                <el-col :span="8">
                    <el-form-item label="部门名称" prop="name">
                        <el-input v-model="searchForm.name" placeholder="请输入查询的部门名称">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="部门领导" prop="leader">
                        <el-input v-model="searchForm.leader" placeholder="请输入查询的部门领导">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="创建时间" prop="createAt">
                        <el-input v-model="searchForm.createAt" placeholder="请输入查询的手机号码">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <div class="btns">
            <el-button icon="Refresh" @click="handleResetClick">重置</el-button>
            <el-button icon="search" type="primary" @click="handleSearchClick">搜索</el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance, ElForm } from 'element-plus';

const searchForm = reactive({
    name: '',
    leader: '',
    createAt: ''
});

// 重置操作
const formRef = ref<FormInstance>();
const emit = defineEmits(['filter-list', 'reset-list']);

function handleResetClick() {
    console.log('点击重置-------');
    formRef.value?.resetFields();
    emit('reset-list');
}

function handleSearchClick() {
    console.log('点击搜索aaaaa-------');
    // 过滤掉没有值的选项-------------
    const params = {};
    for (const key in searchForm) {
        console.log('--------key----', key);
        if (!searchForm[key]) continue;
        params[key] = searchForm[key];
    }
    // console.log('搜索传递的筛选项-------', params);
    emit('filter-list', params);
}
</script>

<style lang="less" scoped>
.user-search {
    background-color: white;
    // padding: 19.9998px;
    padding: 15px 0;

    .el-form-item {
        padding: 19.9998px 30.0003px;
        margin-bottom: 0px;
    }

    .btns {
        text-align: right;
        padding: 0 50px 10px 0;

        .el-button {
            height: 36px;
        }
    }

    // border-radius: 19.9998px;
}
</style>

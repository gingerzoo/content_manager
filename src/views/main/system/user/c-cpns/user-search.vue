<template>
    <div class="user-search">
        <!-- <h2>user-search</h2> -->
        <el-form label-width="80px" :model="searchForm" ref="formRef">
            <el-row :gutter="80">
                <el-col :span="8">
                    <el-form-item label="用户名" prop="name">
                        <el-input v-model="searchForm.name" placeholder="请输入查询的用户名">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="真实姓名" prop="realname">
                        <el-input v-model="searchForm.realname" placeholder="请输入查询的真实姓名">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="手机号码" prop="cellphone">
                        <el-input v-model="searchForm.cellphone" placeholder="请输入查询的手机号码">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="状态" prop="status">
                        <el-select placeholder="请选择查询状态" v-model="searchForm.status">
                            <el-option label="启用" value="1" />
                            <el-option label="禁用" value="0" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="创建时间" prop="createAt">
                        <el-date-picker
                            type="daterange"
                            v-model="searchForm.createAt"
                            range-separator="-"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                        />
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
    realname: '',
    cellphone: '',
    status: '',
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
    console.log('点击搜索-------');
    emit('filter-list', searchForm);
}
</script>

<style lang="less" scoped>
.user-search {
    background-color: white;
    // padding: 19.9998px;

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

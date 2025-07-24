<template>
    <div v-if="isQuery" class="search-wrap">
        <!-- <h2>user-search</h2> -->
        <el-form label-width="80.0004px" :model="searchForm" ref="formRef">
            <el-row :gutter="80">
                <template v-for="item in props.searchConfig.formItems">
                    <el-col :span="8">
                        <el-form-item :label="item.label" :prop="item.name">
                            <template v-if="item.type === 'input'">
                                <el-input
                                    v-model="searchForm[item.prop]"
                                    :placeholder="item.placeholder"
                                >
                                </el-input>
                            </template>
                            <template v-else-if="item.type === 'date-picker'">
                                <el-date-picker
                                    type="daterange"
                                    v-model="searchForm[item.prop]"
                                    range-separator="-"
                                    start-placeholder="开始时间"
                                    end-placeholder="结束时间"
                                />
                            </template>
                            <template v-else-if="item.type === 'select'">
                                <el-select
                                    v-model="searchForm[item.prop]"
                                    :placeholder="item.placeholder"
                                    style="width: 100%"
                                >
                                    <el-option
                                        v-for="option in item.options"
                                        :key="option.value"
                                        :value="option.value"
                                        :label="option.label"
                                    />
                                </el-select>
                            </template>
                        </el-form-item>
                    </el-col>
                </template>
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
import usePermissions from '@/hooks/usePermissions';

interface IProps {
    searchConfig: {
        formItems: any[];
        pageName: string;
    };
}

const props = defineProps<IProps>();

const initialValue = {};
props.searchConfig.formItems.forEach((item) => {
    initialValue[item.name] = item.initialValue ?? '';
});

const searchForm = reactive(initialValue);
const isQuery = usePermissions(``);

// 重置操作
const formRef = ref<FormInstance>();
const emit = defineEmits(['filter-click', 'reset-click']);

function handleResetClick() {
    formRef.value?.resetFields();
    emit('reset-click');
}

function handleSearchClick() {
    // 过滤掉没有值的选项-------------
    const params = {};
    for (const key in searchForm) {
        if (!searchForm[key]) continue;
        params[key] = searchForm[key];
    }
    emit('filter-click', params);
}
</script>

<style lang="less" scoped>
.search-wrap {
    background-color: white;
    // padding: 19.9998px;
    padding: 14.9995px 0;

    .el-form-item {
        padding: 19.9998px 30.0003px;
        margin-bottom: 0px;
    }

    .btns {
        text-align: right;
        padding: 0 50.0001px 10.0005px 0;

        .el-button {
            height: 35.9999px;
        }
    }

    // border-radius: 19.9998px;
}
</style>

<template>
    <div class="user-modal">
        <el-dialog
            v-model="dialogVisible"
            :title="isCreateNew ? modalConfig.header.newTitle : modalConfig.header.editTitle"
            width="30%"
            center
        >
            <div class="form">
                <el-form :modal="formData" label-width="80px" size="large">
                    <template v-for="item in modalConfig.formItems" :key="item.name">
                        <el-form-item :label="item.label" :prop="item.name">
                            <template v-if="item.type === 'input'">
                                <el-input
                                    v-model="formData[item.prop]"
                                    :placeholder="item.placeholder"
                                >
                                </el-input>
                            </template>
                            <template v-else-if="item.type === 'select'">
                                <el-select
                                    v-model="formData[item.prop]"
                                    :placeholder="item.placeholder"
                                    style="width: 100%"
                                >
                                    <el-option
                                        v-for="option in item.options"
                                        :key="option.value"
                                        :label="option.label"
                                        :value="option.value"
                                    />
                                </el-select>
                            </template>
                            <template v-else-if="item.type === 'custom'">
                                <slot :name="item.slotName"></slot>
                            </template>
                        </el-form-item>
                    </template>
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
import { ref, reactive, toRefs } from 'vue';
import useMainStore from '@/store/main/main';
import useSystemStore from '@/store/main/system/system';
import { storeToRefs } from 'pinia';
import { isTemplateNode } from '@vue/compiler-core';
import modelConfig from '@/views/main/system/department/config/modal.config';

interface IProps {
    modalConfig: {
        header: {
            newTitle: string;
            editTitle: string;
        };
        formItems: any[];
        pageName: string;
    };
    otherInfo?: any;
}

const props = defineProps<IProps>();

//加toRefs是为了防止丢失响应式
// const { modalConfig } = toRefs(props);

const dialogVisible = ref(false);

const initialData = {};
// props.modalConfig.formItems.forEach((item) => {
//     initialData[item.prop] = item.initialValue ?? '';
// });

for (const item of props.modalConfig.formItems) {
    initialData[item.prop] = item.initialValue ?? '';
}

const formData = reactive(initialData);

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
            if (!Object.keys(formData).includes(key)) continue;
            formData[key] = userInfo[key];
        }
    } else {
        // 新建处理
        isCreateNew.value = true;
        editUserInfo.value = null;
        for (const key in formData) {
            const item = props.modalConfig.formItems.find((item) => item.prop == key);
            formData[key] = item ? item.initialValue : '';
        }
    }
}

function handleConfirmBtnClick() {
    dialogVisible.value = false;

    let infoData = { ...formData };
    if (props.otherInfo) {
        infoData = { ...infoData, ...props.otherInfo };
    }
    if (isCreateNew.value) {
        systemStore.createNewPageAction(props.modalConfig.pageName, infoData);
    } else {
        systemStore.editPageInfoAction(props.modalConfig.pageName, editUserInfo.value.id, infoData);
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

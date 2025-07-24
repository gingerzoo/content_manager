import { ref } from 'vue';
import type pageModal from '@/components/page-modal/page-modal.vue';

type EditFnType = (data: any) => void;

export default function usePageModal(editCallback?: EditFnType) {
    const modalRef = ref<InstanceType<typeof pageModal>>();

    function handleNewPageCreate() {
        modalRef.value?.handleModalToggle();
    }

    function handlePageEdit(userInfo) {
        console.log('edit-----info---before', userInfo);
        modalRef.value?.handleModalToggle(false, userInfo);

        if (editCallback) editCallback(userInfo);
    }

    return {
        modalRef,
        handleNewPageCreate,
        handlePageEdit
    };
}

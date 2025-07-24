import { ref } from 'vue';
import type pageContent from '@/components/page-content/page-content.vue';

export default function usePageContent(Itype) {
    const contentRef = ref<InstanceType<typeof pageContent>>();

    function handlePagelistFilter(formInfo) {
        console.log('传递过来的formInfo---------', formInfo);
        contentRef.value?.fetchPageListData(formInfo);
    }

    function handlePagelistReset() {
        contentRef.value?.fetchPageListData();
    }

    return {
        contentRef,
        handlePagelistFilter,
        handlePagelistReset
    };
}

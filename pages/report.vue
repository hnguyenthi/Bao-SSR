<script setup>
import { ref } from 'vue';
const breadcrumbs = ref([
    {
        title: 'ホーム',
        link: 'top',
    },
    {
        title: '収支報告書管理',
    },
]);

const openModal = ref(false);
const handleYes = () => {};
const handleNo = () => {};
</script>
<template>
    <div class="bg-light">
        <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
        <TitlePage title="収支報告書管理" />
        <ReportContent />
        <Notice />
        <Modal v-model="openModal" @yes="handleYes" buttonNo="cancel">
            <p
                class="mb-[13px] text-center text-[27px] font-bold text-[#000000a6]"
            >
                「{{ dataAction.name }}」
            </p>
            <p class="text-center">削除してもよろしいですか？</p>
        </Modal>
    </div>
</template>
<style lang="scss" scoped>
.notice-item {
    margin-bottom: 10px;
    font-size: 14px;
    color: #000;
    line-height: 1.8;
    position: relative;
    padding-left: 25px;
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        transform: translateY(50%);
        display: inline-block;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: theme('colors.secondary.100');
    }
}

ol {
    list-style: none;
    li {
        list-style: decimal;
        margin-left: 20px;
    }
}
</style>

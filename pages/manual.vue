<script setup>
import { ref, watch, onMounted } from 'vue';
const breadcrumbs = ref([
    {
        title: 'ホーム',
        link: 'top',
    },
    {
        title: 'マニュアル・テンプレート',
    },
]);
const data = ref([
    {
        title: 'マニュアル',
        subTitle: 'ビズアナオーナーについてのマニュアルは下記からダウンロード可能です。',
        link: '',
        aHref: 'マニュアルのダウンロード'
    },
    {
        title: '専用テンプレートシート',
        subTitle: '自主管理の不動産オーナーの方専用のExcelで入力できるテンプレートは下記からダウンロード可能です。',
        link: '',
        aHref: '専用テンプレートシートのダウンロード'
    }
])
</script>
<template>
    <div class="bg-light pb-[40px]">
        <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
        <TitlePage title="マニュアル・テンプレート" />
        <div class="container mx-auto bg-white flex items-center justify-center">
            <div class="py-[70px] max-w-[880px] max-auto">
                <div v-for="item in data" :key="item.title" class="pb-[50px] mb-[50px] border-b border-grey border-solid">
                    <div class="mb-[24px] text-[24px] border-l-4 pl-3 border-solid border-primary">{{item.title}}</div>
                    <div class="mb-[26px] text-[14px]">{{item.subTitle}}</div>
                    <div class="flex cursor-pointer">
                        <img class="object-none" src="~/assets/images/common/dl-icon.svg" alt="">
                        <p class="pl-3 text-[14px] text-primary underline">{{item.aHref}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

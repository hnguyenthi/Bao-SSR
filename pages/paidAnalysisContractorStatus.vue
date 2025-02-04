<script setup>
import { ref, watch, onMounted } from 'vue';
import { formatPrice } from '~/utils';
import Swal from 'sweetalert2';

const breadcrumbs = ref([
    {
        title: 'ホーム',
        link: 'top',
    },
    {
        title: '物件管理・分析',
        link: 'paidAnalysisDashboard',
    },
    {
        title: '物件管理',
        link: 'paidAnalysisPropertyStatus',
    },
]);

const title = ref('グリーンパーク川口');
const form = ref({
    memo: '',
    phoneNumber: '090-1111-2223',
    email: 'masu@masu.jp',
});
const mockDataTableFile = ref({
    fields: ['name'],
    headers: [
        {
            title: '名前',
            field: 'name',
        },
        {
            title: '削除',
            width: 40,
            field: 'action',
        },
    ],
    data: [
        {
            date: '2023/07/07 19:34:40',
            name: '1621302_s.jpg',
        },
    ],
});
const openModal = ref(false);
const search = ref('');
const closeModal = () => {
    openModal.value = false;
};
const handleYes = () => {};
const handleSave = () => {
    let options = {
        title: '更新の確認',
        text: '更新してよろしいですか？',
        icon: 'info',
        iconColor: '#c9dae1',
        showCancelButton: true,
        confirmButtonColor: '#7cd1f9',
        cancelButtonColor: '#7cd1f9',
        confirmButtonText: 'はい',
        cancelButtonText: 'いいえ',
        reverseButtons: true,
    };
    Swal.fire(options).then((result) => {
        if (result.isConfirmed) {
            let optionsYes = {
                title: '更新しました。',
                text: '画面をリロードします',
                icon: 'success',
                iconColor: '#c9dae1',
                showCancelButton: false,
                confirmButtonColor: '#7cd1f9',
                confirmButtonText: 'OK',
                reverseButtons: true,
            };
            Swal.fire(optionsYes).then((result) => {});
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            console.log('no');
        }
    });
};
</script>
<template>
    <div class="bg-light pb-[40px]">
        <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
        <TitlePage title="物件管理・分析" showButton />
        <div class="container mx-auto mb-[28px] rounded-t-md bg-white">
            <TabControlPage />
            <div class="pb-[30px] md:mx-[50px]">
                <div class="form-body pb-[40px] pt-[28px]">
                    <div
                        class="flex justify-between border-b border-solid border-grey pb-[19px] text-[22px]"
                    >
                        <div class="">増田　孝太</div>
                        <div class="">グリーンパーク川口</div>
                    </div>
                    <div
                        class="form-item grid grid-cols-12 border-b border-solid border-grey pb-[10px] pt-[10px]"
                    >
                        <div
                            class="col-span-12 lg:col-span-2 flex items-center text-[14px] text-dark pb-2 lg:py-0"
                        >
                            契約者電話番号
                        </div>
                        <div class="col-span-7 md:col-span-3">
                            <TextInput v-model="form.phoneNumber" />
                        </div>
                    </div>
                    <div
                        class="form-item grid grid-cols-12 border-b border-solid border-grey pb-[10px] pt-[10px]"
                    >
                        <div
                            class="col-span-12 lg:col-span-2 flex items-center text-[14px] text-dark col-span-12 lg:col-span-2 pb-2 lg:py-0"
                        >
                            契約者メールアドレス
                        </div>
                        <div class="col-span-7 md:col-span-3">
                            <TextInput v-model="form.email" />
                        </div>
                    </div>
                    <div
                        class="form-item grid grid-cols-12 border-b border-solid border-grey pb-[10px] pt-[10px]"
                    >
                        <div
                            class="col-span-12 lg:col-span-2 flex items-start text-[14px] text-dark pb-2 lg:py-0"
                        >
                            契約者メモ
                        </div>
                        <div class="col-span-12 md:col-span-12">
                            <Textarea rows="8" v-model="form.memo" label="" />
                            <div class="pt-[10px] text-right">
                                <SecondaryButton
                                    type="refresh"
                                    @click="handleSave"
                                    >更新</SecondaryButton
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div
            class="container mx-[50px] mx-auto mb-[28px] rounded-t-md bg-white pb-[49px] pt-[37px]"
        >
            <div class="lg:mx-[50px]">
                <p class="title mb-[16px] text-[22px]">ファイル一覧</p>
                <div>
                    <SearchInput placeholder="検索" v-model="search" />
                    <TableFile
                        :fields="mockDataTableFile.fields"
                        :headers="mockDataTableFile.headers"
                        :data="mockDataTableFile.data"
                    />
                </div>
            </div>
        </div>
        <Modal v-model="openModal" @yes="handleYes">
            <p class="text-center">
                外部のサイトに移動しますがよろしいですか？
            </p>
        </Modal>
    </div>
</template>

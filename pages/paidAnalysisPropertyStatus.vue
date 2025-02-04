<script setup>
import { ref, watch, onMounted } from 'vue';

// import { formatPrice } from '~/utils';

// import { CATEGORY_INCOME_EXPENSE } from '~/utils/constraints.js';

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
const month = ref({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
});
const title = ref('グリーンパーク川口');
const mockDataIncomeAndExpenses = ref({
    income: 370000,
    expenses: 35000,
});
const mockDataTablePropertyStatus = ref({
    fields: ['roomID', 'contractName', 'contractStatus', 'price', 'endDate'],
    headers: [
        {
            title: '部屋番号',
            width: 220,
        },
        {
            title: '収支項目',
            width: 220,
        },
        {
            title: '収支項目',
            width: 220,
        },
        {
            title: '賃料',
            width: 220,
        },
        {
            title: '契約終了月',
        },
    ],
    data: [
        {
            roomID: '101',
            contractName: '増田　孝太',
            contractStatus: true,
            price: 48000,
            endDate: '',
        },
        {
            roomID: '102',
            contractName: '吉田　浩二',
            contractStatus: true,
            price: 70000,
            endDate: '',
        },
        {
            roomID: '103',
            contractName: '奥山　康史',
            contractStatus: true,
            price: 51000,
            endDate: '',
        },
        {
            roomID: '201',
            contractName: '佐藤　志野',
            contractStatus: true,
            price: 73000,
            endDate: '',
        },
        {
            roomID: '202',
            contractName: '■■企画',
            contractStatus: true,
            price: 0,
            endDate: '',
        },
        {
            roomID: '203',
            contractName: '',
            contractStatus: false,
            price: 0,
            endDate: '2019/02',
        },
    ],
});
const memo = ref('');
const notes = ref([
    {
        title: '明細',
        contents: [
            '※金額は税込み表示です',
            '※金額及び備考をタップすることで修正が可能です',
        ],
    },
    {
        title: '合計',
        contents: ['※金額は税込み表示です'],
    },
]);
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
const handleYes = () => {
};
const handleSaveMemo = () => {
};
</script>
<template>
    <div class="bg-light pb-[40px]">
        <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
        <TitlePage title="物件管理・分析" showButton/>
        <div class="container mx-auto mb-[28px] rounded-t-md bg-white">
            <TabControlPage />
            <div class="md:mx-[50px] pb-[30px]">
                <div
                    class="flex justify-center border-b-[1px] border-solid border-grey  pt-[15px] pb-[21px]"
                >
                    <div class="max-w-[242px]">
                        <DatePicker v-model="month" type="month-picker" />
                    </div>
                </div>

                <div
                    class="align-center flex justify-center pb-[28px] pt-[24px]"
                >
                    <div class="">
                        <DoughnutChart />
                    </div>
                </div>
                <div>
                    <div
                        class="note mb-[13px] flex items-center justify-between hidden lg:block"
                    >
                        <div class="flex items-center justify-start">
                            <p class="text-[22px]">{{ notes[0].title }}</p>
                            <p
                                class="ml-[20px] text-[14px]"
                                v-for="(note, index) in notes[0].contents"
                                :key="'note-' + index"
                            >
                                {{ note }}
                            </p>
                        </div>
                    </div>
                    <TablePropertyStatus
                        :fields="mockDataTablePropertyStatus.fields"
                        :headers="mockDataTablePropertyStatus.headers"
                        :data="mockDataTablePropertyStatus.data"
                    />

                    <div class="pt-[35px]">
                        <Textarea rows="8" v-model="memo" label="物件メモ" />
                    </div>
                    <div class="pt-[10px] text-right">
                        <SecondaryButton type="refresh" @click="handleSaveMemo"
                            >更新</SecondaryButton
                        >
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

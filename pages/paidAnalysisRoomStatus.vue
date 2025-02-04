<script setup>
import { ref} from 'vue';
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
    fields: ['contractName', 'contractStatus', 'price', 'endDate'],
    headers: [
        {
            title: '契約者名',
            // width: 220,
        },
        {
            title: '契約状況',
            // width: 220,
        },
        {
            title: '賃料',
            // width: 220,
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
            price: 47000,
            endDate: '2017/07～現在',
        }
    ],
});
const memo = ref('');
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
                    class="align-center flex justify-center pb-[28px] pt-[24px]"
                >
                    <div class="">
                        <LineChart title="グリーンパーク川口／101"/>
                    </div>
                </div>
                <div>
                    <TablePropertyStatus
                        :fields="mockDataTablePropertyStatus.fields"
                        :headers="mockDataTablePropertyStatus.headers"
                        :data="mockDataTablePropertyStatus.data"
                    />
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

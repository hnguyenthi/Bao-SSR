<script setup>
import { ref, watch, onMounted, reactive } from 'vue';

import Swal from 'sweetalert2';
import { useVuelidate } from '@vuelidate/core';
import { required, helpers, numeric } from '@vuelidate/validators';
import { formatPrice } from '~/utils';
import {
    MONTH_FORM,
    OPTIONS_ROOM,
    OPTIONS_CATEGORY,
    OPTIONS_ITEM,
} from '~/utils/constraints.js';

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
        title: '支出明細',
        link: 'paidAnalysisExpenseStatus',
    },
]);
const month = ref({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
});
const title = ref('グリーンパーク川口');
const mockDataIncomeAndExpenses = ref({
    income: 126086,
    expenses: 57957,
});
const mockDataTableExpenses = ref({
    fields: ['category', 'title', 'price', 'roomID'],
    headers: [
        {
            title: '収支科目',
            width: 162,
        },
        {
            title: '収支項目',
            width: 162,
        },
        {
            title: '金額',
            width: 102,
        },
        {
            title: '部屋番号',
            width: 78,
        },
        {
            title: '備考',
        },
    ],
    data: [
        {
            category: '管理委託手数料',
            title: '管理手数料',
            price: 2500,
            roomID: '',
        },
        {
            category: '管理委託手数料',
            title: '管理手数料',
            price: 12223,
            roomID: '',
        },
        {
            category: '管理委託手数料',
            title: '管理手数料',
            price: 2234,
            roomID: '',
        },
        {
            category: '管理委託手数料',
            title: '管理手数料',
            price: 10000,
            roomID: '',
        },
        {
            category: '管理委託手数料',
            title: '定期清掃代',
            price: 25000,
            roomID: '',
        },
        {
            category: '管理委託手数料',
            title: 'その他',
            price: 6000,
            roomID: '',
        },
    ],
});

const notes = ref([
    {
        title: '明細',
        contents: [
            '※金額は税込み表示です',
            '※金額及び備考をタップすることで修正が可能です',
        ],
    },
]);
const form = reactive({
    date: '2017年10月',
    roomID: '',
    category: '賃料',
    item: '',
    price: '',
    remarks: '',
});
const openModal = ref(false);
const closeModal = () => {
    openModal.value = false;
};
const handleYes = () => {};
const handleEdit = () => {
    openModal.value = true;
};
const rules = {
    price: {
        required: helpers.withMessage('* 必須項目です', required),
        numeric: helpers.withMessage('* 金額を半角で入力してください', numeric),
    },
};
const v$ = useVuelidate(rules, form);
const handleSubmit = () => {
    v$.value.$validate();
    if (v$.value.$error) return;
    openModal.value = false;
    let result = true;
    if (result) {
        let options = {
            title: '追加しました。',
            text: '画面をリロードします',
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#7cd1f9',
            confirmButtonText: 'OK',
        };
        Swal.fire(options).then((result) => {
            if (result.isConfirmed) {
                window.location.reload();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
            }
        });
    }
};
watch(
    () => openModal.value,
    (newValue) => {
        if (!newValue) {
            v$.value.$reset();
        }
    },
);
</script>
<template>
    <div class="bg-light pb-[40px]">
        <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
        <TitlePage title="物件管理・分析" showButton />
        <div class="container mx-auto mb-[28px] rounded-t-md bg-white">
            <TabControlPage />
            <div class="lg:mx-[50px]">
                <div
                    class="flex justify-center border-b-[1px] border-solid border-grey pb-[21px] pt-[15px]"
                >
                    <div class="max-w-[242px]">
                        <DatePicker v-model="month" type="month-picker" />
                    </div>
                </div>

                <div class="pb-[28px] pt-[24px]">
                    <p class="font-normalS mb-[5px] text-center text-[20px]">
                        {{ title }}
                    </p>
                    <p class="my-[16px] text-center text-h5 font-medium">
                        支出金額計<span
                            class="text-[36px] font-medium text-red"
                            >{{
                                formatPrice(mockDataIncomeAndExpenses.expenses)
                            }}</span
                        >
                    </p>
                    <p class="my-[16px] text-center text-h6 font-medium">
                        収支金額計{{
                            formatPrice(
                                mockDataIncomeAndExpenses.expenses +
                                    mockDataIncomeAndExpenses.income,
                            )
                        }}
                    </p>
                </div>
                <div class="pb-[40px]">
                    <div
                        class="note mb-[13px] flex items-center justify-between"
                    >
                        <div
                            class="flex flex-col items-start justify-start lg:flex-row lg:items-center"
                        >
                            <p class="text-[22px]">{{ notes[0].title }}</p>
                            <p
                                class="text-[14px] lg:ml-[20px]"
                                v-for="(note, index) in notes[0].contents"
                                :key="'note-' + index"
                            >
                                {{ note }}
                            </p>
                        </div>
                        <SecondaryButton @click="handleEdit"
                            >追加</SecondaryButton
                        >
                    </div>
                    <TablePaidExpense
                        :fields="mockDataTableExpenses.fields"
                        :handleEdit="handleEdit"
                        :headers="mockDataTableExpenses.headers"
                        :data="mockDataTableExpenses.data"
                    />
                    <div class="pt-[10px] text-right">
                        <SecondaryButton @click="handleEdit"
                            >追加</SecondaryButton
                        >
                    </div>
                </div>
            </div>
        </div>
        <Modal v-model="openModal" @yes="handleYes" title="グリーンパーク川口">
            <template #body>
                <div class="form-body">
                    <div
                        class="form-item grid grid-cols-12 pb-[16px] pt-[10px]"
                    >
                        <div class="col-span-3 text-[14px] text-dark">
                            対象年月
                        </div>
                        <div class="col-span-6 md:col-span-4">
                            <Dropdown
                                v-model="form.date"
                                :options="MONTH_FORM()"
                                mode="form"
                            />
                        </div>
                    </div>
                    <div
                        class="form-item grid grid-cols-12 pb-[16px] pt-[10px]"
                    >
                        <div class="col-span-3 text-[14px] text-dark">部屋</div>
                        <div class="col-span-6 md:col-span-4">
                            <Dropdown
                                v-model="form.roomID"
                                :options="OPTIONS_ROOM"
                                mode="form"
                            />
                        </div>
                    </div>
                    <div
                        class="form-item grid grid-cols-12 pb-[16px] pt-[10px]"
                    >
                        <div class="col-span-3 text-[14px] text-dark">科目</div>
                        <div class="col-span-6 md:col-span-4">
                            <Dropdown
                                v-model="form.category"
                                :options="OPTIONS_CATEGORY"
                                mode="form"
                            />
                        </div>
                    </div>
                    <div
                        class="form-item grid grid-cols-12 pb-[16px] pt-[10px]"
                    >
                        <div class="col-span-3 text-[14px] text-dark">項目</div>
                        <div class="col-span-6 md:col-span-4">
                            <Dropdown
                                v-model="form.item"
                                :options="OPTIONS_ITEM"
                                mode="form"
                            />
                        </div>
                    </div>
                    <div
                        class="form-item grid grid-cols-12 pb-[16px] pt-[10px]"
                    >
                        <div class="col-span-3 text-[14px] text-dark">金額</div>
                        <div class="col-span-5 md:col-span-4">
                            <TextInput
                                @focusout="
                                    () => {
                                        v$.$validate();
                                    }
                                "
                                @change="
                                    () => {
                                        v$.$validate();
                                    }
                                "
                                :error="v$?.price?.$errors[0]?.$message ?? ''"
                                v-model="form.price"
                                type="text"
                            />
                        </div>
                    </div>
                    <div
                        class="form-item grid grid-cols-12 pb-[16px] pt-[10px]"
                    >
                        <div class="col-span-3 text-[14px] text-dark">備考</div>
                        <div class="col-span-9">
                            <Textarea v-model="form.remarks" :rows="4" form />
                        </div>
                    </div>
                </div>
            </template>
            <template #footer>
                <div class="flex flex-col items-center justify-center">
                    <p class="mt-[10px] text-h6 text-red md:text-h5">
                        データを対象年月のシートに移動したい場合は、お手数ですが、登録データを一度削除した後、対象年月のシートを表示してから改めてデータ追加してください。
                    </p>
                    <PrimaryButton
                        @click="handleSubmit"
                        type="success"
                        class="mb-[27px] mt-[20px] h-[52px] !w-[250px] rounded-sm"
                    >
                        追加
                    </PrimaryButton>
                </div>
            </template>
        </Modal>
    </div>
</template>

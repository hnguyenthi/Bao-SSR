<script setup>
import { ref, onMounted } from 'vue';
import { formatNumber, animation, formatPrice } from '~/utils';
import paidAnalysisPropertyStatus from '~/assets/images/paidAnalysis/icon-paidAnalysisPropertyStatus.svg';
import paidAnalysisIncomeStatus from '~/assets/images/paidAnalysis/icon-paidAnalysisIncomeStatus.svg';
import paidAnalysisExpenseStatus from '~/assets/images/paidAnalysis/icon-paidAnalysisExpenseStatus.svg';
import paidAnalysisIncomeList from '~/assets/images/paidAnalysis/icon-paidAnalysisIncomeList.svg';
import paidAnalysisBalanceList from '~/assets/images/paidAnalysis/icon-paidAnalysisBalanceList.svg';
import Swal from 'sweetalert2';
onMounted(() => {
    animation('.count');
});
const props = defineProps({
    tabActive: {
        type: String,
        default: '',
    },
});

const tabs = ref([
    {
        title: '物件管理',
        icon: paidAnalysisPropertyStatus,
        link: 'paidAnalysisPropertyStatus',
    },
    {
        title: '収入明細',
        icon: paidAnalysisIncomeStatus,
        link: 'paidAnalysisIncomeStatus',
    },
    {
        title: '支出明細',
        icon: paidAnalysisExpenseStatus,
        link: 'paidAnalysisExpenseStatus',
    },
    {
        title: '入金一覧',
        icon: paidAnalysisIncomeList,
        link: 'paidAnnualPaymentInformation',
    },
    {
        title: '収支一覧',
        icon: paidAnalysisBalanceList,
        link: 'paidAnnualBalanceInformation',
    },
]);
const mockData = ref([
    {
        name: 'グリーンパーク川口',
        room: {
            empty: 1,
            lending: 5,
        },
        income: 242000,
        expenses: 57957,
        urlImage: '',
    },
    {
        name: 'パークハウス赤坂',
        room: {
            empty: 1,
            lending: 15,
        },
        income: 776000,
        expenses: 147539,
        urlImage: '',
    },
    {
        name: 'リバーサイド赤羽',
        room: {
            empty: 0,
            lending: 8,
        },
        income: 468127,
        expenses: 184866,
        urlImage: '',
    },
]);
const img = ref('');
const handleClick = () => {
    let options = {
        title: '月を選択してください。',
        icon: 'info',
        iconColor: '#c9dae1',
        showCancelButton: false,
        confirmButtonColor: '#7cd1f9',
        cancelButtonColor: '#7cd1f9',
        confirmButtonText: 'はい',
        cancelButtonText: 'いいえ',
        reverseButtons: true,
    };
    Swal.fire(options).then((result) => {
        if (result.isConfirmed) {
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            console.log('no');
        }
    });
};
</script>
<template>
    <div class="">
        <div
            class="contract-content grid grid-cols-1 py-5 md:grid-cols-2 md:py-[8px] lg:grid-cols-8"
            v-for="(data, index) in mockData"
            :key="index"
        >
            <div class="contract-info col-span-2 md:col-span-1 lg:col-span-2">
                <div class="mr-7">
                    <UploadImage v-model="data.urlImage" />
                </div>
                <div>
                    <p class="text-[14px]">{{ data.name }}</p>
                    <p class="text-[12px]">
                        {{
                            `在室数${data.room.lending}／空室数${data.room.empty}`
                        }}
                    </p>
                </div>
            </div>
            <div
                class="contract-balance col-span-2 px-[18px] pt-3 md:col-span-1 md:pt-0 lg:col-span-3"
            >
                <div class="flex h-full items-center justify-between">
                    <div>
                        <p class="text-[12px] font-medium">収入</p>
                        <p class="text-h6 font-medium text-info-600">
                            <!-- {{ formatPrice(data.income) }} -->
                            ￥<span class="count">{{ data.income }}</span>
                        </p>
                    </div>
                    <div>
                        <p class="text-[12px] font-medium">支出</p>
                        <p class="text-h6 font-medium text-error-100">
                            <!-- {{ formatPrice(data.expenses) }} -->
                            ￥<span class="count">{{ data.expenses }}</span>
                        </p>
                    </div>
                    <div>
                        <p class="text-[12px] font-medium">利益</p>
                        <p class="text-h6 font-medium text-info-600">
                            <!-- {{ formatPrice(data.income - data.expenses) }} -->
                            ￥<span class="count">{{
                                data.income - data.expenses
                            }}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div
                class="col-span-2  md:mt-0 border-t-[2px] border-dashed border-grey pt-3 md:px-[18px] lg:col-span-3 lg:mt-0 lg:border-none lg:pt-0"
            >
                <div
                    class="flex h-full items-center justify-between"
                    v-if="tabActive === 'month'"
                >
                    <NuxtLink
                        v-for="(tab, index) in tabs"
                        :key="index + tab.title"
                        :to="tab.link"
                    >
                        <div class="cursor-pointer hover:opacity-70">
                            <div class="flex justify-center">
                                <img :src="tab.icon" alt="" />
                            </div>
                            <p class="pt-[10px] text-[14px] text-info-600">
                                {{ tab.title }}
                            </p>
                        </div>
                    </NuxtLink>
                </div>
                <div class="flex h-full items-center justify-between" v-else>
                    <button
                        @click="handleClick"
                        v-for="(tab, index) in tabs"
                        :key="index + tab.title"
                    >
                        <div class="cursor-pointer opacity-50 grayscale-[50%]">
                            <div class="flex justify-center">
                                <img
                                    :src="tab.icon"
                                    alt=""
                                    class="grayscale-[50%]"
                                />
                            </div>
                            <p class="pt-[10px] text-[14px]">
                                {{ tab.title }}
                            </p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.contract-info {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    flex: 0 0 280px;
    @media (min-width: 768px) {
        &::after {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            margin-top: auto;
            margin-bottom: auto;
            width: 1px;
            height: 34px;
            background-color: theme('colors.grey');
        }
    }
}
.contract-balance {
    position: relative;
    @media (min-width: 768px) {
        &::after {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            margin-top: auto;
            margin-bottom: auto;
            width: 1px;
            height: 34px;
            background-color: theme('colors.grey');
        }
    }
}
.contract-content {
    border-top: solid 1px theme('colors.grey');
    &:last-child {
        border-bottom: solid 1px theme('colors.grey');
    }
}
</style>

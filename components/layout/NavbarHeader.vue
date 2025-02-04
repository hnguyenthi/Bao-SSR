<script setup>
import { ref, inject, watch, computed } from 'vue';
import iconPaidAnalysisDashboard from '~/assets/images/common/icon-gnav-paidAnalysisDashboard.svg';
import iconReport from '~/assets/images/common/icon-gnav-report.svg';
import iconPremium from '~/assets/images/common/icon-gnav-premium.svg';
import iconMemberContent from '~/assets/images/common/icon-gnav-member-content.svg';
import iconNews from '~/assets/images/common/icon-gnav-news.svg';
import Swal from 'sweetalert2';
const route = useRoute()

const props = defineProps({
    currentRouteName: String,
})

const navbar = ref([
    {
        title: '物件管理・分析',
        link: '/paidAnalysisDashboard',
        childLink: [
            'paidAnalysisPropertyStatus',
            'paidAnalysisIncomeStatus',
            'paidAnalysisExpenseStatus',
            'paidAnnualPaymentInformation',
            'paidAnnualBalanceInformation',
        ],
        icon: iconPaidAnalysisDashboard,
    },
    {
        title: '収支報告書管理',
        link: '/report',
        icon: iconReport,
    },
    {
        title: '提携サービス',
        link: '/premium',
        icon: iconPremium,
    },
    {
        title: 'セミナー動画',
        icon: iconMemberContent,
        action: () => {
            let options = {
                text: '外部のサイトに移動しますがよろしいですか？',
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
                    window.open('https://www.o.biz-ana.com/member-content/');
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    console.log('no');
                }
            });
        },
    },
    {
        title: 'お知らせ',
        link: '/news-archive',
        icon: iconNews,
    },
]);
</script>

<template>
    <nav class="h-[66px] bg-white shadow-lg">
        <div class="container mx-auto h-full !px-0">
            <div class="grid h-full grid-flow-col justify-stretch">
                <div
                    class="item-center relative flex hidden h-full w-[120px] justify-items-center xl:block xl:w-[222px]"
                >
                    <div
                        class="header-logo - flex h-[54px] w-[120px] items-center justify-center rounded-t-[5px] bg-white lg:absolute lg:bottom-0 xl:h-[92px] xl:w-[222px] 2xl:-top-7 2xl:w-[222px]"
                    >
                        <NuxtLink
                            to="/top"
                            class="h-full content-center items-center justify-center"
                        >
                            <img
                                src="~/assets/images/common/logo.png"
                                alt="logo"
                                class="h-[34px] w-[100px] xl:h-[60px] xl:w-[180px]"
                            />
                        </NuxtLink>
                    </div>
                </div>
                <NuxtLink
                    class="md:navbar-item relative flex font-bold text-primary hover:bg-secondary-200"
                    :class="{
                        'bg-secondary-300 md:border-b-4 md:border-secondary-100':
                             route.fullPath.includes(item.link) ||item.childLink?.some((link) => route.fullPath.includes(link)),
                    }"
                    v-for="item in navbar"
                    :key="item.title"
                    :to="item.link ? item.link :'#'"
                >
                    <div
                        v-if="item.link"
                        class="lg:align-center my-auto w-full items-center justify-center justify-self-auto md:px-2 lg:flex xl:px-[1.66rem]"
                    >
                        <div class="mr-0 flex justify-center lg:pr-2">
                            <img
                                :src="item.icon"
                                alt=""
                                class="lg:[w-22px] h-[20px] w-[20px] lg:h-[22px]"
                            />
                        </div>
                        <div class="text-center text-[10px] lg:text-[16px]">
                            {{ item.title }}
                        </div>
                    </div>
                    <div
                        v-else
                        @click="item.action"
                        class="lg:align-center my-auto w-full items-center justify-center justify-self-auto md:px-2 lg:flex xl:px-[1.68rem]"
                    >
                        <div class="mr-0 flex justify-center lg:pr-2">
                            <img
                                :src="item.icon"
                                alt=""
                                class="lg:[w-22px] h-[20px] w-[20px] lg:h-[22px]"
                            />
                        </div>
                        <div class="text-center text-[10px] lg:text-[16px]">
                            {{ item.title }}
                        </div>
                        <div
                            class="lg:[w-22px] hidden h-[20px] w-[20px] pl-2 lg:block lg:h-[22px]"
                        >
                            <img
                                class="lg:[w-22px] h-[20px] w-[20px] lg:h-[22px]"
                                src="~/assets/images/common/icon-newtab-gold.svg"
                                alt=""
                            />
                        </div>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </nav>
</template>
<style lang="scss" scoped>
.navbar-item::after {
    content: '';
    position: absolute;
    top: 16px;
    right: 0;
    bottom: 16px;
    width: 1px;
    background-color: #d5d5d5;
}
</style>

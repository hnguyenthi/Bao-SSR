<script setup>
import {ref} from 'vue';
const footerMenu1 = ref([
    {
        title: '物件管理分析',
        link: 'paidAnalysisDashboard',
    },
    {
        title: '収⽀報告書',
        link: '/report',
    },
    {
        title: '提携サービス',
        link: '/premium',
    },
    {
        title: 'セミナー動画',
        link: 'https://www.o.biz-ana.com/member-content/',
        icon: true,
    },
    {
        title: 'お知らせ',
        link: '/news-archive',
    },
]);
const footerMenu2 = ref([
    {
        title: 'マイページ・プラン切替',
        link: '/mypage',
    },
    {
        title: 'マニュアル・テンプレート',
        // link: 'report',
        link: '/manual',
    },
    {
        title: 'お問い合わせ',
        link: '/contact',
    },
    {
        title: 'ログアウト',
        link: '',
    },
]);
function backToTop() {
    window.scroll({ 
    top: 0, 
    behavior: "smooth"
  });
}
</script>

<template>
    <footer class="bg-primary pt-[27px] pb-[15px] xl:pb-[29px] xl:pt-[45px]">
        <div class="grid grid-cols-12 xl:grid-cols-5">
            <div
                class="relative col-span-10 col-start-2 xl:col-span-3 xl:col-start-2 xl:border-b-[1px] xl:border-white pb-[16px] xl:pb-[56px] xl:col-span-3"
            >
                <div
                    class="grid grid-cols-2 gap-x-1 xl:grid-cols-2 xl:gap-x-28"
                >
                    <div>
                        <NuxtLink to="/top">
                            <img
                                src="~/assets/images/common/logo_footer.png"
                                alt="logo"
                                class="h-[50px] w-[150px] xl:h-[60px] xl:w-[180px]"
                            />
                        </NuxtLink>
                    </div>

                    <div class="block md:hidden relative">
                        <div class="pageup bottom-0 cursor-pointer" @click="backToTop">
                            <div class=""></div>
                        </div>
                    </div>
                    <div class="hidden md:block">
                        <div
                            class="grid grid-flow-col grid-rows-3 gap-y-3 xl:gap-x-20"
                        >
                            <div v-for="item in footerMenu1" :key="item.title">
                                <Link
                                    class="flex items-center"
                                    :href="
                                        item.icon ? item.link : item.link
                                    "
                                >
                                    <div class="font-bold text-white">
                                        {{ item.title }}
                                    </div>
                                    <div v-if="item.icon" class="pl-2">
                                        <img
                                            src="~/assets/images/common/icon-newtab-white.svg"
                                            alt=""
                                        />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="hidden md:block">
                    <div class="pageup cursor-pointer" @click="backToTop">
                        <div class=""></div>
                    </div>
                </div>
            </div>
            <div class="col-span-10 md:col-span-3 col-start-2 xl:col-start-2 pt-[27px]">
                <div class="grid grid-cols-1 xl:grid-cols-3">
                    <div class="col-span-2 gap-x-5 hidden md:flex">
                        <div
                            v-for="(item, index) in footerMenu2"
                            :key="index"
                            class="text-[14px] text-white"
                            :class="{
                                'border-r-[1px]':
                                    index < footerMenu2.length - 1,
                            }"
                        >
                            <NuxtLink :to="item.link" class="hover:opacity-60">
                                <div class="pr-[16px]">
                                    {{ item.title }}
                                </div>
                            </NuxtLink>
                        </div>
                    </div>
                    <div class="text-left xl:text-right text-[14px] text-white">
                        2025 CBIT Co.Ltd.
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>
<style lang="scss" scoped>
.pageup {
    position: absolute;
    right: 0;
    bottom: 10px;
    z-index: 9;
    width: 48px;
    height: 48px;
    background-color: var(--theme-color);
    border: solid 2px #fff;
    border-radius: 50%;
    transition: all 0.3s;
}
.pageup div::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: 10px;
    height: 10px;
    border-top: solid 2px #fff;
    border-right: solid 2px #fff;
    transform: rotate(-45deg);
}
</style>

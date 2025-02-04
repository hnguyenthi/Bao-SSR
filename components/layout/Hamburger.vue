<script setup>
// import { Link, router } from '@inertiajs/vue3';
import { reactive, ref } from 'vue';
const hamburgerList = reactive([
    {
        title: 'マイページ',
        link: '/mypage',
        isSlot: false,
    },
    {
        title: 'マニュアル・テンプレート',
        link: '/manual',
        isSlot: false,
    },
    {
        title: 'お問い合わせ',
        link: '/contact',
        isSlot: false,
    },
    {
        title: 'update',
        link: '/mypage',
        isSlot: true,
    },
    {
        title: 'logout',
        isSlot: true,
    },
]);
const hamburgerListMini = reactive([
    {
        title: 'マイページ',
        link: '/mypage',
        isSlot: false,
    },
    {
        title: 'マニュアル・テンプレート',
        link: '/manual',
        isSlot: false,
    },
    {
        title: 'お問い合わせ',
        link: '/contact',
        isSlot: false,
    },

    {
        title: 'ログアウト',
        link: '',
        isSlot: true,
    },
]);
const showingNavigationDropdown = ref(false);
const handleLogout = () => {
    route.push('/');
};
</script>

<template>
    <div>
        <!-- laptop, desktop -->
        <div class="hidden bg-secondary-100 md:block">
            <div
                class="container mx-auto flex h-[64px] justify-between xl:h-[34px] xl:justify-end"
            >
                <div class="block h-full content-end pr-20 xl:hidden">
                    <div
                        class="header-logo - flex h-[54px] w-[120px] items-center justify-center rounded-t-[5px] bg-white 2xl:h-[92px] 2xl:w-[222px]"
                    >
                        <NuxtLink to="/top">
                            <img
                                src="~/assets/images/common/logo.png"
                                alt="logo"
                                class="h-[34px] w-[100px] 2xl:h-[60px] 2xl:w-[180px]"
                            />
                        </NuxtLink>
                    </div>
                </div>
                <div
                    class="flex auto-cols-max flex-wrap content-center justify-end"
                >
                    <div
                        v-for="item in hamburgerList"
                        :key="item.title"
                        class="flex content-center justify-items-center text-[14px] text-white"
                    >
                        <NuxtLink
                            :to="item.link"
                            class="`px-[10px] py-[5px]  hover:opacity-70 text-white`"
                        >
                            <div v-if="!item.isSlot" class="text-white  hover:opacity-70 px-3">
                                {{ item.title }}
                            </div>
                            <div
                                v-else-if="
                                    item.isSlot && item.title === 'update'
                                "
                                class="flex items-center text-white hover:opacity-70 px-3"
                            >
                                <span>出茂 太郎様</span>
                                <span>／</span>
                                <span>スタンダード</span>
                                <div class="flex items-center pl-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14.667"
                                        height="14"
                                        viewBox="0 0 14.667 14"
                                    >
                                        <path
                                            d="M15.667,8.493,14.04,6.633l.227-2.46L11.86,3.627,10.6,1.5l-2.267.973L6.067,1.5,4.807,3.627,2.4,4.167l.227,2.467L1,8.493l1.627,1.86L2.4,12.82l2.407.547L6.067,15.5l2.267-.98,2.267.973,1.26-2.127,2.407-.547-.227-2.46Zm-2.633.987-.373.433.053.567.12,1.3-1.267.287-.56.127-.293.493-.66,1.12-1.187-.513-.533-.227-.527.227-1.187.513-.66-1.113L5.667,12.2l-.56-.127L3.84,11.787l.12-1.307.053-.567L3.64,9.48,2.78,8.5l.86-.987.373-.433-.06-.573-.12-1.293L5.1,4.927,5.66,4.8l.293-.493.66-1.12L7.8,3.7l.533.227L8.86,3.7l1.187-.513.66,1.12L11,4.8l.56.127,1.267.287-.12,1.3-.053.567.373.433.86.98Z"
                                            transform="translate(-1 -1.5)"
                                            fill="#fff"
                                        />
                                        <path
                                            d="M8.823,11.79,7.277,10.237l-.987.993,2.533,2.54,4.893-4.907L12.73,7.87Z"
                                            transform="translate(-2.763 -3.623)"
                                            fill="#fff"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div
                                @click="handleLogout"
                                v-else-if="
                                    item.isSlot && item.title === 'logout'
                                "
                                class="align-center flex justify-items-center text-white hover:opacity-70 px-3"
                            >
                                <div class="flex items-center pr-1 ">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14"
                                        height="14"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            d="M121.167,230A1.2,1.2,0,0,1,120,228.833V217.167A1.2,1.2,0,0,1,121.167,216h5.658v1.167h-5.658v11.667h5.658V230Zm9.45-3.6-.836-.836,1.983-1.983h-6.806v-1.167h6.767l-1.983-1.983.836-.836L134,223.019Z"
                                            transform="translate(-120 -216)"
                                            fill="#fff"
                                        />
                                    </svg>
                                </div>
                                <span>ログアウト</span>
                            </div>
                        </NuxtLink>
                        <span class="py-[5px]">|</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- mobile, tablet -->
        <div
            class="hamburger container relative mx-auto block flex h-[40px] items-center justify-between bg-white md:hidden"
        >
            <div>
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
            <div class="text-[10px] text-primary">
                <div class="pr-[20px]">
                    <NuxtLink to="/mypage">
                        <div>出茂 太郎様</div>
                        <div class="flex">
                            <span>スタンダード </span>
                            <span>
                                <img
                                    src="~/assets/images/common/icon-plan.svg"
                                    alt=""
                                />
                            </span>
                        </div>
                    </NuxtLink>
                </div>
                <div>
                    <div
                        class="pc-off hamburger-icon"
                        :class="{ 'menu-active': showingNavigationDropdown }"
                        @click="
                            showingNavigationDropdown =
                                !showingNavigationDropdown
                        "
                    >
                        <span></span><span></span><span></span>
                    </div>
                </div>
                <div
                    class="absolute right-[10px] top-[40px] z-50 w-[210px] rounded-sm bg-secondary-100"
                    x-show="open"
                    x-transition:enter="transition ease-out duration-300"
                    x-transition:enter-start="opacity-0 scale-95"
                    x-transition:enter-end="opacity-100 scale-100"
                    x-transition:leave="transition ease-in duration-150"
                    x-transition:leave-start="opacity-100 scale-100"
                    x-transition:leave-end="opacity-0 scale-95"
                >
                    <div
                        :class="{
                            block: showingNavigationDropdown,
                            hidden: !showingNavigationDropdown,
                        }"
                        class="py-[30px]"
                    >
                        <div class="px-6">
                            <NuxtLink
                                v-for="(item, index) in hamburgerListMini"
                                :key="item.title + index"
                                :to="item.link"
                                class="flex justify-center py-[6px]"
                            >
                                <div
                                    class="flex items-center pr-1"
                                    v-if="item.isSlot"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14"
                                        height="14"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            d="M121.167,230A1.2,1.2,0,0,1,120,228.833V217.167A1.2,1.2,0,0,1,121.167,216h5.658v1.167h-5.658v11.667h5.658V230Zm9.45-3.6-.836-.836,1.983-1.983h-6.806v-1.167h6.767l-1.983-1.983.836-.836L134,223.019Z"
                                            transform="translate(-120 -216)"
                                            fill="#fff"
                                        />
                                    </svg>
                                </div>
                                <div
                                    class="py-[4px] text-center text-[12px] font-normal text-white"
                                >
                                    {{ item.title }}
                                </div>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.hamburger::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 40px;
    box-shadow: 0 8px 8px rgb(193, 192, 192, 0.35);
    pointer-events: none;
}
.hamburger-icon {
    position: absolute;
    top: 0;
    right: 0;
    width: 38px;
    height: 40px;
    z-index: 3;
    span {
        position: absolute;
        left: 6px;
        width: 20px;
        height: 2px;
        background-color: var(--theme-color);
        transition: 0.1s all;
    }
    :nth-child(1) {
        top: 12px;
    }
    :nth-child(2) {
        top: 19px;
    }
    :nth-child(3) {
        top: 26px;
    }
}
.menu-active {
    :nth-child(1) {
        left: 6px;
        transform: rotate(45deg);
        top: 17px;
    }
    :nth-child(2) {
        display: none;
    }
    :nth-child(3) {
        left: 6px;
        top: 17px;
        transform: rotate(-45deg);
    }
}
</style>

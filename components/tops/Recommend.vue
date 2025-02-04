<script setup>
// import { router } from '@inertiajs/vue3';

const handleClick = () => {
    // router.visit('/category/panasonic');
};
</script>

<template>
    <div class="w-full px-[20px] md:w-[500px] md:px-[40px]">
        <div class="title m-auto w-full rounded bg-secondary-100">
            <p
                class="text-center text-[28px] font-bold leading-[50px] text-white md:w-[460px]"
            >
                今月のおすすめ
            </p>
        </div>
        <div class="w-full">
            <img src="~/assets/images/top/recommend.png" alt="recommend" />
        </div>
        <div>
            <PrimaryButton
                @click="handleClick"
                classes="!h-[50px]"
                type="primary"
                radius="default"
            >
                <div class="text-[24px] font-bold text-white">詳しく見る</div>
            </PrimaryButton>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    title: {
        type: String,
        default: '',
    },
    showButton: {
        type: Boolean,
        default: false,
    },
    handleButton: {
        type: Function,
        default: () => {},
    },
});
</script>
<template>
    <div class="container mx-auto pb-[18px] nd:pb-[21px] pt-[25px] md:pt-[35px]">
        <div class="flex content-center justify-between items-center">
            <h2 class="text-h5 md:text-h2 font-medium">{{ title }}</h2>
            <PrimaryButton
                @click="handleButton"
                v-if="showButton"
                classes="!w-[140px] !h-[42px] bg-white border-[1px] border-primary border-solid"
            >
                <div class="flex justify-between text-dark">
                    <img src="~/assets/images/common/prev-ic.svg" alt="" />
                    <NuxtLink to="/paidAnalysisDashboard">
                        <span class="font-normal text-dark">戻る</span>
                        </NuxtLink
                    >
                    <div></div>
                </div>
            </PrimaryButton>
        </div>
    </div>
</template>

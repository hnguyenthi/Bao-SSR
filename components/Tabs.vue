<script setup>
const emit = defineEmits(['update:modelValue']);
const props = defineProps({
    tabs: {
        type: Array,
        default: []
    },
    modelValue: {
        type: [String, Number],
        default: '',
    },
})
</script>
<template>
    <div>
        <div class="grid h-[44px] lg:h-[54px] gap-0" :class="`grid-cols-${tabs.length}`">
            <div v-for="tab in tabs" :key="tab.value" @click="emit('update:modelValue', tab.value)"
                class="container__tab col-span-1 flex cursor-pointer content-center items-center justify-center rounded-t-md text-[11px] lg:text-h5 font-semibold"
                :class="{ 'tab-active': modelValue === tab.value }">
                <span>
                    {{tab.title}}
                </span>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.tab-active {
    border-top: 5px solid theme('colors.primary');
    height: 64px;
    background-color: theme('colors.white');
    color: theme('colors.primary');
   @media (max-width: 768px) {
        height: 44px;
    }
}
.container__tab:not(.tab-active) {
    height: 54px;

    margin-top: 10px;
    background-color: theme('colors.primary');
    color: theme('colors.white');
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
     @media (max-width: 768px) {
        height: 34px;
    }
    span {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        &::after {
            content: '';
            display: block;
            margin-top: 5px;
            width: 12px;
            height: 8px;
            background-color: #fff;
            clip-path: polygon(0 0, 100% 0, 50% 100%);
            -webkit-clip-path: polygon(0 0, 100% 0, 50% 100%);
        }
    }
}
</style>

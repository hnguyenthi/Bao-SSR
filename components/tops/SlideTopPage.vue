<script setup>
import { ref } from 'vue';

const props = defineProps({
    data: {
        type: Array,
        default: {},
    },
    lineTitle: {
        type: Number,
        default: 2,
    },
    handleClick: {
        type: Function,
        default: () => {}
    }
});
</script>
<template>
    <div class="px-[40px]">
        <SlideCarousel :data="data" title="提携サービス">
            <template v-slot="{ data }">
                <SlideItem @click="handleClick(data)" :dataItem="data" :lineTitle="lineTitle" />
            </template>
        </SlideCarousel>
    </div>
</template>

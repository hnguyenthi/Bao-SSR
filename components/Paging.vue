<script setup>
import { watch } from 'vue';
import { ITEM_PER_PAGE } from '~/utils/constraints.js';


const props = defineProps({
    totalPage: {
        type: Number,
        default: 1,
    },
    itemPerPage: {
        type: [Number, String],
        default: ITEM_PER_PAGE,
    },
});
watch(
    () => props.totalPage,
    () => {
        // router.visit(
        //     route(route().current(), [
        //         { ...route().queryParams, page: 1 },
        //     ]),
        // );
    },
);
watch(
    () => props.itemPerPage,
    (newValue) => {
        
        // router.visit(
        //     route(route().current(), [
        //         { ...route()?.queryParams, itemPerPage: newValue, page: 1 },
        //     ]),
        // );
    },
);
const handleNext = () => {
    // if (parseInt(route()?.queryParams?.page) < totalPage || (totalPage !== 1 && !route()?.queryParams?.page)) return;
    // router.visit(
    //     route(route().current(), [
    //         {
    //             ...route()?.queryParams,
    //             page: parseInt(route()?.queryParams.page) + 1,
    //         },
    //     ]),
    // );
}
const handlePre = () => {
    // router.visit(
    //     route(route().current(), [
    //         {
    //             ...route()?.queryParams,
    //             page: parseInt(route()?.queryParams.page) - 1,
    //         },
    //     ]),
    // );
}
</script>
<template>
    <div class="text-[12px] md:text-[14px] flex items-center">
        <!-- v-if="parseInt(route()?.queryParams?.page) > 1" -->
        <div
        @click="handlePre"
            
           
            class="btn btn-pre mr-2"
            >{{ `<` }}</div
        >
        ページ {{ 1 }} / {{ totalPage }}
        <!--  v-if="parseInt(route()?.queryParams?.page) < totalPage || (totalPage !== 1 && !route()?.queryParams?.page)" -->
        <div class="ml-2 btn btn-next" @click="handleNext"></div>
    </div>
</template>
<style lang="scss" scoped>
.btn {
    position: relative;
    background-color: #f0f0f0;
    color: #f0f0f0;
    text-decoration: none;
    padding: 5px 10px;
    border: 1px solid #ddd;
    cursor: pointer;
    width: 30px;
    height: 28px;
    transition: background-color 0.3s ease;
    &::before {
        content: '';
        position: absolute;
        top: 50%;
        width: 10px;
        height: 10px;
        border-right: 2px solid #1e4290;
        border-bottom: 2px solid #1e4290;
        transform: translateY(-50%);
    }
}
.btn-pre {
    &::before {
        transform: translateY(-50%) translateX(1px) rotate(135deg);
    }
}
.btn-next {
    &::before {
        transform: translateY(-50%) translateX(-1px) rotate(-45deg);
    }
}
</style>

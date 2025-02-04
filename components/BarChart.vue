<script setup>
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
} from 'chart.js';
import { Bar } from 'vue-chartjs';
import {
    DATA_DEFAULT,
    OPTIONS_DEFAULT,
    options_test,
} from '~/utils/constraints.js';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

const props = defineProps({
    data: {
        type: Object,
        default: DATA_DEFAULT,
    },
    options: {
        type: Object,
        default: OPTIONS_DEFAULT,
    },
    width: {
        type: [Number, String],
        default: 540,
    },
    height: {
        type: [Number, String],
        default: 405,
    },
    note: {
        type: String,
        default: '',
    },
    title: {
        type: String,
        default: '',
    },
});
</script>
<template>
    <div class="mt-10">
        <p class="text-center text-[20px] pb-5">{{ title }}</p>
        <div class="h-[262px] w-[350px] md:h-[405px] md:w-[1100px]">
            <Bar :data="data" :options="options" />
            <!-- <Bar :data="data" :options="options" :height="height" /> -->

            <!-- <p class="text-[12px]">※グラフの金額は千円未満を四捨五入しています。</p> -->
            <p class="text-[12px]">{{ note }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

import { BREAK_POINT_STEP_SIZE } from '~/utils/constraints.js';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'vue-chartjs';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

const props = defineProps({
    // data: {
    //     type: Object,
    //     default: DATA_DEFAULT,
    // },
    // options: {
    //     type: Object,
    //     default: OPTIONS_DEFAULT,
    // },
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
const data = {
    labels: ['2017/07', '2017/08'],
    datasets: [
        {
            label: '賃料',
            backgroundColor: '#1e4290',
            data: [47000, 54000],
        },
    ],
};
const setStepSize = () => {
    let maxData = 54000;
    let stepSize = BREAK_POINT_STEP_SIZE.find(
        (item) => item.max >= maxData,
    ).step;
    return stepSize;
};
const stepSize = ref(0);
stepSize.value = setStepSize();
const options = {
    responsive: true,
    scales: {
        y: {
            beginAtZero: true,
            autoSkip: false,
            min: 0,
            ticks: {
                font: {
                    size: 12,
                },
                stepSize: stepSize.value,
                precision: 0,
                callback: function (label, index) {
                    return `￥${label
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
                },
            },
        },
    },
    plugins: {
        tooltip: {
            enabled: true,
            callbacks: {
                label: function (context) {
                    let label = context.dataset.label || '';

                    if (label) {
                        label += ': ';
                    }
                    if (context.parsed.y !== null) {
                        label +=
                            ' : ￥' +
                            context.parsed.y
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                    }
                    return label;
                },
            },
        },
        legend: {
            display: true,
            position: 'top',
            labels: {
                boxWidth: 20,
                boxHeight: 20,
                font: {
                    size: 18,
                },
            },
        },
    },
};
</script>
<template>
    <div>
        <p class="pb-5 text-center text-[20px]">{{ title }}</p>
        <div class="h-[200px] w-[350px] md:h-[405px] md:w-[540px]">
            <Line :data="data" :options="OPTIONS_DEFAULT" />
        </div>
    </div>
</template>

<script setup>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'vue-chartjs';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
    labels: ['在室数', '空室数'],
    datasets: [
        {
            backgroundColor: ['#1e4290', '#d5d5d5'],
            data: [7, 1],
        },
    ],
};
const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '80%',
    radius: '100%',
    plugins: {
        legend: {
            display: true,
            position: 'bottom',
            labels: {
                boxWidth: 20,
                font: {
                    size: 14,
                },
            },
        },
    },
};
const plugins = {
    beforeDraw: (chart) => {
        const emptyRoom = chart.data.datasets[0].data[1];
        const lendingRoom = chart.data.datasets[0].data[0];
        const ctx = chart.ctx;
        const xCoor =
            chart.chartArea.left +
            (chart.chartArea.right - chart.chartArea.left) / 2;
        const yCoor =
            chart.chartArea.top +
            (chart.chartArea.bottom - chart.chartArea.top) / 2;
        ctx.save();
        ctx.font = 'normal 18px  sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`稼働状況`, xCoor, yCoor - 15);
        ctx.font = 'normal 30px sans-serif';
        ctx.fillText(
            `${lendingRoom}/${lendingRoom + emptyRoom} 戸`,
            xCoor,
            yCoor + 20,
        );
        ctx.restore();
    },
};
</script>
<template>
    <p class="w-[350px] pb-5 text-center text-[20px]">グリーンパーク川口</p>
    <div class="h-[350px] w-[350px]">
        <Doughnut :data="data" :options="options" :plugins="[plugins]" />
    </div>
</template>
<style lang="scss" scoped></style>

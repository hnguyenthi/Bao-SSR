<script setup>
import userHouse from '~/assets/mockData/chart/userHouse.json';
console.log('userHouse', userHouse);
const options = {
  responsive: true,
  maintainAspectRatio: false,
//   scales: {
//     y: {
//       ticks: {
//         stepSize: 1,
//       },
//     },
//   },
  tooltips: {
    enabled: true,
  },
  plugins: {
    legend: {
      display: true,
      position: "top",
      labels: {
        boxWidth: 14,
        boxHeight: 14,
        font: {
          size: 16,
        },
      },
    },
  },
  animation: {
    animateScale: true,
    animateRotate: true,
  },
  cutoutPercentage: 80,
};
const data = ref({
    labels: userHouse.map((item) => item.regdate),
    datasets: [
        {
            label: '戸数',
            backgroundColor: '#03a2d5',
            borderColor: '#03a2d5',
            // borderWidth: 2.5,
            // pointRadius: 2,
            data: userHouse.map((item) => item.total || 0),
        },
    ],
    
});
</script>
<template>
    <div>
        <AdminLineChart
            :data="data"
            :options="options"
          />
    </div>
</template>
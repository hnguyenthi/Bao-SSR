<script setup>
import userBuilding from '~/assets/mockData/chart/userBuilding.json';
console.log('userBuilding', userBuilding);
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
        labels: userBuilding.map((item) => item.regdate),
        datasets: [
            {
                label: '棟数',
                backgroundColor: '#03a2d5',
                borderColor: '#03a2d5',
                data: userBuilding.map((item) => item.total || 0),
            },
        ],
    
});
// const mapData = () => {
//     data.value = {
//         labels: userBuilding.map((item) => item.regdate),
//         datasets: [
//             {
//                 label: '棟数',
//                 backgroundColor: '#03a2d5',
//                 borderColor: '#03a2d5',
//                 data: userBuilding.map((item) => item.total || 0),
//             },
//         ],
//     };
// }
// mapData()
</script>
<template>
    <div>
        <AdminLineChart
            :data="data"
            :options="options"
          />
    </div>
</template>
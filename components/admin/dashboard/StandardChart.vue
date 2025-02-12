<script setup>
import userStandard from '~/assets/mockData/chart/userStandard.json';
console.log(userStandard);
const data = ref({
    labels: userStandard.map((item) => item.regdate),
    datasets: [
        {
            label: '件数',
            backgroundColor: '#03a2d5',
            borderColor: '#03a2d5',
            data: userStandard.map((item) => item.total),
        },
    ],
});
</script>
<template>
    <div>
        <AdminLineChart
            :data="data"
            :height="200"
          />
    </div>
</template>
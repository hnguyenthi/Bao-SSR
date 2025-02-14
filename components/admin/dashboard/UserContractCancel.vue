<script setup>
import userCancel from "~/assets/mockData/chart/userCancel.json";
console.log(userCancel);
const data = ref({
  labels: userCancel.map((item) => item.regdate),
  datasets: [
    {
      label: "件数",
      backgroundColor: "#03a2d5",
      borderColor: "#03a2d5",
      data: userCancel.map((item) => item.total),
    },
  ],
});
</script>
<template>
  <div>
    <AdminLineChart :data="data" :width="540" :height="405" />
  </div>
</template>

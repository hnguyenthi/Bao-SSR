<script setup>
import { ref } from "vue";

import { BREAK_POINT_STEP_SIZE } from "~/utils/constraints.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const OPTIONS_DEFAULT = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      ticks: {
        // font: {
        //   size: 10,
        // },
        stepSize: 1,
      },
      },
    //  x: {
    //   ticks: {
    //     font: {
    //       size: 10,
    //     },
       
    //   },
    // },
  },
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
const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
  options: {
    type: Object,
    default: {},
  },
  width: {
    type: Number,
    default: 540,
  },
  height: {
    type: Number,
    default: 355,
  },
  note: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
});
</script>
<template>
  <div>
    <p class="pb-5 text-center text-[20px]" v-if="title">{{ title }}</p>
    <div>
      <Line
        :height="height"
        :width="width"
        :data="data"
        :options="Boolean(options) ? OPTIONS_DEFAULT : options"
      />
    </div>
  </div>
</template>

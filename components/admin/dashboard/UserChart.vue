<script setup>
import { ref, watch } from "vue";
import dayjs from "dayjs";
import userMonth from "~/assets/mockData/chart/userMonth.json";
const tabs = ref([
  {
    value: "all",
    title: "全期間件数",
  },
  {
    value: "year",
    title: "年間件数",
  },
]);

const tabActive = ref("year");
const dataAll = ref({
  labels: userMonth.map((item) => item.regdate),
  datasets: [
    {
      label: "全期間件数",
      backgroundColor: "#03a2d5",
      borderColor: "#03a2d5",
      data: userMonth.map((item) => item.total),
    },
  ],
});

const yearOptions = ref([]);
const getYears = () => {
  yearOptions.value = userMonth.reduce((arr, current) => {
    let value = dayjs(current.regdate).format("YYYY");
    if (!arr.includes(value)) {
      arr.push(value);
    }
    return arr;
  }, []);
};
getYears();
const year = ref("2024");
const dataYear = ref({
  labels: [],
  datasets: [
    {
      label: `${year.value}年件数`,
      backgroundColor: "#03a2d5",
      borderColor: "#03a2d5",
      data: [],
    },
  ],
});
const getYearData = () => {
  dataYear.value = {
    labels: [],
    datasets: [
      {
        label: `${year.value}年件数`,
        backgroundColor: "#03a2d5",
        borderColor: "#03a2d5",
        data: [],
      },
    ],
  };
  for (let i = 1; i <= 12; i++) {
    dataYear.value.labels.push(`${year.value}/${(i + "").padStart(2, "0")}`);
  }
  dataYear.value.datasets[0].data = dataYear.value.labels.map((item) => {
    let data = userMonth.find((value) => {
      return dayjs(value.regdate).format("YYYY/MM") === item;
    });
    return data ? data.total : 0;
  });
};
getYearData();
watch(
  () => year.value,
  () => {
    getYears();
    getYearData();
  }
);
</script>
<template>
  <div>
    <div>
      <div>
        <!-- <AdminTabs :tabs="tabs" v-model="tabActive" />
        <div v-if="tabActive === 'all'">
          <AdminLineChart
            :data="dataAll"
            :width="540"
            :height="405"
          />
        </div>
        <div v-if="tabActive === 'year'">
          <div class="pt-4">
            <select
              v-model="year"
              class="form-control !h-[30px] !py-1 !w-[100px] text-[14px] bg-white"
            >
              <option
                class="text-[14px]"
                :value="item"
                v-for="(item, index) in yearOptions"
                :key="`per-items-${item}-${index}`"
              >
                {{ item }}
              </option>
            </select>
          </div>
          <AdminLineChart
            :data="dataYear"
            :width="540"
            :height="405"
          />
        </div> -->
        <div class="grid grid-cols-2 gap-x-6">
          <div class="pt-[30px] px-[40px]">
            <AdminLineChart :data="dataAll"  />
            </div>
          <div class="px-[40px]">
            <select
              v-model="year"
              class="form-control !h-[30px] !py-1 !w-[100px] text-[14px] bg-white"
            >
              <option
                class="text-[14px]"
                :value="item"
                v-for="(item, index) in yearOptions"
                :key="`per-items-${item}-${index}`"
              >
                {{ item }}
              </option>
            </select>
          <AdminLineChart :data="dataYear"  />

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

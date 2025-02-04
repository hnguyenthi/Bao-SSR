<script setup>
// import Breadcrumb from '@/Components/Breadcrumb.vue';
import { ref, computed } from "vue";
// import DatePicker from '@/Components/DatePicker.vue';
// import BarChart from '@/Components/BarChart.vue';
// import Doughnut from '@/Components/DoughnutChart.vue';
// import ContractInformation from '@/Components/paidAnalysis/ContractInformation.vue';
// import TilePage from '@/Components/TitlePage.vue';
// import Tabs from '@/Components/Tabs.vue';

const date = ref();
const breadcrumbs = ref([
  {
    title: "ホーム",
    link: "top",
  },
  {
    title: "物件管理・分析",
    link: "paidAnalysisDashboard",
  },
]);
const month = ref({
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
});
const year = ref(new Date().getFullYear());
const format = (date) => {
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${year}年 ${month}月`;
};

const tab = ref("month");
const showTab = (value) => {
  tab.value = value;
};
const tabs = ref([
  {
    value: "month",
    title: "月表示",
  },
  {
    value: "year",
    title: "年表示",
  },
]);
const tabActive = ref("month");
</script>
<template>
  <div class="bg-light">
    <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
    <TitlePage title="物件管理・分析"></TitlePage>
    <div class="container mx-auto pb-[60px]">
      <div class="paid-analysis__content bg-white">
        <Tabs :tabs="tabs" v-model="tabActive" />

        <div class="mx-0 bg-white px-[20px] py-5 md:mx-[50px]">
          <div
            class="flex justify-center border-b-[1px] border-solid border-grey"
          >
            <div class="max-w-[242px]">
              <DatePicker
                v-if="tabActive === 'month'"
                v-model="month"
                type="month-picker"
              />
              <DatePicker v-else v-model="year" type="year-picker" />
            </div>
          </div>
          <div class="mb-[32px] flex justify-center">
            <BarChart />
          </div>
          <div>
            <ContractInformation :tabActive="tabActive" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.tab-active {
  border-top: 5px solid theme("colors.primary");
  height: 64px;
  background-color: theme("colors.white");
  color: theme("colors.primary");
}
.paid-analysis__tab:not(.tab-active) {
  height: 54px;
  margin-top: 10px;
  background-color: theme("colors.primary");
  color: theme("colors.white");
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    &::after {
      content: "";
      display: block;
      margin-top: 5px;
      width: 12px;
      height: 8px;
      background-color: #fff;
      clip-path: polygon(0 0, 100% 0, 50% 100%);
      -webkit-clip-path: polygon(0 0, 100% 0, 50% 100%);
    }
  }
}
.tab-active {
  border-top: 5px solid theme("colors.primary");
  height: 64px;
  background-color: theme("colors.white");
  color: theme("colors.primary");
  @media (max-width: 768px) {
    height: 44px;
  }
}
.container__tab:not(.tab-active) {
  height: 54px;

  margin-top: 10px;
  background-color: theme("colors.primary");
  color: theme("colors.white");
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    height: 34px;
  }
  span {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    &::after {
      content: "";
      display: block;
      margin-top: 5px;
      width: 12px;
      height: 8px;
      background-color: #fff;
      clip-path: polygon(0 0, 100% 0, 50% 100%);
      -webkit-clip-path: polygon(0 0, 100% 0, 50% 100%);
    }
  }
}
</style>

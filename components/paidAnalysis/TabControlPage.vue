<script setup>
import { ref } from "vue";
import paidAnalysisPropertyStatus from "~/assets/images/paidAnalysis/icon-paidAnalysisPropertyStatus.svg";
import paidAnalysisIncomeStatus from "~/assets/images/paidAnalysis/icon-paidAnalysisIncomeStatus.svg";
import paidAnalysisExpenseStatus from "~/assets/images/paidAnalysis/icon-paidAnalysisExpenseStatus.svg";
import paidAnalysisIncomeList from "~/assets/images/paidAnalysis/icon-paidAnalysisIncomeList.svg";
import paidAnalysisBalanceList from "~/assets/images/paidAnalysis/icon-paidAnalysisBalanceList.svg";
const route = useRoute();

const tabs = ref([
  {
    title: "物件管理",
    icon: paidAnalysisPropertyStatus,
    link: "/paidAnalysisPropertyStatus",
    subLink: ["/paidAnalysisContractorStatus", "/paidAnalysisRoomStatus"],
  },
  {
    title: "収入明細",
    icon: paidAnalysisIncomeStatus,
    link: "/paidAnalysisIncomeStatus",
  },
  {
    title: "支出明細",
    icon: paidAnalysisExpenseStatus,
    link: "/paidAnalysisExpenseStatus",
  },
  {
    title: "入金一覧",
    icon: paidAnalysisIncomeList,
    link: "/paidAnnualPaymentInformation",
  },
  {
    title: "収支一覧",
    icon: paidAnalysisBalanceList,
    link: "/paidAnnualBalanceInformation",
  },
]);
</script>
<template>
  <div
    class="container mx-auto h-[57px] rounded-t-md bg-white border-grey border-b-[1px] border-solid px-0"
  >
    <div class="grid h-full grid-cols-5 lg:grid-cols-6">
      <div
        v-for="(item, index) in tabs"
        :key="index + item.title"
        :class="{
          'link-active':
            (route.fullPath.includes(item.link)) ||
            item?.subLink?.some((i) => route.fullPath.includes(i)),
        }"
      >
        <NuxtLink
          :to="item.link"
          class="h-full flex flex-col lg:flex-row items-center justify-center"
        >
          <img
            :src="item.icon"
            alt=""
            class="mr-[12px] h-[20px] w-[20px] object-none"
          />
          <p
            class="text-[12px] md:text-[16px]  text-info-600"
            :class="{
              'text-primary font-semibold 111':
                (route.fullPath.includes(item.link)) ||
                item?.subLink?.some((i) => route.fullPath.includes(i)),
            }"
          >
            {{ item.title
            }}
          </p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.active {
  border-bottom: 2px solid theme("colors.primary");
}
.link-active {
  border-bottom: 2px solid theme("colors.primary");
}
</style>

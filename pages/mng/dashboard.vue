<script setup>
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
</script>

<template>
  <div>
    <!-- chart -->
    <div>
      <!-- chart user -->
      <div>
        <div class="text-[22px] text-text font-medium pb-2 px-[40px]">
          ユーザー数
        </div>
        <UserChart />
      </div>
      <div class="grid grid-cols-2 gap-x-6 mt-5">
        <!-- スタンダード -->
        <div class="px-[40px]">
          <div class="text-[22px] text-text font-medium pb-2">スタンダード</div>
          <StandardChart />
        </div>

        <!--解約ユーザー -->
        <div class="px-[40px]">
          <div class="text-[22px] text-text font-medium pb-2">解約ユーザー</div>
          <StandardChart />
        </div>
      </div>
      <div class="grid grid-cols-2 gap-x-6 mt-5">
        <!-- 総物件数 -->
        <div class="px-[40px]">
          <div class="text-[22px] text-text font-medium pb-2">総物件数</div>
          <TotalHouseChart />
        </div>
        <!-- アクティブユーザー数 -->
        <div class="px-[40px]">
          <div class="text-[22px] text-text font-medium pb-2 h-[41px]">
            <!-- アクティブユーザー数 -->
          </div>
          <TotalBuildingChart />
        </div>
      </div>
      <div class="grid grid-cols-2 gap-x-6 mt-5">
        <div class="px-[40px]">
          <div class="text-[22px] text-text font-medium pb-2">
            アクティブユーザー数
          </div>
          <ActiveUserChart />
        </div>
      </div>
    </div>
  </div>
</template>

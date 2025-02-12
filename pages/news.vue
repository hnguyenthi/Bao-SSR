<script setup>
import { ref, watch, onMounted } from "vue";
import { formatDateCustom } from "~/utils";
import newDetail from "~/assets/mockData/newDetail.json";
const chanel = new BroadcastChannel("preview-new");
chanel.onmessage = function (e) {
  console.log("Message received", e.data);
  detail.value = JSON.parse(e.data);
  breadcrumbs.value[2].title = detail.value.title;
};
const detail = ref(newDetail);
const breadcrumbs = ref([
  {
    title: "ホーム",
    link: "top",
  },
  {
    title: "お知らせ",
    link: "",
  },
  {
    title: newDetail.title,
  },
]);


</script>
<template>
  <div class="bg-light pb-[40px]">
    <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
    <TitlePage :title="detail.title" />
    <div class="container mx-auto pb-[60px]">
      <div class="bg-white px-[50px] pb-[49px] lg:pt-[37px]">
        <div class="" v-html="detail.contents"></div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.status {
  border-radius: theme("borderRadius.sm");
  display: flex;
  align-items: center;
  justify-content: center;
}
.status-information {
  background-color: #878787;
}
.status-all {
  background-color: theme("colors.primary");
}
.status-event {
  background-color: theme("colors.secondary.100");
}
</style>
<style lang="scss">
.table-new {
  table {
    overflow: hidden;
  }
  .columns-basic {
    padding-left: 0px;
  }
  td {
    @media (min-width: 768px) {
      padding-bottom: 20px;
      padding-top: 20px;
    }
  }
}
@media (min-width: 768px) {
  .new-title__link {
    position: relative;
    &::after {
      flex-shrink: 0;
      content: "";
      display: block;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 20px;
      margin: auto;
      width: 8px;
      height: 8px;
      border-top: solid 1px var(--theme-color);
      border-right: solid 1px var(--theme-color);
      transform: rotate(45deg);
    }
  }
}
</style>

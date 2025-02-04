<script setup>
const props = defineProps({
  breadcrumbs: {
    type: Array,
    default: [],
  },
});
</script>
<template>
  <div
    class="h-[34px] bg-primary flex items-center content-center hidden md:block"
  >
    <div class="container mx-auto">
      <div class="flex">
        <div
          v-for="(item, index) in breadcrumbs"
          :key="index"
          class="breadcrumb-item relative inline-block"
        >
          <NuxtLink
            class="inline-block mr-3 text-[12px] text-white"
            v-if="index < breadcrumbs.length - 1"
            :to="item?.link"
          >
            {{ item?.title }}
          </NuxtLink>
          <div v-else class="inline-block">{{ item?.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.breadcrumb-item {
  a {
    position: relative;
    &::after {
      position: absolute;
      content: "";
      display: block;
      margin-right: 10px;
      margin-left: 8px;
      width: 6px;
      height: 6px;
      border-top: solid 1px #fff;
      border-right: solid 1px #fff;
      transform: rotate(45deg);
      top: 40%;
      right: -20px;
    }
  }
}
</style>

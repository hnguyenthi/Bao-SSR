<script setup>
import { vOnClickOutside } from "@vueuse/components";
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  value: {
    type: [String, Array],
    default: "",
  },
  callback: {
    type: Function,
    default: () => {},
  },
});
const show = ref(false);
</script>
<template>
  <div
    v-on-click-outside="() => (show = false)"
    class="shadow-md rounded-full border-[1px] border-dashed border-[#d8dee4] px-2 py-1 inline-flex text-[#596171] cursor-pointer relative"
  >
    <div @click="show = !show" class="flex items-center gap-1">
     <div class="flex items-center">
       <img
        class="scale-[0.8] fill-[#d8dee4]"
        src="~/assets/images/admin/plus-icon.svg"
        alt=""
      />
      <p class="text-[12px] font-semibold">
        {{ title }}
      </p>
     </div>
      <div v-if="value">
        |
        <span v-if="!$slots[`value`]">
          <span
            class="text-[12px] font-semibold text-primary"
            v-if="typeof value === 'string'"
          >
            {{ value }}
          </span>
          <span v-else >
            <span
              v-for="(item, index) in value"
              :key="item + index"
              class="text-[12px] font-semibold text-primary"
              >
              {{ value }}
              </span
            >
          </span>
        </span>
        <span v-else class="">
          <slot name="value"></slot>
        </span>
      </div>
    </div>
    <div v-if="show" class="rounded-[8px] content-filter shadow-md">
      <!-- <div class="content-filter__body"> -->
        <slot name="content"></slot>
      <!-- </div> -->
      <div class="pt-2">
        <button class="btn btn-primary btn-sm w-full" @click="callback">
          <p class="text-[12px]">適用</p>
        </button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.content-filter {
  position: absolute;
  top: 115%;
  left: 0px;
  border: 1px solid #d8dee4;
  padding: 5px 10px;
  background-color: #fff;
  z-index: 1000;
  min-width: 260px;
}

</style>

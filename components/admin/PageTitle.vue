<script setup>
import { ref } from "vue";
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  collapse: {
    type: Boolean,
    default: false,
  },
});
const show = ref(true);
const expanded = ref(!props.collapse);
</script>
<template>
  <div class="relative font-inter antialiased">
    <div class="relative flex flex-col justify-center overflow-hidden">
      <div class="w-full">
        <div class="divide-y divide-slate-200">
          <div class="py-2">
            <div
              class="flex justify-start gap-x-6 card-header flex items-center justify-start !border-b-[3px] !border-solid !border-primary p-0"
            >
              <h3
                class="pb-[20px] text-h2 font-normal text-dark mr-3"
              >
                {{ title }}
              </h3>
              <button
                v-if="collapse"
                id="faqs-title-01"
                type="button"
                class="btn btn-outline-primary btn-sm w-fit"
                @click="expanded = !expanded"
                :aria-expanded="expanded"
                aria-controls="faqs-text-01"
              >
                {{ show ? "非表示" : "表示" }}
              </button>
            </div>
            <div
              id="faqs-text-01"
              role="region"
              aria-labelledby="faqs-title-01"
              class="grid text-sm text-slate-600 overflow-hidden transition-all duration-300 ease-in-out"
              :class="
                expanded
                  ? 'grid-rows-[1fr] opacity-100'
                  : 'grid-rows-[0fr] opacity-0'
              "
            >
              <div class="overflow-hidden mt-[1rem] px-3">
                <slot name="body" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>
<style lang="scss" scoped>
@keyframes active {
  from {
    height: 0%;
  }
  to {
    height: 100%;
  }
}
@keyframes leave {
  from {
    height: 100%;
  }
  to {
    height: 0%;
  }
}
.collapse-active {
  animation: active 0.2s;
  height: 100%;
}
.collapse-leave {
  animation: leave 0.2s;
  height: 0%;
}
</style>

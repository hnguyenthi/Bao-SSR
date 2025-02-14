<script setup>
const props = defineProps({
  content: {
    type: String,
    default: "",
  },
});
</script>
<template>
  <div
    class="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col hidden items-center mb-4  group-hover:flex w-[200px]"
  >
    <span
      class="relative rounded-md z-10 px-2 py-1 text-[14px] leading-none text-white whitespace-no-wrap bg-[#898a8b] shadow-lg"
    >
      {{ content }}
    </span>
    <div class="w-3 h-3 -mt-2 rotate-45 bg-[#898a8b]"></div>
  </div>
</template>

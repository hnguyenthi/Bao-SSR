<script setup>
const props = defineProps({
  text: {
    type: String,
    default: "",
  },
  close: {
    type: Function,
    default: (i) => {},
  },
});
</script>
<template>
  <span class="text-[12px] rounded-[5px] px-[5px] py-[1px] bg-primary mx-[1px]">
    {{ text }}
    <font-awesome-icon
      class="scale-[0.9] pl-1"
      @click.stop="close"
      icon="xmark"
    />
  </span>
</template>

<script setup>
import { computed, watch, useTemplateRef } from "vue";

const emit = defineEmits(["update:checked"]);

const props = defineProps({
  checked: {
    type: [Array, Boolean],
    required: true,
  },
  value: {
    default: null,
  },
  label: {
    type: String,
    default: "",
  },
});
const proxyChecked = computed({
  get() {
    return props.checked;
  },
  set(val) {
    emit("update:checked", val);
  },
});
const input = useTemplateRef("input");
</script>

<template>
  <div class="flex items-center justify-start">
    <input
      ref="input"
      type="checkbox"
      :value="value"
      v-model="proxyChecked"
      class="border-gray-300 h-[16px] w-[16px] rounded-sm shadow-sm"
    />
    <div v-if="$slots.label" @click="input.click()">
      <label class="pl-2 text-[14px] cursor-pointer" :for="value"
        ><slot name="label"></slot
      ></label>
    </div>
    <label
      @click="input.click()"
      v-else
      class="pl-2 text-[14px] cursor-pointer"
      :for="value"
      >{{ label }}</label
    >
  </div>
</template>

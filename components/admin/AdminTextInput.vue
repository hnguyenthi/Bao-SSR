<script setup>
import { onMounted, ref, watch } from "vue";
const emit = defineEmits(["update:modelValue", "change", "focusout"]);

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  classes: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  error: {
    type: String,
    default: "",
  },
  isRequired: {
    type: Boolean,
    default: false,
  },
  basic: {
    type: Boolean,
    default: false,
  },
  questionExplanation: {
    type: String,
    default: "",
  },
  myPage: {
    type: Boolean,
    default: false,
  },
  value: {
    type: [String, Number],
    default: "",
  },
});
const model = defineModel();
const input = ref(null);
const currentType = ref(props.type);
onMounted(() => {
  if (input.value.hasAttribute("autofocus")) {
    input.value.focus();
  }
});

defineExpose({ focus: () => input.value.focus() });
const handleChangeType = () => {
  if (props.type !== "password") return;
  if (currentType.value === "password") {
    currentType.value = "text";
  } else {
    currentType.value = "password";
  }
};

</script>

<template>
  <div>
    <div v-if="$slots.label">
      <slot name="label"></slot>
    </div>
    <label
      v-else
      class="text-gray-700 mb-[5px] block text-h6 font-bold"
      :class="{ 'pb-[10px]': basic }"
    >
      <div>
        <p for="" class="pb-1 text-[18px] font-normal text-dark">{{label}}</p>
      </div>
      <span
        v-if="isRequired"
        class="rounded-sm bg-[#e9270e] px-1 py-[1px] text-[12px] text-white"
        >必須</span
      >
    </label>

    <div v-if="questionExplanation" class="mb-[5px] mt-[-5px]">
      <p class="text-[14px] text-[#a1a1a1]">{{ questionExplanation }}</p>
    </div>
    <div class="relative" :class="{ 'w-fit': basic }">
      <input
        :placeholder="placeholder ?? ''"
        class="form-control bg-white rounded-sm !border-end-1 mb-[16px] mr-[2px] h-[42px] text-[24px]"
        autocomplete="off"
        :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)"
        @focusout="emit('focusout', $event.target.value)"
        @change="emit('change', $event.target.value)"
        :type="currentType"
        ref="input"
      />
      <img
        v-if="type === 'password'"
        @click="handleChangeType"
        class="absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer"
        src="~/assets/images/common/icon-eyes.svg"
        alt="icon-eye"
      />
      <div
        v-show="error"
        :class="`${myPage ? 'formErrorMyPage' : 'formError'}`"
      >
        <div
          :class="`${myPage ? 'formErrorMyPageContent' : 'formErrorContent'}`"
        >
          <p>{{ error }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.form-control:focus {
  border-color:　theme('colors.primary') !important;
  box-shadow: none;
}
</style>
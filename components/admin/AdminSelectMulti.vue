<script setup>
import Multiselect from "vue-multiselect";
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  options: {
    type: Array,
    default: [],
  },
  title: {
    type: String,
    default: "",
  },
  modelValue: {
    type: Array,
    default: [],
  },
  value: {
    type: String,
    default: "value",
  },
  label: {
    type: String,
    default: "label",
  },
});
// const updateModel = (data) => {
//   if (props.modelValue.includes(data)) {
//     emit(
//       "update:modelValue",
//       props.modelValue.filter((v) => v !== data)
//     );
//   } else {
//     emit("update:modelValue", [...props.modelValue, data]);
//   }
// };

const model = ref([]);
const addTag = (search, id) => {};
const handleSelect = (option) => {};
const removeTag = (removedOption, id) => {
  model.value = model.value.filter((v) => v[props.value] !== removedOption);
};
watch(
  () => model.value,
  (value) => {
    emit("update:modelValue", [...value.map((v) => v[props.value])]);
  },
  { deep: true }
);
</script>
<template>
  <div class="select-multi w-full">
    <div class="flex items-center justify-between px-2 py-1 text-[14px]">
      <!-- <div class="cursor-pointer">
        <span v-if="modelValue.length == 0">×</span>
      </div> -->
      <!-- <div
        @click="
          () => {
            emit('update:modelValue', []);
          }
        "
        class="cursor-pointer"
      >
        <span v-if="modelValue.length !== 0">×</span>
      </div> -->
    </div>
    <div v-if="title" class="flex h-[36px] items-center justify-start bg-[#e8e9eb] px-[6px]">
      {{ title }}
    </div>
    <multiselect
      class="select-list"
      id="tagging"
      placeholder="選択してください"
      v-model="model"
      :label="label"
      :track-by="value"
      :options="options"
      :multiple="true"
      :taggable="false"
      :closeOnSelect="false"
      @select="handleSelect"
      @tag="addTag"
      @remove="removeTag"
    >
      <template #option="props">
        <div class="option__desc">
          <div
            class="select-item cursor-pointer bg-[#ccc]"
            :class="{
              'active !bg-[#3276b1]': modelValue.includes(
                props.option[`${value}`]
              ),
            }"
          >
            <div
              v-if="$slots[`item`]"
              class="p-[6px] text-[14px] font-semibold text-dark w-full"
            >
              <slot name="item" :data="props.option"></slot>
            </div>
            <div v-else class="p-[6px] text-[14px] font-semibold text-dark">
              {{ props.option[`${label}`] || props.option[`${value}`] }}
            </div>
          </div>
        </div>
      </template>
      <template #tag="props">
        <div class="inline-flex bg-primary rounded-sm pr-1 mt-1 mx-1">
          <slot name="tag" :data="props.option"></slot>
          <span
            class="cursor-pointer"
            @click="removeTag(props.option[`${value}`])"
          >
            <font-awesome-icon class="scale-[0.6]" icon="x" />
          </span>
        </div>
      </template>
    </multiselect>
  </div>
</template>
<style lang="scss" scoped>
.select-multi {
  position: relative;
  flex: 1;
  margin: 1em 0.5%;
  border: 1px solid #ccc;
  border-radius: 3px;
}
.select-item:nth-child(odd) {
  background-color: #f9f9f9;
}
</style>
<style lang="scss">
.select-multi {
  position: relative;
  flex: 1;
  margin: 1em 0.5%;
  border: 1px solid #ccc;
  border-radius: 3px;
}
.select-item:nth-child(odd) {
  background-color: #f9f9f9;
}
.select-list {
  height: 210px;
  overflow-y: auto;
  overflow-x: hidden;
}
.multiselect__content-wrapper {
  // display: block !important;
  // position: absolute;
  height: 200px;
  // min-width: 400px;
  overflow: auto;
}
.multiselect__content {
  width: 100%;
  height: 500px;
  border: 1px solid #ccc;
  border-radius: 3px;
}
</style>

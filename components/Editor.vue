<script setup>
import Editor from "@tinymce/tinymce-vue";
const emit = defineEmits(["update:modelValue", "change", "focusout"]);

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
});
const value = ref(props.modelValue);
watch(
  () => value.value,
  (newValue) => {
    emit("update:modelValue", newValue);
  }
);
</script>
<template>
  <div>
    <label v-if="label" class="text-gray-700 mb-[5px] block text-h6 font-bold">
      <div>
        <p for="" class="text-[18px] font-normal text-dark">{{ label }}</p>
      </div>
    </label>
    <ClientOnly>
      <Editor
        v-model="value"
        height="500"
        api-key="qxqubue1tdg9j655p4trz78jkc37rmxws07t6mummgkhnkvg"
        :init="{
          // toolbar_mode: 'sliding',
          plugins:
            'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount autosave code',
          toolbar:
            'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat | code',
        }"
      />
    </ClientOnly>
  </div>
</template>
<style lang="scss">
.tox-tinymce {
  border-radius: theme("borderRadius.sm") !important;
}
</style>

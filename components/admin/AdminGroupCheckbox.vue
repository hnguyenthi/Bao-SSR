<script setup>
import { computed, watch, ref } from 'vue';
const emit = defineEmits(['update:modelValue']);

const model = defineModel([]);
const props = defineProps({
    options: {
        type: Array,
        default: [],
    },
    modelValue: {
        type: Array,
        default: [],
    },
    fieldValue: {
        type: String,
        default: 'value',
    },
    fieldLabel: {
        type: String,
        default: 'label',
    },
    label: {
        type: String,
        default: '',
    },
    isRequired: {
        type: Boolean,
        default: false,
    },
    questionExplanation: {
        type: String,
        default: '',
    },
    error: {
        type: String,
        default: '',
    },
});
watch(
    () => model.value,
    (newValue) => {
        emit('update:modelValue', newValue);
    },
);
</script>
<template>
    <div>
        <div class="pb-[10px]" v-if="label">
            <p class="text-[14px]">
                {{ label }}
                <span
                    v-if="isRequired"
                    class="rounded-sm bg-[#e9270e] px-1 py-[1px] text-[12px] text-white"
                    >必須</span
                >
            </p>
        </div>
        <div v-if="questionExplanation" class="mb-[5px] mt-[-5px]">
            <p class="text-[14px] text-[#a1a1a1]">{{ questionExplanation }}</p>
        </div>
        <div class="relative">
            <Checkbox
                class="py-1 text-[14px]"
                :label="item[fieldLabel] ?? item[fieldValue]"
                v-model:checked="model"
                :value="item[fieldValue]"
                v-for="item in options"
                :key="item.value"
            >
            <template #label v-if="$slots.label">
                <slot name="label" :data="item"></slot>
            </template>
            </Checkbox>
            <div v-show="error" class="formError">
                <div class="formErrorContent">
                    <p>{{ error }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

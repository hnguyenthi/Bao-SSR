<script setup>
import { computed, watch, ref } from 'vue';
const emit = defineEmits(['update:modelValue']);

const model = defineModel();
const props = defineProps({
    options: {
        type: Array,
        default: [],
    },
    modelValue: {
        type: [String, Number],
        default: '',
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
    <div class="">
        <div class="relative pb-[10px] w-fit" v-if="label">
            <span class="text-[14px]">
                {{ label }}
                <span
                    v-if="isRequired"
                    class="rounded-sm bg-[#e9270e] px-1 py-[1px] text-[12px] text-white"
                    >必須</span
                >
            </span>
            <span v-show="error" class="formError">
                <span class="formErrorContent">
                    <span>{{ error }}</span>
                </span>
            </span>
        </div>
        <div v-if="questionExplanation" class="mb-[5px] mt-[-5px]">
            <p class="text-[14px] text-[#a1a1a1]">{{ questionExplanation }}</p>
        </div>
        <div class="combobox">
            <div
                v-for="(item, index) in options"
                :key="index"
                class="mr-[30px] mt-[5px] block flex items-start lg:mt-0"
            >
                <input
                    class="mr-1 mt-[4px] h-[19px] w-[19px]"
                    type="radio"
                    :id="item[fieldValue]"
                    :value="item[fieldValue]"
                    v-model="model"
                />
                <label class="text-[16px]" :for="item[fieldValue]">{{
                    item[fieldLabel]
                }}</label>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.combobox {
    display: ruby;
}
.formError {
    position: absolute;
    z-index: 1;
    top: 0%;
    left: 55%;
    min-width: 140px;
    transform: translateY(-100%);
    .formErrorContent {
        color: theme('colors.white');
        font-size: 16px;
        font-weight: 500;
        padding: 2px 10px;
        border-radius: 5px;
        background-color: #e9270e;
        border: 2px solid #ddd;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 2px 5px;
        position: relative;
        &::after {
            content: '';
            position: absolute;
            bottom: -10px;
            transform: rotate(-90deg);
            left: 10%;
            border-width: 5px;
            border-style: solid;
            border-color: transparent #e9270e transparent transparent;
        }
    }
}
</style>

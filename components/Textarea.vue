<script setup>
import { onMounted, ref } from 'vue';
const emit = defineEmits(['update:modelValue', 'change', 'focusout']);
const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    rows: {
        type: [Number, String],
        default: 8,
    },
    placeholder: {
        type: String,
        default: '',
    },
    classes: {
        type: String,
        default: '',
    },
    label: {
        type: String,
        default: '',
    },
    error: {
        type: String,
        default: '',
    },
    form: {
        type: Boolean,
        default: false
    }
});
const input = ref(null);
const currentType = ref(props.type);
defineExpose({ focus: () => input.value.focus() });
</script>
<template>
    <div>
        <label class="text-gray-700 mb-[5px] block text-[12px] font-normal">
            <span v-if="label">{{ label }}</span>
        </label>
    </div>
    <div class="relative">
        <textarea
            :rows="rows"
            :placeholder="placeholder"
            :value="props.modelValue"
            @input="emit('update:modelValue', $event.target.value)"
            @focusout="emit('focusout')"
            @change="emit('change')"
            class="h-auto w-full resize border-[1px] border-transparent bg-table-200 p-[15px] focus:border-solid focus:border-dark"
            :class="{classes, '!border-2 !border-info-200 focus:!border-dark focus-visible:!border-dark rounded-sm bg-white' :form}"
        ></textarea>
        <div v-show="error" class="formError">
            <div class="formErrorContent">{{ error }}</div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
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
        background-color: theme('colors.red');
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
            border-color: transparent theme('colors.red') transparent transparent;
        }
    }
}
</style>

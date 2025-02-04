<script setup >
import { onMounted, ref, watch } from 'vue';
const emit = defineEmits(['update:modelValue', 'change', 'focusout']);

const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: '',
    },
    type: {
        type: String,
        default: 'text',
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
        default: '',
    },
    myPage: {
        type: Boolean,
        default: false,
    },
});
const model = defineModel();
const input = ref(null);
const currentType = ref(props.type);
onMounted(() => {
    if (input.value.hasAttribute('autofocus')) {
        input.value.focus();
    }
});

defineExpose({ focus: () => input.value.focus() });
const handleChangeType = () => {
    if (props.type !== 'password') return;
    if (currentType.value === 'password') {
        currentType.value = 'text';
    } else {
        currentType.value = 'password';
    }
};
// watch(
//     () => props.error,
//     (newValue) => {
//         console.log('newValue', newValue);
//     },
// );
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
            <span
                :class="{
                    'text-[14px] font-normal': basic,
                    'front-normal text-[12px] text-[#a1a1a1]': myPage,
                }"
                v-if="label"
                >{{ label }}</span
            >
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
                class="px-[10px] w-full rounded-sm border-2 border-info-200 focus:border-info-300 focus-visible:border-info-300"
                :class="[
                    classes,
                    {
                        'h-[40px] w-[237px] w-auto !border !border-solid !border-grey p-[10px]':
                            basic,
                        'rounded-none !border-b-[1px] !border-l-0 !border-r-0 !border-t-0 !border-b-[#a1a1a1] !px-0':
                            myPage,
                    },
                ]"
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
<style lang="scss" scoped>
.formError {
    position: absolute;
    z-index: 1;
    top: 0%;
    left: 55%;
    min-width: 140px;
    width: 100%;
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
        min-width: max-content;
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
.formErrorMyPageContent {
    padding-top: 11px;
    font-size: 12px;
    color: #e5111b;
}
</style>
<style lang="scss">
.login {
    input {
        height: 60px;
    }
}
input {
    height: 32px;
}
</style>

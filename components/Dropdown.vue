<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
// import vClickOutside from '@/directives/v-click-outside';
const emit = defineEmits(['update:modelValue']);
const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: '',
    },
    options: {
        type: Array,
        default: [],
    },
    classes: {
        type: String,
        default: '',
    },
    mode: {
        type: String,
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

const closeOnEscape = (e) => {
    if (open.value && e.key === 'Escape') {
        open.value = false;
    }
};

onMounted(() => document.addEventListener('keydown', closeOnEscape));
onUnmounted(() => document.removeEventListener('keydown', closeOnEscape));
const clickOutside = () => {
    console.log('outside');
};
const open = ref(false);
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
        <div
            class="relative"
            v-outside="
                () => {
                    open = false;
                }
            "
        >
            <div
                @click="open = !open"
                class="content-center"
                :class="`${mode === 'basic' ? 'dropdown-basic' : mode === 'form' ? 'dropdown-form h-[32px] rounded-sm border-2 border-solid border-[#b7d7e6] bg-white font-semibold focus:border-dark focus-visible:border-dark' : 'dropdown'}`"
            >
                <div
                    class="text-left text-[14px]"
                    :class="{ 'text-h6 font-semibold': mode === 'form' }"
                >
                    {{
                        options.find(
                            (item) => item[fieldValue] == modelValue,
                        )?.[fieldLabel]
                    }}
                </div>
            </div>
            <div v-show="open" class="fixed z-40" @click="open = false"></div>
            <!-- Full Screen Dropdown Overlay -->
            <Transition>
                <div
                    v-show="open"
                    class="absolute left-0 right-0 top-9 z-[60] shadow-md"
                    :class="`${mode === 'basic' ? 'top-9 rounded-sm bg-[#f0f0f0]' : 'top-16 rounded-md bg-white'}`"
                    @click="open = false"
                >
                    <div
                        class=""
                        :class="`${mode === 'basic' ? 'rounded-sm' : 'rounded-md'} ${classes}`"
                    >
                        <div
                            :class="`${mode === 'basic' ? 'dropdown-basic-list' : 'dropdown-list'} ${basic ? '!h-[46px]' : '-'}`"
                        >
                            <div
                                @click="
                                    emit('update:modelValue', item[fieldValue])
                                "
                                v-for="(item, index) in options"
                                :key="item[fieldValue] + index"
                                class="cursor-pointer px-3 py-1 text-center text-[14px] text-dark hover:bg-primary hover:text-white"
                                :class="{
                                    '!text-left text-h5 font-medium':
                                        mode === 'form',
                                }"
                            >
                                {{ item[fieldLabel] }}
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
            <div v-show="error" class="formError">
                <div class="formErrorContent">
                    <p>{{ error }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.dropdown {
    position: relative;
    margin-right: auto;
    margin-left: auto;
    padding-left: 10px;
    width: 100%;
    height: 32px;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    color: #000;
    background-color: #fff;
    border: none;
    border-radius: 16px;
    box-shadow: 0 0 10px rgb(30, 66, 144, 0.25);
    cursor: pointer;
    &::before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        right: 9px;
        bottom: 0;
        margin-top: auto;
        margin-bottom: auto;
        width: 16px;
        height: 16px;
        background-color: var(--theme-color);
        border-radius: 50%;
        pointer-events: none;
    }
    &::after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        right: 13px;
        bottom: 0;
        margin-top: auto;
        margin-right: 1px;
        margin-bottom: auto;
        width: 6px;
        height: 6px;
        border-right: solid 1px #fff;
        border-bottom: solid 1px #fff;
        transform: rotate(45deg);
        pointer-events: none;
    }
}
.dropdown-list {
    max-height: 250px;
    overflow: auto;
    div:first-child {
        border-top-left-radius: theme('borderRadius.md');
        border-top-right-radius: theme('borderRadius.md');
    }
    div:last-child {
        border-bottom-left-radius: theme('borderRadius.md');
        border-bottom-right-radius: theme('borderRadius.md');
    }
}
.dropdown-basic-list {
    div:first-child {
        border-top-left-radius: theme('borderRadius.sm');
        border-top-right-radius: theme('borderRadius.sm');
    }
    div:last-child {
        border-bottom-left-radius: theme('borderRadius.sm');
        border-bottom-right-radius: theme('borderRadius.sm');
    }
}
.dropdown-basic {
    background-color: #f0f0f0;
    color: #333;
    text-decoration: none;
    padding: 5px 10px;
    border: 1px solid #ddd;
    cursor: pointer;
    transition: background-color 0.3s ease;
    height: 33px;
    position: relative;
    &::after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        right: 6px;
        bottom: 0;
        margin-top: auto;
        margin-right: 1px;
        margin-bottom: auto;
        width: 7px;
        height: 7px;
        border-right: solid 2px theme('colors.gray');
        border-bottom: solid 2px theme('colors.gray');
        transform: rotate(45deg);
        pointer-events: none;
    }
}
.dropdown-form {
    position: relative;
    padding-right: 34px;
    padding-left: 10px;
    &::before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        right: 15px;
        bottom: 0;
        margin-top: auto;
        margin-bottom: auto;
        width: 10px;
        height: 10px;
        border-right: solid 2px theme('colors.primary');
        border-bottom: solid 2px theme('colors.primary');
        transform: rotate(45deg);
    }
}
</style>

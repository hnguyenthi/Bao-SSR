<script setup>
import { computed, onMounted, onUnmounted, watch } from 'vue';
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
        default: 'info',
    },
    yes: {
        type: Function,
        default: () => {},
    },
    delete: {
        type: Function,
        default: () => {},
    },
    buttonNo: {
        type: String,
        default: '',
    },
    title: {
        type: String,
        default: ''
    }
});
watch(
    () => props.modelValue,
    () => {
        if (props.modelValue) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = null;
        }
    },
);
const emit = defineEmits(['yes', 'update:modelValue']);
const handleYes = () => {
    emit('yes', false);
    emit('update:modelValue', false);
};
const handleNo = () => {
    emit('update:modelValue', false);
};

const close = () => {
    emit('update:modelValue', false);
};
</script>

<template>
    <Teleport to="body">
        <Transition leave-active-class="duration-100">
            <div
                v-show="modelValue"
                class="fixed inset-0 z-50 overflow-y-auto px-4 py-6 sm:px-0"
                scroll-region
            >
                <Transition
                    enter-active-class="ease-out duration-100"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="ease-in duration-100"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                >
                    <div
                        v-show="modelValue"
                        class="fixed inset-0 transform transition-all"
                        @click="close"
                    >
                        <div class="absolute inset-0 bg-[#0006] opacity-70" />
                    </div>
                </Transition>

                <Transition
                    enter-active-class="ease-out duration-100"
                    enter-from-class="opacity-0 sm:scale-95"
                    enter-to-class="opacity-100 sm:scale-100"
                    leave-active-class="ease-in duration-100"
                    leave-from-class="opacity-100 sm:scale-100"
                    leave-to-class="opacity-0 sm:scale-95"
                >
                    <div
                        v-show="modelValue"
                        class="absolute left-1/2 top-1/2 mb-6 md:w-[600px] w-full max-w-[94%] -translate-x-1/2 -translate-y-1/2 transform overflow-hidden rounded-lg bg-white shadow-xl transition-all"
                    >
                        <div class="p-[30px]">
                            <div class="modal-header mb-[17px]">
                                <p class="text-h5 font-medium text-center">{{title}}</p>
                                <div
                                @click="close"
                                    class="cursor-pointer close-icon js-modal-close common-modal-close"
                                ></div>
                            </div>
                            <div class="modal-body">
                                <div class="font-medium text-info-500">
                                    <slot name="body" />
                                </div>
                            </div>

                            <div class="modal-footer">
                                <div v-if="$slots.footer">
                                    <slot name="footer"></slot>
                                </div>
                                <div v-else>
                                    <div
                                        v-if="type !== 'form'"
                                        class="mt-[13px] flex justify-end px-[16px] py-[13px]"
                                    >
                                        <PrimaryButton
                                            :type="buttonNo"
                                            @click="handleNo"
                                            class="m-[5px] w-max px-[24px] py-[10px] text-[14px] font-semibold"
                                            >いいえ</PrimaryButton
                                        >
                                        <PrimaryButton
                                            @click="handleYes"
                                            class="m-[5px] w-max px-[24px] py-[10px] text-[14px] font-semibold"
                                            >はい
                                        </PrimaryButton>
                                    </div>
                                    <div v-else>
                                        <PrimaryButton
                                            @click="handleNo"
                                            type="success"
                                            class="m-[5px] px-[24px] py-[10px] text-[14px] font-semibold"
                                            >いいえ</PrimaryButton
                                        >
                                        <PrimaryButton
                                            @click="handleYes"
                                            class="m-[5px] px-[24px] py-[10px] text-[14px] font-semibold"
                                            >はい
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>
<style lang="scss" scoped>
.modal-body {
    border-top: solid 1px #d5d5d5;
    border-bottom: solid 1px #d5d5d5;
}
.common-modal-close {
    position: absolute;
    top: 30px;
    right: 30px;
    width: 24px;
    height: 24px;
    &::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        width: 34px;
        height: 2px;
        background-color: theme('colors.primary');
        transform: rotate(45deg);
    }
    &::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        width: 34px;
        height: 2px;
        background-color: theme('colors.primary');
        transform: rotate(-45deg);
    }
}
</style>

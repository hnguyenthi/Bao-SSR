<script setup>
import { STATUS_USER, STATUS_USER_TITLE } from '@utils/constraints.js';

import { computed, ref } from 'vue';
const emit = defineEmits(['update:modelValue']);
const props = defineProps({
    modelValue: {
        type: [Number, String],
        default: null,
    },
    classFn: {
        type: Function,
        default: () => {}
    },
    statusValue: {
        type: Object,
        default: []
    },
    statusTitle: {
        type: Object,
        default: []
    },
    value: {
        type:  [Number, String],
        default: 0,
    },
});
const selected = ref(props.modelValue || props.value);
const classes = computed(() => {
    return props.classFn(selected.value);
});
const handleChange = (event) => {
    emit('update:modelValue', selected.value);
}
</script>
<template>
    <div
        class="rounded-full p-1"
        :class="classes"
    >
        <select
            name=""
            v-model="selected"
            @change="handleChange($event)"
            class="w-full rounded-full border-[1px] border-dashed border-white text-center"
            :class="classes"
        >
            <option
                :class="classes"
                :value="status"
                v-for="status in Object.keys(statusValue).map(
                    item => statusValue[item],
                )"
                :key="status"
            >
                <div class="flex items-center justify-end">
                    <div class="flex w-full items-center justify-center">
                        <div
                            class="flex h-[35px] w-[130px] items-center justify-center rounded-full text-white"
                        >
                            <div
                                class="text-[16px] m-1 w-full rounded-full border-[1px] border-dashed border-white text-center font-normal"
                            >
                                {{ statusTitle[status] }}
                            </div>
                        </div>
                    </div>
                </div>
            </option>
        </select>
    </div>
</template>
<style lang="scss" scoped>
select {
    padding: 0px;
    -o-appearance: none !important;
    -ms-appearance: none !important;
    -webkit-appearance: none !important;
    -moz-appearance: none !important;
    appearance: none !important;
    font-size: 16px;
    color: white;
    cursor: pointer;
    &:focus {
        background-color: initial;
    }
}

</style>

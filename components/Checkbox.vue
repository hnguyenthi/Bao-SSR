<script setup>
import { computed, watch } from 'vue';

const emit = defineEmits(['update:checked']);

const props = defineProps({
    checked: {
        type: [Array, Boolean],
        required: true,
    },
    value: {
        default: null,
    },
    label: {
        type: String,
        default: '',
    },
});
const proxyChecked = computed({
    get() {
        return props.checked;
    },
    set(val) {
        console.log("222", val)
        emit('update:checked', val);
    },
});
</script>

<template>
    <div class="flex items-center justify-start">
        <input
            type="checkbox"
            :value="value"
            v-model="proxyChecked"
            class="border-gray-300 h-[20px] w-[20px] rounded-sm shadow-sm"
        />
        <label class="pl-2 text-[14px]" :for="value">{{ label }}</label>
    </div>
</template>

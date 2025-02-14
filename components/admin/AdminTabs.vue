<script setup>
const emit = defineEmits(['update:modelValue']);
const props = defineProps({
    tabs: {
        type: Array,
        default: []
    },
    modelValue: {
        type: [String, Number],
        default: '',
    },
})
</script>
<template>
    <div>
        <div class="flex border-b-[1.5px] border-solid border-[#ccc] gap-x-0" >
            <div v-for="tab in tabs" :key="tab.value" @click="emit('update:modelValue', tab.value)"
                class="container__tab  px-3 cursor-pointer"
                :class="{ 'border-b-[2px] border-solid border-primary': modelValue === tab.value }">
                <span class="text-[14px] pb-3  font-semibold text-text"
                :class="{ 'text-primary': modelValue === tab.value }">
                    {{tab.title}}
                </span>
            </div>
        </div>
    </div>
</template>

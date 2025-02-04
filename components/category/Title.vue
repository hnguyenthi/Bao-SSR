<script setup>
const props = defineProps({
    title: {
        type: String,
        default: ''
    }
})
</script>
<template>
    <h2 class="text-h5 lg:text-[26px] text-white bg-secondary-100 font-medium pl-[20px] h-[54px] flex content-center items-center">
        {{title}}
    </h2>
</template>
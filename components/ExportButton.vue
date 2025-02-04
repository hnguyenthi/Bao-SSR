<script setup>
const props = defineProps({
    label: {
        type: String,
        default: ''
    }
})
</script>
<template>
    <div class="text-primary text-[16px] flex cursor-pointer hover:opacity-70">
        <img class="object-none" src="~/assets/images/common/download-ic.svg" alt="">
        <p class="ml-[5px]">{{label}}</p>
    </div>
</template>

<script setup>

const props = defineProps({
    breadcrumbs: {
        type: Array,
        default: [],
    },
});
</script>
<template>
    <div class="flex items-center content-center text-h2 mb-[10px]">
        <div v-for="(item, index) in breadcrumbs" :key="index" >
            <NuxtLink v-if="index < breadcrumbs.length - 1" :to="item?.link" class="text-[#1e4290] pr-3">
                <span class="pr-2" v-if="index > 0"> ＞</span>
                {{ item?.title }}
            </NuxtLink>
            <div v-else><span class="pr-2" v-if="index > 0"> ＞</span>{{ item?.title }}</div>
        </div>
    </div>
</template>
<style lang="scss" scoped>

</style>
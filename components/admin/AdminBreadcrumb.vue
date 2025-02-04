<script setup>
import { Link } from '@inertiajs/vue3';

const props = defineProps({
    breadcrumbs: {
        type: Array,
        default: [],
    },
});
</script>
<template>
    <div class="flex items-center content-center text-h2 mt-[20px] mb-[10px]">
        <div v-for="(item, index) in breadcrumbs" :key="index" >
            <Link v-if="index < breadcrumbs.length - 1" :href="item?.link" class="text-[#1e4290] pr-3">
                <span class="pr-2" v-if="index > 0"> ＞</span>
                {{ item?.title }}
            </Link>
            <div v-else><span class="pr-2" v-if="index > 0"> ＞</span>{{ item?.title }}</div>
        </div>
    </div>
</template>
<style lang="scss" scoped>

</style>